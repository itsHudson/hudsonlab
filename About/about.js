document.addEventListener("DOMContentLoaded", function () {
  initReveal();
  initImageParallax();
  initSystemField();
  initAboutTyping();
  initScrollGlow();
  initScrollShift();
  initMagneticButtons();
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
          "opacity " + (isDelayed ? "1.1s" : "0.9s") + " ease, transform " +
          (isDelayed ? "1.1s" : "0.9s") + " ease";

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

function initImageParallax() {
  const visuals = document.querySelectorAll(".about-visual");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (!canHover) {
    return;
  }

  visuals.forEach(function (visual) {
    const image = visual.querySelector(".about-image");
    const backgroundWord = visual.querySelector(".entj-background-word");
    const secondaryWord = visual.querySelector(".entj-background-word-secondary");
    const pulse1 = visual.querySelector(".entj-pulse-ring-1");
    const pulse2 = visual.querySelector(".entj-pulse-ring-2");

    if (!image) {
      return;
    }

    visual.addEventListener("mousemove", function (event) {
      const rect = visual.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((offsetX - centerX) / centerX) * 6;
      const rotateX = -((offsetY - centerY) / centerY) * 6;
      const translateX = ((offsetX - centerX) / centerX) * 10;
      const translateY = ((offsetY - centerY) / centerY) * 8;

      image.style.transform =
        "translate3d(" +
        translateX +
        "px," +
        (translateY - 6) +
        "px,0) rotateX(" +
        rotateX +
        "deg) rotateY(" +
        rotateY +
        "deg) scale(1.03)";

      if (backgroundWord) {
        const wordX = ((offsetX - centerX) / centerX) * 10;
        const wordY = ((offsetY - centerY) / centerY) * 8;
        backgroundWord.style.transform =
          "rotate(-90deg) translate(" + wordX + "px," + wordY + "px)";
      }

      if (secondaryWord) {
        const secondX = ((offsetX - centerX) / centerX) * 8;
        const secondY = ((offsetY - centerY) / centerY) * 5;
        secondaryWord.style.transform =
          "translate(" + secondX + "px," + secondY + "px)";
      }

      if (pulse1) {
        pulse1.style.transform =
          "translate(" + (translateX * 0.3) + "px," + (translateY * 0.3) + "px)";
      }

      if (pulse2) {
        pulse2.style.transform =
          "translate(" + (translateX * 0.16) + "px," + (translateY * 0.16) + "px)";
      }
    });

    visual.addEventListener("mouseleave", function () {
      image.style.transform = "";

      if (backgroundWord) {
        backgroundWord.style.transform = "rotate(-90deg)";
      }

      if (secondaryWord) {
        secondaryWord.style.transform = "";
      }

      if (pulse1) {
        pulse1.style.transform = "";
      }

      if (pulse2) {
        pulse2.style.transform = "";
      }
    });
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

  window.createAboutSystemField({
    canvas: canvas
  });
}

function initAboutTyping() {
  const typedTarget = document.getElementById("aboutTypedText");
  if (!typedTarget) {
    return;
  }

  const phrases = [
    "clarity.",
    "structure.",
    "reflection.",
    "discipline.",
    "continuous improvement."
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let timeoutId = null;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      charIndex += 1;
      typedTarget.textContent = currentPhrase.slice(0, charIndex);

      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        timeoutId = window.setTimeout(typeLoop, 1200);
        return;
      }

      timeoutId = window.setTimeout(typeLoop, 58);
      return;
    }

    charIndex -= 1;
    typedTarget.textContent = currentPhrase.slice(0, charIndex);

    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      timeoutId = window.setTimeout(typeLoop, 220);
      return;
    }

    timeoutId = window.setTimeout(typeLoop, 32);
  }

  typeLoop();

  window.addEventListener("beforeunload", function () {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
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
    const moveY = Math.min(60, scrollY * 0.05);
    const opacity = Math.min(1, 0.9 + scrollY * 0.0002);

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
      const shift = Math.max(-18, Math.min(18, centerDistance * -0.04));
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
        "translate(" + (x * 0.08) + "px," + (y * 0.08) + "px)";
    });

    button.addEventListener("mouseleave", function () {
      button.style.transform = "";
    });
  });
}