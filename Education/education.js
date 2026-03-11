console.log("Education page loaded.");

document.addEventListener("DOMContentLoaded", function () {
  const revealElements = document.querySelectorAll(".edu-reveal, .edu-reveal-delay, .edu-stagger");
  const tiltCards = document.querySelectorAll(".tilt-card");
  const staggerCards = document.querySelectorAll(".edu-stagger");

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
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    revealObserver.observe(element);
  });

  staggerCards.forEach(function (card, index) {
    card.style.transitionDelay = (index * 0.08) + "s";
  });

  tiltCards.forEach(function (card) {
    card.addEventListener("mousemove", function (event) {
      if (window.innerWidth <= 980) {
        return;
      }

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 2.4;
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
});