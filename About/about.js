console.log("About V13 page loaded.");

document.addEventListener("DOMContentLoaded", function () {
  initAboutReveal();
  initAboutFloatingOrbs();
  initJourneyLineDraw();
  initStationMarkerSync();
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
    { threshold: 0.18 }
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

function initJourneyLineDraw() {
  const leftLine = document.getElementById("aboutJourneyLeft");
  const rightLine = document.getElementById("aboutJourneyRight");

  if (!leftLine || !rightLine) {
    return;
  }

  const leftLength = leftLine.getTotalLength();
  const rightLength = rightLine.getTotalLength();

  leftLine.style.strokeDasharray = leftLength + " " + leftLength;
  leftLine.style.strokeDashoffset = leftLength;

  rightLine.style.strokeDasharray = rightLength + " " + rightLength;
  rightLine.style.strokeDashoffset = rightLength;

  function updateJourneyProgress() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (documentHeight <= 0) {
      leftLine.style.strokeDashoffset = "0";
      rightLine.style.strokeDashoffset = "0";
      return;
    }

    const progress = Math.min(Math.max(scrollTop / documentHeight, 0), 1);
    const multiplier = 1.12;

    leftLine.style.strokeDashoffset = Math.max(leftLength * (1 - progress * multiplier), 0);
    rightLine.style.strokeDashoffset = Math.max(rightLength * (1 - progress * multiplier), 0);

    const translateY = Math.min(scrollTop * 0.018, 18);
    leftLine.style.transform = "translateY(" + translateY + "px)";
    rightLine.style.transform = "translateY(" + translateY + "px)";
  }

  updateJourneyProgress();
  window.addEventListener("scroll", updateJourneyProgress, { passive: true });
  window.addEventListener("resize", updateJourneyProgress);
}

function initStationMarkerSync() {
  const stations = document.querySelectorAll(".about-station");
  const markers = document.querySelectorAll(".about-station-marker");

  if (!("IntersectionObserver" in window) || stations.length !== markers.length) {
    return;
  }

  const markerObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        const index = Array.prototype.indexOf.call(stations, entry.target);

        if (index === -1) {
          return;
        }

        if (entry.isIntersecting) {
          markers[index].classList.add("is-active");
        } else {
          markers[index].classList.remove("is-active");
        }
      });
    },
    {
      threshold: 0.35
    }
  );

  stations.forEach(function (station) {
    markerObserver.observe(station);
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