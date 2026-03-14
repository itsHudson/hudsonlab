console.log("About page loaded.");

document.addEventListener("DOMContentLoaded", function () {
  initAboutReveal();
  initAboutFloatingOrbs();
  initAboutRoadAnimation();
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

function initAboutRoadAnimation() {
  const roadBody = document.getElementById("aboutRoadBody");
  const roadLeft = document.getElementById("aboutRoadEdgeLeft");
  const roadRight = document.getElementById("aboutRoadEdgeRight");
  const roadCenter = document.getElementById("aboutRoadCenter");

  if (!roadBody || !roadLeft || !roadRight || !roadCenter) {
    return;
  }

  const lengthBody = roadBody.getTotalLength();
  const lengthLeft = roadLeft.getTotalLength();
  const lengthRight = roadRight.getTotalLength();
  const lengthCenter = roadCenter.getTotalLength();

  roadBody.style.strokeDasharray = lengthBody + " " + lengthBody;
  roadBody.style.strokeDashoffset = lengthBody;

  roadLeft.style.strokeDasharray = lengthLeft + " " + lengthLeft;
  roadLeft.style.strokeDashoffset = lengthLeft;

  roadRight.style.strokeDasharray = lengthRight + " " + lengthRight;
  roadRight.style.strokeDashoffset = lengthRight;

  roadCenter.style.strokeDasharray = "20 20, " + lengthCenter;
  roadCenter.style.strokeDashoffset = lengthCenter;

  function updateRoadProgress() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (documentHeight <= 0) {
      roadBody.style.strokeDashoffset = "0";
      roadLeft.style.strokeDashoffset = "0";
      roadRight.style.strokeDashoffset = "0";
      roadCenter.style.strokeDashoffset = "0";
      return;
    }

    const progress = Math.min(Math.max(scrollTop / documentHeight, 0), 1);
    const multiplier = 1.08;

    roadBody.style.strokeDashoffset = Math.max(lengthBody * (1 - progress * multiplier), 0);
    roadLeft.style.strokeDashoffset = Math.max(lengthLeft * (1 - progress * multiplier), 0);
    roadRight.style.strokeDashoffset = Math.max(lengthRight * (1 - progress * multiplier), 0);
    roadCenter.style.strokeDashoffset = Math.max(lengthCenter * (1 - progress * multiplier), 0);

    const translateY = Math.min(scrollTop * 0.02, 22);

    roadBody.style.transform = "translateY(" + translateY + "px)";
    roadLeft.style.transform = "translateY(" + translateY + "px)";
    roadRight.style.transform = "translateY(" + translateY + "px)";
    roadCenter.style.transform = "translateY(" + translateY + "px)";
  }

  updateRoadProgress();
  window.addEventListener("scroll", updateRoadProgress, { passive: true });
  window.addEventListener("resize", updateRoadProgress);
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