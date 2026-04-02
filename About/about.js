document.addEventListener("DOMContentLoaded", function () {
  initReveal();
  initSystemField();
  initScrollGlow();
  initScrollShift();
  initMagneticButtons();
  initHeroCompositionTilt();
});

function initReveal() {
  const revealElements = document.querySelectorAll(".reveal, .reveal-delay-1");

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

        const isDelayed = entry.target.classList.contains("reveal-delay-1");

        entry.target.style.transition =
          "opacity " + (isDelayed ? "1.05s" : "0.9s") + " ease, transform " +
          (isDelayed ? "1.05s" : "0.9s") + " ease";

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observerInstance.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach(function (element) {
    observer.observe(element);
  });
}

function initSystemField() {
  if (typeof window.createAboutSystemField !== "function") {
    return;
  }

  const canvas = document.getElementById("aboutSystemCanvas");
  if (!canvas) {
    return;
  }

  window.__aboutSystemFieldInstance = window.createAboutSystemField({
    canvas: canvas
  });
}

function initScrollGlow() {
  const glow = document.querySelector(".about-scroll-glow");
  if (!glow) {
    return;
  }

  let ticking = false;

  function updateGlow() {
    const scrollY = window.scrollY || 0;
    const moveY = Math.min(54, scrollY * 0.04);
    const opacity = Math.min(1, 0.8 + scrollY * 0.0001);

    glow.style.transform = "translateY(" + moveY + "px)";
    glow.style.opacity = String(opacity);

    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(updateGlow);
      ticking = true;
    }
  });

  updateGlow();
}

function initScrollShift() {
  const elements = document.querySelectorAll(".about-scroll-shift");

  if (!elements.length) {
    return;
  }

  let ticking = false;

  function updateShift() {
    const viewportHeight = window.innerHeight || 1;

    elements.forEach(function (element) {
      const rect = element.getBoundingClientRect();
      const centerDistance = rect.top + rect.height / 2 - viewportHeight / 2;
      const shift = Math.max(-12, Math.min(12, centerDistance * -0.024));
      element.style.transform = "translateY(" + shift + "px)";
    });

    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(updateShift);
      ticking = true;
    }
  });

  window.addEventListener("resize", updateShift);
  updateShift();
}

function initMagneticButtons() {
  const buttons = document.querySelectorAll(".magnetic-button");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (!canHover || !buttons.length) {
    return;
  }

  buttons.forEach(function (button) {
    button.addEventListener("mousemove", function (event) {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      button.style.transform =
        "translate(" + (x * 0.05) + "px," + (y * 0.05) + "px)";
    });

    button.addEventListener("mouseleave", function () {
      button.style.transform = "";
    });
  });
}

function initHeroCompositionTilt() {
  const stage = document.querySelector(".about-hero-composition");
  const figure = document.querySelector(".about-hero-figure");
  const figureWrap = document.querySelector(".about-hero-figure-wrap");
  const card = document.querySelector(".about-hero-main-card");
  const wordTop = document.querySelector(".about-composition-word-top");
  const wordSide = document.querySelector(".about-composition-word-side");
  const wordBottom = document.querySelector(".about-composition-word-bottom");

  if (!stage || !figure || !figureWrap) {
    return;
  }

  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (!canHover) {
    return;
  }

  stage.addEventListener("mousemove", function (event) {
    const rect = stage.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((offsetX - centerX) / centerX) * 6;
    const rotateX = -((offsetY - centerY) / centerY) * 6;
    const translateX = ((offsetX - centerX) / centerX) * 10;
    const translateY = ((offsetY - centerY) / centerY) * 8;

    figureWrap.style.transform =
      "translate3d(" +
      translateX +
      "px," +
      translateY +
      "px,0) rotateX(" +
      rotateX +
      "deg) rotateY(" +
      rotateY +
      "deg)";

    figure.style.transform =
      "translate3d(" + (translateX * 0.18) + "px," + (translateY * 0.18) + "px,0) scale(1.02)";

    if (card) {
      card.style.transform =
        "translate(" + (translateX * 0.22) + "px," + (translateY * 0.18) + "px)";
    }

    if (wordTop) {
      wordTop.style.transform =
        "translate(" + (translateX * 0.12) + "px," + (translateY * 0.08) + "px)";
    }

    if (wordSide) {
      wordSide.style.transform =
        "rotate(90deg) translate(" + (translateX * 0.1) + "px," + (translateY * 0.1) + "px)";
    }

    if (wordBottom) {
      wordBottom.style.transform =
        "translate(" + (translateX * 0.1) + "px," + (translateY * 0.08) + "px)";
    }
  });

  stage.addEventListener("mouseleave", function () {
    figureWrap.style.transform = "";
    figure.style.transform = "";

    if (card) {
      card.style.transform = "";
    }

    if (wordTop) {
      wordTop.style.transform = "";
    }

    if (wordSide) {
      wordSide.style.transform = "rotate(90deg)";
    }

    if (wordBottom) {
      wordBottom.style.transform = "";
    }
  });
}