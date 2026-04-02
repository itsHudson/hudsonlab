document.addEventListener("DOMContentLoaded", function () {
  console.log("Connect page loaded.");

  initializeContactReveal();
  initializeContactVisual();
  initializeContactCardSignals();
});

function initializeContactReveal() {
  const revealElements = document.querySelectorAll(".reveal, .reveal-delay, .reveal-delay-2");

  const observer = new IntersectionObserver(
    function (entries) {
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
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach(function (element) {
    observer.observe(element);
  });
}

function initializeContactVisual() {
  if (typeof window.createContactSignalField !== "function") {
    return;
  }

  const canvas = document.getElementById("contactBgCanvas");
  if (!canvas) {
    return;
  }

  window.__contactSignalFieldInstance = window.createContactSignalField({
    canvas: canvas
  });
}

function initializeContactCardSignals() {
  const cards = document.querySelectorAll(".contact-card");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (!cards.length || !canHover) {
    return;
  }

  cards.forEach(function (card) {
    card.addEventListener("mouseenter", function () {
      const mode = card.getAttribute("data-contact-card") || "default";

      if (
        window.__contactSignalFieldInstance &&
        typeof window.__contactSignalFieldInstance.setMode === "function"
      ) {
        window.__contactSignalFieldInstance.setMode(mode);
      }
    });

    card.addEventListener("mouseleave", function () {
      if (
        window.__contactSignalFieldInstance &&
        typeof window.__contactSignalFieldInstance.setMode === "function"
      ) {
        window.__contactSignalFieldInstance.setMode("overview");
      }
    });
  });
}