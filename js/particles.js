(function () {
  const PARTICLES = 70;

  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;

    const aura = document.querySelector(".cursor-light");

    if (aura) {
      aura.style.left = e.clientX + "px";
      aura.style.top = e.clientY + "px";
    }
  });

  function createParticle(container) {
    const particle = document.createElement("span");

    const size = Math.random() * 6 + 3;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particle.style.left = Math.random() * 100 + "%";
    particle.style.bottom = Math.random() * 100 + "%";

    const duration = 20 + Math.random() * 30;
    particle.style.animationDuration = duration + "s";

    particle.dataset.depth = Math.random() * 40 + 10;

    const opacity = Math.random() * 0.25 + 0.05;
    particle.style.background = "rgba(255,122,24," + opacity + ")";

    container.appendChild(particle);
  }

  function animateParticles(container) {
    const particles = container.children;

    function frame() {
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const depth = parseFloat(particle.dataset.depth);

        const moveX = (mouseX - 0.5) * depth;
        const moveY = (mouseY - 0.5) * depth;

        particle.style.transform = "translate(" + moveX + "px," + moveY + "px)";
      }

      requestAnimationFrame(frame);
    }

    frame();
  }

  function initParticles() {
    if (document.querySelector(".page-particles")) return;

    const container = document.createElement("div");
    container.className = "page-particles";

    document.body.appendChild(container);

    for (let i = 0; i < PARTICLES; i++) {
      createParticle(container);
    }

    animateParticles(container);
  }

  window.addEventListener("load", initParticles);
})();