console.log("About page loaded.");

document.addEventListener("DOMContentLoaded", function () {
  initAboutReveal();
  initAboutFloatingOrbs();
  initRailwaySleepers();
  initRailwayDrawAnimation();
});

function initAboutReveal() {
  const revealElements = document.querySelectorAll(".reveal, .reveal-delay, .reveal-delay-2");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach(function (element) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries, observerInstance) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        let delay = "0s";

        if (entry.target.classList.contains("reveal-delay")) {
          delay = "0.12s";
        }

        if (entry.target.classList.contains("reveal-delay-2")) {
          delay = "0.22s";
        }

        entry.target.style.transition =
          "opacity 0.85s ease " + delay + ", transform 0.85s ease " + delay;
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        observerInstance.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach(function (element) {
    observer.observe(element);
  });
}

function initAboutFloatingOrbs() {
  if (document.querySelector(".about-floating-orbs")) {
    return;
  }

  const orbLayer = document.createElement("div");
  orbLayer.className = "about-floating-orbs";

  orbLayer.style.position = "fixed";
  orbLayer.style.inset = "0";
  orbLayer.style.pointerEvents = "none";
  orbLayer.style.zIndex = "0";
  orbLayer.style.overflow = "hidden";

  for (let i = 0; i < 8; i++) {
    const orb = document.createElement("span");
    const size = 14 + Math.random() * 34;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = 12 + Math.random() * 10;
    const delay = Math.random() * 6;
    const opacity = 0.05 + Math.random() * 0.07;

    orb.style.position = "absolute";
    orb.style.width = size + "px";
    orb.style.height = size + "px";
    orb.style.left = left + "%";
    orb.style.top = top + "%";
    orb.style.borderRadius = "50%";
    orb.style.background =
      "radial-gradient(circle, rgba(255,179,71," + opacity + "), rgba(255,122,24,0.02), transparent 70%)";
    orb.style.filter = "blur(2px)";
    orb.style.animation =
      "aboutOrbFloat " + duration + "s ease-in-out " + delay + "s infinite";

    orbLayer.appendChild(orb);
  }

  document.body.appendChild(orbLayer);
  injectAboutOrbKeyframes();
}

function initRailwaySleepers() {
  const leftRail = document.getElementById("aboutRailLeft");
  const rightRail = document.getElementById("aboutRailRight");
  const sleepersGroup = document.getElementById("aboutRailSleepers");

  if (!leftRail || !rightRail || !sleepersGroup) {
    return;
  }

  sleepersGroup.innerHTML = "";

  const totalLength = Math.min(leftRail.getTotalLength(), rightRail.getTotalLength());
  const spacing = 42;

  for (let distance = 16; distance < totalLength; distance += spacing) {
    const leftPoint = leftRail.getPointAtLength(distance);
    const rightPoint = rightRail.getPointAtLength(distance);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", leftPoint.x.toFixed(2));
    line.setAttribute("y1", leftPoint.y.toFixed(2));
    line.setAttribute("x2", rightPoint.x.toFixed(2));
    line.setAttribute("y2", rightPoint.y.toFixed(2));

    sleepersGroup.appendChild(line);
  }
}

function initRailwayDrawAnimation() {
  const leftRail = document.getElementById("aboutRailLeft");
  const rightRail = document.getElementById("aboutRailRight");
  const sleepersGroup = document.getElementById("aboutRailSleepers");

  if (!leftRail || !rightRail || !sleepersGroup) {
    return;
  }

  const leftLength = leftRail.getTotalLength();
  const rightLength = rightRail.getTotalLength();

  leftRail.style.strokeDasharray = leftLength + " " + leftLength;
  leftRail.style.strokeDashoffset = leftLength;

  rightRail.style.strokeDasharray = rightLength + " " + rightLength;
  rightRail.style.strokeDashoffset = rightLength;

  const sleepers = sleepersGroup.querySelectorAll("line");
  sleepers.forEach(function (sleeper) {
    sleeper.style.opacity = "0";
    sleeper.style.transition = "opacity 0.25s ease";
  });

  function updateRailwayProgress() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (documentHeight <= 0) {
      leftRail.style.strokeDashoffset = "0";
      rightRail.style.strokeDashoffset = "0";
      sleepers.forEach(function (sleeper) {
        sleeper.style.opacity = "0.92";
      });
      return;
    }

    const progress = Math.min(Math.max(scrollTop / documentHeight, 0), 1);
    const multiplier = 1.08;

    leftRail.style.strokeDashoffset = Math.max(leftLength * (1 - progress * multiplier), 0);
    rightRail.style.strokeDashoffset = Math.max(rightLength * (1 - progress * multiplier), 0);

    const visibleCount = Math.floor(sleepers.length * progress * 1.12);

    sleepers.forEach(function (sleeper, index) {
      sleeper.style.opacity = index <= visibleCount ? "0.92" : "0";
    });

    const translateY = Math.min(scrollTop * 0.02, 20);
    leftRail.style.transform = "translateY(" + translateY + "px)";
    rightRail.style.transform = "translateY(" + translateY + "px)";
    sleepersGroup.style.transform = "translateY(" + translateY + "px)";
  }

  updateRailwayProgress();
  window.addEventListener("scroll", updateRailwayProgress, { passive: true });
  window.addEventListener("resize", function () {
    initRailwaySleepers();
    updateRailwayProgress();
  });
}

function injectAboutOrbKeyframes() {
  if (document.getElementById("about-orb-keyframes")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "about-orb-keyframes";
  style.textContent = `
    @keyframes aboutOrbFloat {
      0% {
        transform: translate3d(0, 0, 0) scale(1);
      }
      50% {
        transform: translate3d(12px, -18px, 0) scale(1.08);
      }
      100% {
        transform: translate3d(0, 0, 0) scale(1);
      }
    }
  `;

  document.head.appendChild(style);
}