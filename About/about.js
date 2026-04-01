/**
 * HUDSONLAB — About page controller
 *
 * Improvements over original:
 *  1.  no-js class removed immediately so CSS fallbacks work correctly
 *  2.  Reveal uses a CSS class (.is-visible) not inline styles — avoids
 *      cascade conflicts with opacity:0 on .reveal
 *  3.  systemField destroy() stored and called on page unload / SPA nav
 *  4.  Typing effect exposes destroy(); cleaned up on beforeunload AND
 *      on a custom 'page:destroy' event for SPA routers
 *  5.  Parallax mousemove throttled through requestAnimationFrame
 */

(function () {
  "use strict";

  /* ─── remove no-js class immediately ─── */
  document.documentElement.classList.remove("no-js");

  /* ─── module refs for cleanup ─── */
  let systemFieldInstance = null;
  let typingInstance = null;

  /* ─── boot ─── */
  document.addEventListener("DOMContentLoaded", function () {
    initReveal();
    initImageParallax();
    initSystemField();
    typingInstance = initAboutTyping();
  });

  /* ═══════════════════════════════════════════════════
     REVEAL  — class-based, not inline style
  ═══════════════════════════════════════════════════ */
  function initReveal() {
    const elements = document.querySelectorAll(".reveal, .reveal-delay-1");

    /* fallback: no IntersectionObserver support */
    if (!("IntersectionObserver" in window)) {
      elements.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          const isDelayed = entry.target.classList.contains("reveal-delay-1");
          /* duration injected as a custom property so the CSS transition picks it up */
          entry.target.style.setProperty(
            "--reveal-duration",
            isDelayed ? "1.15s" : "0.95s"
          );
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ═══════════════════════════════════════════════════
     IMAGE PARALLAX  — throttled with rAF
  ═══════════════════════════════════════════════════ */
  function initImageParallax() {
    const visuals = document.querySelectorAll(".about-visual");
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!canHover) return;

    visuals.forEach(function (visual) {
      const image          = visual.querySelector(".about-image");
      const backgroundWord = visual.querySelector(".entj-background-word:not(.entj-background-word-secondary)");
      const secondaryWord  = visual.querySelector(".entj-background-word-secondary");

      if (!image) return;

      let pending = false;
      let latestEvent = null;

      function applyTransform() {
        pending = false;
        if (!latestEvent) return;

        const event = latestEvent;
        latestEvent = null;

        const rect    = visual.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        const cx      = rect.width  / 2;
        const cy      = rect.height / 2;
        const nx      = (offsetX - cx) / cx; /* normalised -1 … +1 */
        const ny      = (offsetY - cy) / cy;

        const rotateY    = nx * 5;
        const rotateX    = -ny * 5;
        const translateX = nx * 8;
        const translateY = ny * 6;

        image.style.transform =
          "translate3d(" + translateX + "px," + (translateY - 6) + "px,0)" +
          " rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)" +
          " scale(1.02)";

        if (backgroundWord) {
          backgroundWord.style.transform =
            "rotate(-90deg) translate(" + (nx * 10) + "px," + (ny * 8) + "px)";
        }

        if (secondaryWord) {
          secondaryWord.style.transform =
            "translate(" + (nx * 6) + "px," + (ny * 4) + "px)";
        }
      }

      visual.addEventListener("mousemove", function (event) {
        latestEvent = event;
        if (!pending) {
          pending = true;
          requestAnimationFrame(applyTransform);
        }
      }, { passive: true });

      visual.addEventListener("mouseleave", function () {
        latestEvent = null;
        pending = false;
        image.style.transform = "";
        if (backgroundWord) backgroundWord.style.transform = "rotate(-90deg)";
        if (secondaryWord)  secondaryWord.style.transform  = "";
      });
    });
  }

  /* ═══════════════════════════════════════════════════
     THREE.JS BACKGROUND  — destroy ref stored
  ═══════════════════════════════════════════════════ */
  function initSystemField() {
    if (typeof window.createAboutSystemField !== "function") {
      console.warn("[about.js] createAboutSystemField not found.");
      return;
    }

    const canvas = document.getElementById("aboutSystemCanvas");
    if (!canvas) return;

    /* store the returned { destroy } handle */
    systemFieldInstance = window.createAboutSystemField({ canvas: canvas });
  }

  /* ═══════════════════════════════════════════════════
     TYPING EFFECT  — returns destroy()
  ═══════════════════════════════════════════════════ */
  function initAboutTyping() {
    const typedTarget = document.getElementById("aboutTypedText");
    if (!typedTarget) return null;

    const phrases = [
      "clarity.",
      "structure.",
      "system thinking.",
      "direction.",
      "intent."
    ];

    let phraseIndex = 0;
    let charIndex   = 0;
    let isDeleting  = false;
    let timeoutId   = null;
    let destroyed   = false;

    function typeLoop() {
      if (destroyed) return;

      const current = phrases[phraseIndex];

      if (!isDeleting) {
        charIndex += 1;
        typedTarget.textContent = current.slice(0, charIndex);

        if (charIndex === current.length) {
          isDeleting = true;
          timeoutId  = window.setTimeout(typeLoop, 1400);
          return;
        }
        timeoutId = window.setTimeout(typeLoop, 62);
        return;
      }

      charIndex -= 1;
      typedTarget.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting   = false;
        phraseIndex  = (phraseIndex + 1) % phrases.length;
        timeoutId    = window.setTimeout(typeLoop, 240);
        return;
      }
      timeoutId = window.setTimeout(typeLoop, 34);
    }

    typeLoop();

    function destroy() {
      destroyed = true;
      if (timeoutId) window.clearTimeout(timeoutId);
    }

    return { destroy: destroy };
  }

  /* ═══════════════════════════════════════════════════
     CLEANUP  — handles both page unload and SPA nav
  ═══════════════════════════════════════════════════ */
  function cleanup() {
    if (systemFieldInstance && typeof systemFieldInstance.destroy === "function") {
      systemFieldInstance.destroy();
      systemFieldInstance = null;
    }
    if (typingInstance && typeof typingInstance.destroy === "function") {
      typingInstance.destroy();
      typingInstance = null;
    }
  }

  /* standard page unload */
  window.addEventListener("beforeunload", cleanup);

  /* SPA router hook — dispatch 'page:destroy' from layout.js
     when navigating away to trigger cleanup without full unload */
  document.addEventListener("page:destroy", cleanup);

})();
