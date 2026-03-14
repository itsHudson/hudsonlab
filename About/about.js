document.addEventListener("DOMContentLoaded", function () {
  initReveal();
  initNodePulse();
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

function initNodePulse() {
  const hero = document.querySelector('[data-node-target="hero"]');
  const identity = document.querySelector('[data-node-target="identity"]');
  const direction = document.querySelector('[data-node-target="direction"]');

  const map = [
    { section: hero, node: document.querySelector(".direction-node-hero") },
    { section: identity, node: document.querySelector(".direction-node-identity") },
    { section: direction, node: document.querySelector(".direction-node-direction") }
  ];

  if (!("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        const matched = map.find(function (item) {
          return item.section === entry.target;
        });

        if (!matched || !matched.node) {
          return;
        }

        matched.node.classList.remove("is-active");
        void matched.node.offsetWidth;
        matched.node.classList.add("is-active");
      });
    },
    { threshold: 0.28 }
  );

  map.forEach(function (item) {
    if (item.section) {
      observer.observe(item.section);
    }
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

      const rotateY = ((offsetX - centerX) / centerX) * 4.2;
      const rotateX = -((offsetY - centerY) / centerY) * 4.2;

      image.style.transform =
        "translateY(-6px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) scale(1.02)";
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