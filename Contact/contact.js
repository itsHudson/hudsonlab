document.addEventListener("DOMContentLoaded", function () {
  console.log("Connect page loaded.");

  initializeContactReveal();
  initializeContactVisual();
  initializeContactInteractions();
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
  if (typeof window.createContactQuantumRelay !== "function") {
    return;
  }

  const canvas = document.getElementById("contactBgCanvas");
  if (!canvas) {
    return;
  }

  window.__contactQuantumRelayInstance = window.createContactQuantumRelay({
    canvas: canvas
  });
}

function initializeContactInteractions() {
  const cards = document.querySelectorAll(".contact-card");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (!cards.length || !canHover) {
    return;
  }

  cards.forEach(function (card) {
    card.addEventListener("mouseenter", function () {
      const mode = card.getAttribute("data-contact-card") || "overview";

      if (
        window.__contactQuantumRelayInstance &&
        typeof window.__contactQuantumRelayInstance.setMode === "function"
      ) {
        window.__contactQuantumRelayInstance.setMode(mode);
      }
    });

    card.addEventListener("mouseleave", function () {
      if (
        window.__contactQuantumRelayInstance &&
        typeof window.__contactQuantumRelayInstance.setMode === "function"
      ) {
        window.__contactQuantumRelayInstance.setMode("overview");
      }
    });

    card.addEventListener("mousemove", function (event) {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 6;
      const rotateX = -((y - centerY) / centerY) * 5;

      card.style.transform =
        "translateY(-6px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });
}