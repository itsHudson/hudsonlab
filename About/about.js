document.addEventListener("DOMContentLoaded", function () {
  initReveal();
  initImageParallax();
  initSystemField();
  initAboutTyping();
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
          "opacity " + (isDelayed ? "1.15s" : "0.95s") + " ease, transform " +
          (isDelayed ? "1.15s" : "0.95s") + " ease";

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

  visuals.forEach(function (visual) {
    const image = visual.querySelector(".about-image");
    const backgroundWord = visual.querySelector(".entj-background-word");
    const secondaryWord = visual.querySelector(".entj-background-word-secondary");

    if (!image) {
      return;
    }

    visual.addEventListener("mousemove", function (event) {
      const rect = visual.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((offsetX - centerX) / centerX) * 5;
      const rotateX = -((offsetY - centerY) / centerY) * 5;
      const translateX = ((offsetX - centerX) / centerX) * 8;
      const translateY = ((offsetY - centerY) / centerY) * 6;

      image.style.transform =
        "translate3d(" +
        translateX +
        "px," +
        (translateY - 6) +
        "px,0) rotateX(" +
        rotateX +
        "deg) rotateY(" +
        rotateY +
        "deg) scale(1.02)";

      if (backgroundWord) {
        const wordX = ((offsetX - centerX) / centerX) * 10;
        const wordY = ((offsetY - centerY) / centerY) * 8;
        backgroundWord.style.transform =
          "rotate(-90deg) translate(" + wordX + "px," + wordY + "px)";
      }

      if (secondaryWord) {
        const secondX = ((offsetX - centerX) / centerX) * 6;
        const secondY = ((offsetY - centerY) / centerY) * 4;
        secondaryWord.style.transform =
          "translate(" + secondX + "px," + secondY + "px)";
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

function initAboutTyping() {
  const typedTarget = document.getElementById("aboutTypedText");
  if (!typedTarget) {
    return;
  }

  const phrases = [
    "clarity.",
    "structure.",
    "system thinking.",
    "direction.",
    "intent."
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

      timeoutId = window.setTimeout(typeLoop, 62);
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

    timeoutId = window.setTimeout(typeLoop, 34);
  }

  typeLoop();

  window.addEventListener("beforeunload", function () {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
  });
}