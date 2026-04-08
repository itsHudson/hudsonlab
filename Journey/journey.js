console.log("Journey page loaded.");

document.addEventListener("DOMContentLoaded", function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealElements = document.querySelectorAll(".reveal");
  const hexes = document.querySelectorAll(".hexagon");

  initializeJourneyVisual();
  runReveal(prefersReducedMotion, revealElements);
  enableHexHoverLight(prefersReducedMotion, hexes);
  enableHexEntryAnimation(prefersReducedMotion, hexes);
  enableJourneyHighlight();
  initializeHeroTyping(prefersReducedMotion);
});

function initializeJourneyVisual() {
  if (typeof window.createJourneyVisual !== "function") {
    return;
  }

  const canvas = document.getElementById("journeySystemCanvas");
  if (!canvas) {
    return;
  }

  window.__journeyVisualInstance = window.createJourneyVisual({
    canvas: canvas
  });
}

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

      pushJourneyMode("hover", {
        group: groupName
      });
    });

    node.addEventListener("mouseleave", function () {
      clearJourneyHighlight();
      pushJourneyMode("overview");
    });
  });
}

function pushJourneyMode(modeName, extra) {
  if (
    window.__journeyVisualInstance &&
    typeof window.__journeyVisualInstance.setMode === "function"
  ) {
    window.__journeyVisualInstance.setMode(modeName, extra || {});
  }
}

function initializeHeroTyping(prefersReducedMotion) {
  const typingTarget = document.getElementById("journeyTypingText");
  if (!typingTarget) {
    return;
  }

  const lines = [
    "This journey moves from early structure and operational responsibility toward a more focused path in computer science and data analytics.",
    "Each stage added sharper discipline, stronger execution, and clearer professional direction.",
    "What began with business and operations is now being rebuilt through systems, projects, and technical growth."
  ];

  if (prefersReducedMotion) {
    typingTarget.textContent = lines[0];
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 34;
  let pauseDelay = 1500;

  function typeLoop() {
    const currentLine = lines[lineIndex];

    if (!isDeleting) {
      charIndex += 1;
      typingTarget.textContent = currentLine.slice(0, charIndex);

      if (charIndex === currentLine.length) {
        isDeleting = true;
        setTimeout(typeLoop, pauseDelay);
        return;
      }

      setTimeout(typeLoop, typingDelay);
      return;
    }

    charIndex -= 1;
    typingTarget.textContent = currentLine.slice(0, charIndex);

    if (charIndex === 0) {
      isDeleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
      setTimeout(typeLoop, 340);
      return;
    }

    setTimeout(typeLoop, 18);
  }

  setTimeout(typeLoop, 420);
}