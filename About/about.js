document.addEventListener("DOMContentLoaded", function () {
  initReveal();
  initSystemField();
  initScrollGlow();
  initScrollShift();
  initMagneticButtons();
  initSignatureTilt();
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

function initSignatureTilt() {
  const stage = document.querySelector(".about-signature-stage");
  const photo = document.querySelector(".about-signature-photo");
  const photoWrap = document.querySelector(".about-signature-photo-wrap");
  const primaryNote = document.querySelector(".about-identity-note-primary");
  const secondaryNote = document.querySelector(".about-identity-note-secondary");
  const tagRow = document.querySelector(".about-identity-tags");
  const wordTop = document.querySelector(".about-signature-word-top");
  const wordSide = document.querySelector(".about-signature-word-side");
  const wordBottom = document.querySelector(".about-signature-word-bottom");

  if (!stage || !photo || !photoWrap) {
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

    photoWrap.style.transform =
      "translate3d(" +
      translateX +
      "px," +
      translateY +
      "px,0) rotateX(" +
      rotateX +
      "deg) rotateY(" +
      rotateY +
      "deg)";

    photo.style.transform =
      "translate3d(" + (translateX * 0.2) + "px," + (translateY * 0.2) + "px,0) scale(1.02)";

    if (primaryNote) {
      primaryNote.style.transform =
        "translate(" + (translateX * 0.42) + "px," + (translateY * 0.34) + "px)";
    }

    if (secondaryNote) {
      secondaryNote.style.transform =
        "translate(" + (translateX * -0.34) + "px," + (translateY * -0.26) + "px)";
    }

    if (tagRow) {
      tagRow.style.transform =
        "translate(" + (translateX * 0.24) + "px," + (translateY * 0.18) + "px)";
    }

    if (wordTop) {
      wordTop.style.transform =
        "translate(" + (translateX * 0.18) + "px," + (translateY * 0.12) + "px)";
    }

    if (wordSide) {
      wordSide.style.transform =
        "rotate(90deg) translate(" + (translateX * 0.12) + "px," + (translateY * 0.12) + "px)";
    }

    if (wordBottom) {
      wordBottom.style.transform =
        "translate(" + (translateX * 0.14) + "px," + (translateY * 0.10) + "px)";
    }
  });

  stage.addEventListener("mouseleave", function () {
    photoWrap.style.transform = "";
    photo.style.transform = "";

    if (primaryNote) {
      primaryNote.style.transform = "";
    }

    if (secondaryNote) {
      secondaryNote.style.transform = "";
    }

    if (tagRow) {
      tagRow.style.transform = "";
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