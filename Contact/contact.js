document.addEventListener("DOMContentLoaded", function () {
  initializeContactReveal();
  initializeGatewayCardHover();
  initializeContactVisual();
});

function initializeContactReveal() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealElements = document.querySelectorAll(".reveal");

  if (!revealElements.length) {
    return;
  }

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach(function (element) {
      element.classList.add("is-visible");
    });
    return;
  }

  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach(function (element, index) {
    element.style.transitionDelay = Math.min(index * 24, 220) + "ms";
    revealObserver.observe(element);
  });
}

function initializeGatewayCardHover() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cards = document.querySelectorAll(".gateway-card");

  if (prefersReducedMotion || !cards.length) {
    return;
  }

  cards.forEach(function (card) {
    card.addEventListener("mousemove", function (event) {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty("--mx", x + "%");
      card.style.setProperty("--my", y + "%");
    });

    card.addEventListener("mouseleave", function () {
      card.style.setProperty("--mx", "50%");
      card.style.setProperty("--my", "50%");
    });
  });
}

function initializeContactVisual() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    return;
  }

  if (typeof window.createContactGalaxyBackground !== "function") {
    return;
  }

  window.__contactGalaxyBackgroundInstance = window.createContactGalaxyBackground({
    containerId: "three-bg"
  });
}