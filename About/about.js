document.addEventListener("DOMContentLoaded", function () {
  initReveal();
  initImageParallax();
  initSystemField();
});

function initReveal() {
  const revealElements = document.querySelectorAll(".reveal");

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

        entry.target.style.transition = "opacity 0.95s ease, transform 0.95s ease";
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observerInstance.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach(function (element) {
    observer.observe(element);
  });
}

function initImageParallax() {
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

      const rotateY = ((offsetX - centerX) / centerX) * 5;
      const rotateX = -((offsetY - centerY) / centerY) * 5;
      const translateX = ((offsetX - centerX) / centerX) * 8;
      const translateY = ((offsetY - centerY) / centerY) * 6;

      image.style.transform =
        "translate3d(" +
        translateX +
        "px," +
        (translateY - 6) +
        "px,0) rotateX(" +
        rotateX +
        "deg) rotateY(" +
        rotateY +
        "deg) scale(1.02)";
    });

    visual.addEventListener("mouseleave", function () {
      image.style.transform = "";
    });
  });
}

function initSystemField() {
  if (typeof window.createAboutSystemField !== "function") {
    console.warn("createAboutSystemField not found.");
    return;
  }

  const canvas = document.getElementById("aboutSystemCanvas");
  if (!canvas) {
    return;
  }

  window.createAboutSystemField({
    canvas: canvas
  });
}