console.log("About page loaded.");

document.addEventListener("DOMContentLoaded", function () {
  initAboutReveal();
  initAboutFloatingOrbs();
  initAboutParallax();
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

function initAboutParallax() {
  const card = document.querySelector(".about-parallax-card");
  const media = document.querySelector(".about-parallax-media");

  if (!card || !media) {
    return;
  }

  card.addEventListener("mousemove", function (event) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 4;
    const rotateX = ((centerY - y) / centerY) * 4;

    card.style.transform =
      "perspective(1200px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
    media.style.transform =
      "translate3d(" + rotateY * 1.4 + "px, " + (-rotateX * 1.4) + "px, 0)";
  });

  card.addEventListener("mouseleave", function () {
    card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
    media.style.transform = "translate3d(0, 0, 0)";
  });
}