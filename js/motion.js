(function () {
  function initRevealSystem() {
    const revealItems = document.querySelectorAll(".reveal, .reveal-delay, .reveal-delay-2");

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach(function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  }

  function initHeroParallax() {
    const card = document.querySelector(".parallax-card");
    const media = document.querySelector(".parallax-media");

    if (!card || !media) {
      return;
    }

    function onMove(event) {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 6;
      const rotateX = ((centerY - y) / centerY) * 6;

      card.style.transform =
        "perspective(1200px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-4px)";
      media.style.transform =
        "translate3d(" + (rotateY * 1.8) + "px, " + (-rotateX * 1.8) + "px, 26px) scale(1.02)";
    }

    function resetCard() {
      card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)";
      media.style.transform = "translate3d(0, 0, 0) scale(1)";
    }

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", resetCard);
  }

  function initMagneticButtons() {
    const buttons = document.querySelectorAll(".magnetic-button");

    buttons.forEach(function (button) {
      button.addEventListener("mousemove", function (event) {
        const rect = button.getBoundingClientRect();
        const offsetX = event.clientX - rect.left - rect.width / 2;
        const offsetY = event.clientY - rect.top - rect.height / 2;

        const moveX = offsetX * 0.16;
        const moveY = offsetY * 0.16;

        button.style.transform = "translate(" + moveX + "px, " + moveY + "px)";
      });

      button.addEventListener("mouseleave", function () {
        button.style.transform = "translate(0, 0)";
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initRevealSystem();
    initHeroParallax();
    initMagneticButtons();
  });
})();