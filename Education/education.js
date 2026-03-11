console.log("Education page loaded.");

document.addEventListener("DOMContentLoaded", function () {
  const revealElements = document.querySelectorAll(".reveal, .reveal-delay");
  const meterBars = document.querySelectorAll(".meter-bar span");
  const educationCards = document.querySelectorAll(".education-card");
  const flowNodes = document.querySelectorAll(".flow-node");

  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach(function (element) {
    element.style.opacity = "0";
    element.style.transform = "translateY(24px)";
    element.style.transition = "opacity 0.75s ease, transform 0.75s ease";
    revealObserver.observe(element);
  });

  const meterObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll(".meter-bar span");

          bars.forEach(function (bar) {
            const width = bar.getAttribute("data-width");
            if (width) {
              bar.style.width = width;
            }
          });

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3
    }
  );

  document.querySelectorAll(".education-subpanel").forEach(function (panel) {
    if (panel.querySelector(".meter-bar span")) {
      meterObserver.observe(panel);
    }
  });

  educationCards.forEach(function (card) {
    card.addEventListener("mousemove", function (event) {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateX = ((y / rect.height) - 0.5) * -2;
      const rotateY = ((x / rect.width) - 0.5) * 2;

      card.style.transform =
        "translateY(-5px) perspective(900px) rotateX(" +
        rotateX +
        "deg) rotateY(" +
        rotateY +
        "deg)";
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });

  flowNodes.forEach(function (node) {
    node.addEventListener("mouseenter", function () {
      node.style.transform = "translateY(-4px)";
    });

    node.addEventListener("mouseleave", function () {
      node.style.transform = "";
    });
  });
});