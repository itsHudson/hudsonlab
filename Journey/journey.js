console.log("Journey page loaded.");

document.addEventListener("DOMContentLoaded", function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealElements = document.querySelectorAll(".reveal");
  const hexes = document.querySelectorAll(".hexagon");

  runReveal(prefersReducedMotion, revealElements);
  enableHexHoverLight(prefersReducedMotion, hexes);
  enableHexEntryAnimation(prefersReducedMotion, hexes);
  enableJourneyHighlight();
});

function runReveal(prefersReducedMotion, revealElements) {
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
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
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("is-visible");
    });
  }
}

function enableHexHoverLight(prefersReducedMotion, hexes) {
  if (prefersReducedMotion) {
    return;
  }

  hexes.forEach(function (hex) {
    hex.addEventListener("mousemove", function (event) {
      const rect = hex.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      hex.style.setProperty("--mx", x + "%");
      hex.style.setProperty("--my", y + "%");
    });

    hex.addEventListener("mouseleave", function () {
      hex.style.setProperty("--mx", "50%");
      hex.style.setProperty("--my", "50%");
    });
  });
}

function enableHexEntryAnimation(prefersReducedMotion, hexes) {
  if (prefersReducedMotion) {
    return;
  }

  window.addEventListener("load", function () {
    hexes.forEach(function (hex, index) {
      hex.animate(
        [
          { transform: "translateY(16px)", opacity: 0 },
          { transform: "translateY(0)", opacity: 1 }
        ],
        {
          duration: 680,
          delay: Math.min(index * 28, 500),
          easing: "cubic-bezier(.22,1,.36,1)",
          fill: "both"
        }
      );
    });
  });
}

function clearJourneyHighlight() {
  document.querySelectorAll(".hexagon").forEach(function (node) {
    node.classList.remove("is-dimmed", "is-related");
  });
}

function highlightJourney(nodeName, groupName) {
  const allNodes = document.querySelectorAll(".hexagon");

  allNodes.forEach(function (node) {
    node.classList.add("is-dimmed");
  });

  const relatedNodes = new Set();

  allNodes.forEach(function (node) {
    if (node.dataset.node === nodeName || node.dataset.group === groupName) {
      relatedNodes.add(node);
    }
  });

  relatedNodes.forEach(function (node) {
    node.classList.remove("is-dimmed");
    node.classList.add("is-related");
  });
}

function enableJourneyHighlight() {
  document.querySelectorAll(".hexagon[data-node]").forEach(function (node) {
    node.addEventListener("mouseenter", function () {
      const nodeName = node.dataset.node;
      const groupName = node.dataset.group;
      highlightJourney(nodeName, groupName);
    });

    node.addEventListener("mouseleave", function () {
      clearJourneyHighlight();
    });
  });
}