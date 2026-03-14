console.log("About page loaded.");

document.addEventListener("DOMContentLoaded", function () {
  initAboutReveal();
  initAboutParallaxTilt();
  initSphereMouseMove();
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

function initAboutParallaxTilt() {
  const frames = document.querySelectorAll(".about-image-frame");

  frames.forEach(function (frame) {
    frame.addEventListener("mousemove", function (event) {
      const rect = frame.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((offsetX - centerX) / centerX) * 4;
      const rotateX = -((offsetY - centerY) / centerY) * 4;

      frame.style.transform =
        "translateY(-4px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
    });

    frame.addEventListener("mouseleave", function () {
      frame.style.transform = "";
    });
  });
}

function initSphereMouseMove() {
  const sphere = document.querySelector(".wire-sphere");
  const panel = document.querySelector(".about-sphere-panel");

  if (!sphere || !panel) {
    return;
  }

  panel.addEventListener("mousemove", function (event) {
    const rect = panel.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = -((y - centerY) / centerY) * 8;

    sphere.style.transform =
      "rotateX(" + (14 + rotateX * 0.35) + "deg) rotateY(" + rotateY + "deg)";
  });

  panel.addEventListener("mouseleave", function () {
    sphere.style.transform = "";
  });
}