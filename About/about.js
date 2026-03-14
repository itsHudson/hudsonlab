console.log("About page loaded.");

document.addEventListener("DOMContentLoaded", function () {
  initAboutReveal();
  initAboutImageParallax();
  initAboutSystemField();
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

function initAboutImageParallax() {
  const visuals = document.querySelectorAll(".about-visual");

  visuals.forEach(function (visual) {
    const image = visual.querySelector(".about-image");

    if (!image) {
      return;
    }

    visual.addEventListener("mousemove", function (event) {
      const rect = visual.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((offsetX - centerX) / centerX) * 4;
      const rotateX = -((offsetY - centerY) / centerY) * 4;

      image.style.transform =
        "translateY(-4px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) scale(1.015)";
    });

    visual.addEventListener("mouseleave", function () {
      image.style.transform = "";
    });
  });
}

function initAboutSystemField() {
  if (typeof window.createAboutSystemField !== "function") {
    console.warn("about-visual.js not loaded or createAboutSystemField missing.");
    return;
  }

  const canvas = document.getElementById("aboutSystemCanvas");

  if (!canvas) {
    return;
  }

  window.createAboutSystemField({
    canvas: canvas,
    mode: "entj-system"
  });
}