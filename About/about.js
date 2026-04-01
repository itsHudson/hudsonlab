document.addEventListener("DOMContentLoaded", function () {
  initReveal();
  initImageParallax();
  initSystemField();
  initAboutTyping();
});

function initReveal() {
  var revealElements = document.querySelectorAll(".reveal, .reveal-delay-1");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach(function (element) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries, observerInstance) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        var isDelayed = entry.target.classList.contains("reveal-delay-1");
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
  var visuals = document.querySelectorAll(".about-visual");
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (!canHover) {
    return;
  }

  visuals.forEach(function (visual) {
    var image = visual.querySelector(".about-image");
    var backgroundWord = visual.querySelector(".entj-background-word");
    var secondaryWord = visual.querySelector(".entj-background-word-secondary");

    if (!image) {
      return;
    }

    visual.addEventListener("mousemove", function (event) {
      var rect = visual.getBoundingClientRect();
      var offsetX = event.clientX - rect.left;
      var offsetY = event.clientY - rect.top;

      var centerX = rect.width / 2;
      var centerY = rect.height / 2;

      var rotateY = ((offsetX - centerX) / centerX) * 5;
      var rotateX = -((offsetY - centerY) / centerY) * 5;
      var translateX = ((offsetX - centerX) / centerX) * 8;
      var translateY = ((offsetY - centerY) / centerY) * 6;

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
        var wordX = ((offsetX - centerX) / centerX) * 10;
        var wordY = ((offsetY - centerY) / centerY) * 8;
        backgroundWord.style.transform =
          "rotate(-90deg) translate(" + wordX + "px," + wordY + "px)";
      }

      if (secondaryWord) {
        var secondX = ((offsetX - centerX) / centerX) * 6;
        var secondY = ((offsetY - centerY) / centerY) * 4;
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
    return;
  }

  var canvas = document.getElementById("aboutSystemCanvas");
  if (!canvas) {
    return;
  }

  window.createAboutSystemField({
    canvas: canvas
  });
}

function initAboutTyping() {
  var typedTarget = document.getElementById("aboutTypedText");
  if (!typedTarget) {
    return;
  }

  var phrases = [
    "clarity.",
    "structure.",
    "reflection.",
    "care.",
    "continuous improvement."
  ];

  var phraseIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var timeoutId = null;

  function typeLoop() {
    var currentPhrase = phrases[phraseIndex];

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