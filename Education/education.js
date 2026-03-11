console.log("Education Signature Version loaded.");

document.addEventListener("DOMContentLoaded", function () {
  const revealElements = document.querySelectorAll(".edu-reveal, .edu-reveal-delay, .edu-stagger");
  const tiltCards = document.querySelectorAll(".tilt-card");
  const staggerNodes = document.querySelectorAll(".edu-stagger");
  const evolutionLine = document.querySelector(".evolution-line");

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
      threshold: 0.14
    }
  );

  revealElements.forEach(function (element) {
    element.style.transition = "opacity 0.82s ease, transform 0.82s ease";
    revealObserver.observe(element);
  });

  staggerNodes.forEach(function (node, index) {
    node.style.transitionDelay = (index * 0.12) + "s";
  });

  tiltCards.forEach(function (card) {
    card.addEventListener("mousemove", function (event) {
      if (window.innerWidth <= 980) {
        return;
      }

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 2.2;
      const rotateX = ((y / rect.height) - 0.5) * -1.8;

      card.style.transform =
        "perspective(1000px) rotateX(" +
        rotateX +
        "deg) rotateY(" +
        rotateY +
        "deg) translateY(-4px)";
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });

  if (evolutionLine) {
    const lineObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            evolutionLine.style.transform = "scaleY(1)";
            evolutionLine.style.opacity = "1";
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.24
      }
    );

    evolutionLine.style.transformOrigin = "top center";
    evolutionLine.style.transform = "scaleY(0)";
    evolutionLine.style.opacity = "0.4";
    evolutionLine.style.transition = "transform 1.2s ease, opacity 1s ease";

    lineObserver.observe(document.querySelector(".education-evolution"));
  }
});