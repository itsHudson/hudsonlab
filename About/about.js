document.addEventListener("DOMContentLoaded", function () {
  initReveal();
  initSystemField();
  initScrollGlow();
  initScrollShift();
  initMagneticButtons();
  initHeroCompositionTilt();
  initTypewriter();
  initHeroScrollDriven();
  initBackgroundParallax();
  initSectionMotionState();
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
    canvas: canvas,
    textTargets: [
      "#aboutHeroTitle",
      "#aboutHeroSubtitle",
      ".about-typewriter-line",
      ".about-section-heading"
    ]
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
      const shift = Math.max(-14, Math.min(14, centerDistance * -0.024));
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
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!canHover || reduceMotion || !buttons.length) {
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
  const wordTop = document.querySelector(".about-composition-word-top");
  const wordSide = document.querySelector(".about-composition-word-side");
  const wordBottom = document.querySelector(".about-composition-word-bottom");

  if (!stage || !figure || !figureWrap) {
    return;
  }

  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!canHover || reduceMotion) {
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

    if (wordTop) {
      wordTop.style.transform =
        "translate(" + (translateX * 0.12) + "px," + (translateY * 0.08) + "px)";
    }

    if (wordSide) {
      wordSide.style.transform =
        "rotate(90deg) translate(" + (translateX * 0.10) + "px," + (translateY * 0.10) + "px)";
    }

    if (wordBottom) {
      wordBottom.style.transform =
        "translate(" + (translateX * 0.10) + "px," + (translateY * 0.08) + "px)";
    }
  });

  stage.addEventListener("mouseleave", function () {
    figureWrap.style.transform = "";
    figure.style.transform = "";

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

function initTypewriter() {
  const target = document.getElementById("aboutTypewriterText");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!target) {
    return;
  }

  const phrases = [
    "Breaking complexity into usable parts.",
    "Building structure before polish.",
    "Reviewing, refining, improving.",
    "Turning ideas into stronger systems."
  ];

  if (reduceMotion) {
    target.textContent = phrases[0];
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let waitMode = false;

  function tick() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting && !waitMode) {
      charIndex += 1;
      target.textContent = currentPhrase.slice(0, charIndex);

      if (charIndex >= currentPhrase.length) {
        waitMode = true;
        window.setTimeout(function () {
          waitMode = false;
          isDeleting = true;
          tick();
        }, 1200);
        return;
      }
    } else if (isDeleting) {
      charIndex -= 1;
      target.textContent = currentPhrase.slice(0, charIndex);

      if (charIndex <= 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    const speed = isDeleting ? 34 : 64;
    window.setTimeout(tick, speed);
  }

  tick();
}

function initHeroScrollDriven() {
  const hero = document.getElementById("aboutHero");
  const title = document.getElementById("aboutHeroTitle");
  const subtitle = document.getElementById("aboutHeroSubtitle");
  const figureWrap = document.getElementById("aboutHeroFigureWrap");
  const composition = document.getElementById("aboutHeroComposition");

  if (!hero || !title || !subtitle || !figureWrap || !composition) {
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    return;
  }

  let ticking = false;

  function updateHeroScroll() {
    const rect = hero.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height)));
    const decompose = Math.max(0, Math.min(1, (window.scrollY || 0) / (hero.offsetHeight * 0.9)));

    title.style.transform = "translateY(" + (decompose * -14) + "px)";
    subtitle.style.transform = "translateY(" + (decompose * -8) + "px)";
    figureWrap.style.transform =
      "translate(" + (decompose * -10) + "px," + (decompose * -18) + "px) scale(" + (1 - decompose * 0.035) + ")";
    composition.style.opacity = String(1 - decompose * 0.05);

    if (
      window.__aboutSystemFieldInstance &&
      typeof window.__aboutSystemFieldInstance.setScrollProgress === "function"
    ) {
      window.__aboutSystemFieldInstance.setScrollProgress(progress, decompose);
    }

    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(updateHeroScroll);
      ticking = true;
    }
  });

  window.addEventListener("resize", updateHeroScroll);
  updateHeroScroll();
}

function initBackgroundParallax() {
  const layers = document.querySelectorAll(".about-bg-parallax, .about-bg-light, .about-bg-grid");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!layers.length || !canHover || reduceMotion) {
    return;
  }

  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  let animationFrameId = null;

  function onMouseMove(event) {
    const width = window.innerWidth || 1;
    const height = window.innerHeight || 1;

    targetX = (event.clientX / width - 0.5) * 2;
    targetY = (event.clientY / height - 0.5) * 2;

    if (!animationFrameId) {
      animationFrameId = window.requestAnimationFrame(animate);
    }
  }

  function animate() {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;

    layers.forEach(function (layer, index) {
      const strength = (index + 1) * 3.5;
      const moveX = currentX * strength;
      const moveY = currentY * strength * 0.8;
      layer.style.transform = "translate3d(" + moveX + "px," + moveY + "px,0)";
    });

    const deltaX = Math.abs(targetX - currentX);
    const deltaY = Math.abs(targetY - currentY);

    if (deltaX < 0.001 && deltaY < 0.001) {
      animationFrameId = null;
      return;
    }

    animationFrameId = window.requestAnimationFrame(animate);
  }

  window.addEventListener("mousemove", onMouseMove);

  window.addEventListener("mouseleave", function () {
    targetX = 0;
    targetY = 0;

    if (!animationFrameId) {
      animationFrameId = window.requestAnimationFrame(animate);
    }
  });
}

function initSectionMotionState() {
  const sections = document.querySelectorAll(
    ".about-hero, .about-section, .about-closing"
  );

  if (!sections.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    sections.forEach(function (section) {
      section.classList.add("is-active");
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-active");
        } else {
          entry.target.classList.remove("is-active");
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "-8% 0px -8% 0px"
    }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
}