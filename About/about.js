console.log("About V16.2 Node-Connected Railway loaded.");

document.addEventListener("DOMContentLoaded", function () {
  initAboutReveal();
  initAboutFloatingOrbs();
  generateRailSleepers();
  initSegmentReveal();
});

function initAboutReveal() {
  const revealElements = document.querySelectorAll(".reveal, .reveal-delay, .reveal-delay-2");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach(function (element) {
      element.classList.add("is-visible");
      element.style.opacity = "1";
      element.style.transform = "translateY(0) scale(1)";
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
          "opacity 0.9s ease " + delay + ", transform 0.9s cubic-bezier(.2,.8,.2,1) " + delay;
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0) scale(1)";
        entry.target.classList.add("is-visible");

        observerInstance.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
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

function generateRailSleepers() {
  const configs = [
    { groupId: "sleepers-01", leftId: "rail-left-01", rightId: "rail-right-01" },
    { groupId: "sleepers-02", leftId: "rail-left-02", rightId: "rail-right-02" },
    { groupId: "sleepers-03", leftId: "rail-left-03", rightId: "rail-right-03" },
    { groupId: "sleepers-04", leftId: "rail-left-04", rightId: "rail-right-04" },
    { groupId: "sleepers-05", leftId: "rail-left-05", rightId: "rail-right-05" }
  ];

  configs.forEach(function (config) {
    const leftRail = document.getElementById(config.leftId);
    const rightRail = document.getElementById(config.rightId);
    const sleepersGroup = document.getElementById(config.groupId);

    if (!leftRail || !rightRail || !sleepersGroup) {
      return;
    }

    sleepersGroup.innerHTML = "";

    const totalLength = Math.min(leftRail.getTotalLength(), rightRail.getTotalLength());
    const sleeperCount = 16;
    const startOffset = totalLength * 0.08;
    const usableLength = totalLength * 0.82;
    const spacing = usableLength / (sleeperCount - 1);

    for (let i = 0; i < sleeperCount; i++) {
      const distance = startOffset + spacing * i;
      const leftPoint = leftRail.getPointAtLength(distance);
      const rightPoint = rightRail.getPointAtLength(distance);

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", leftPoint.x.toFixed(2));
      line.setAttribute("y1", leftPoint.y.toFixed(2));
      line.setAttribute("x2", rightPoint.x.toFixed(2));
      line.setAttribute("y2", rightPoint.y.toFixed(2));

      sleepersGroup.appendChild(line);
    }
  });
}

function initSegmentReveal() {
  const segments = document.querySelectorAll(".segment");

  if (!("IntersectionObserver" in window)) {
    segments.forEach(function (segment) {
      segment.classList.add("visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      root: null,
      threshold: 0.35
    }
  );

  segments.forEach(function (segment) {
    observer.observe(segment);
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