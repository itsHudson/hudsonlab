(function () {
  const PARTICLE_COUNT = 70;
  const particleState = {
    mouseX: 0.5,
    mouseY: 0.5
  };

  function updateCursorLight(event) {
    const aura = document.querySelector(".cursor-light");

    particleState.mouseX = event.clientX / window.innerWidth;
    particleState.mouseY = event.clientY / window.innerHeight;

    if (aura) {
      aura.style.left = event.clientX + "px";
      aura.style.top = event.clientY + "px";
    }
  }

  function createParticle(container) {
    const particle = document.createElement("span");

    const size = Math.random() * 6 + 3;
    const duration = 20 + Math.random() * 30;
    const opacity = Math.random() * 0.25 + 0.05;
    const left = Math.random() * 100;
    const bottom = Math.random() * 100;
    const depth = Math.random() * 40 + 10;

    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.left = left + "%";
    particle.style.bottom = bottom + "%";
    particle.style.animationDuration = duration + "s";
    particle.style.background = "rgba(255,122,24," + opacity + ")";
    particle.dataset.depth = depth.toString();

    container.appendChild(particle);
  }

  function animateParticles(container) {
    const particles = container.children;

    function frame() {
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const depth = parseFloat(particle.dataset.depth || "0");

        const moveX = (particleState.mouseX - 0.5) * depth;
        const moveY = (particleState.mouseY - 0.5) * depth;

        particle.style.transform = "translate(" + moveX + "px, " + moveY + "px)";
      }

      window.requestAnimationFrame(frame);
    }

    frame();
  }

  function initParticles() {
    if (document.querySelector(".page-particles")) {
      return;
    }

    const container = document.createElement("div");
    container.className = "page-particles";

    document.body.appendChild(container);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      createParticle(container);
    }

    animateParticles(container);
  }

  document.addEventListener("mousemove", updateCursorLight);
  window.addEventListener("load", initParticles);
})();