document.addEventListener("DOMContentLoaded", function () {
  initReveal();
  initSystemField();
  initScrollGlow();
  initScrollShift();
  initMagneticButtons();
  initIdentityTilt();
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
          "opacity " + (isDelayed ? "1.05s" : "0.88s") + " ease, transform " +
          (isDelayed ? "1.05s" : "0.88s") + " ease";

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
    const moveY = Math.min(60, scrollY * 0.045);
    const opacity = Math.min(1, 0.84 + scrollY * 0.00012);

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
      const shift = Math.max(-14, Math.min(14, centerDistance * -0.026));
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
        "translate(" + (x * 0.055) + "px," + (y * 0.055) + "px)";
    });

    button.addEventListener("mouseleave", function () {
      button.style.transform = "";
    });
  });
}

function initIdentityTilt() {
  const stage = document.querySelector(".about-identity-stage");
  const core = document.querySelector(".about-identity-core");
  const wordMain = document.querySelector(".about-identity-word-main");
  const wordSide = document.querySelector(".about-identity-word-side");

  if (!stage || !core) {
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

    const rotateY = ((offsetX - centerX) / centerX) * 7;
    const rotateX = -((offsetY - centerY) / centerY) * 7;
    const translateX = ((offsetX - centerX) / centerX) * 10;
    const translateY = ((offsetY - centerY) / centerY) * 8;

    core.style.transform =
      "translate3d(" +
      translateX +
      "px," +
      translateY +
      "px,0) rotateX(" +
      rotateX +
      "deg) rotateY(" +
      rotateY +
      "deg)";

    if (wordMain) {
      wordMain.style.transform =
        "rotate(-90deg) translate(" + (translateX * 0.7) + "px," + (translateY * 0.5) + "px)";
    }

    if (wordSide) {
      wordSide.style.transform =
        "translate(" + (translateX * 0.36) + "px," + (translateY * 0.24) + "px)";
    }
  });

  stage.addEventListener("mouseleave", function () {
    core.style.transform = "";

    if (wordMain) {
      wordMain.style.transform = "rotate(-90deg)";
    }

    if (wordSide) {
      wordSide.style.transform = "";
    }
  });
}