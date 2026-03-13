(function () {

  const particleCount = 40;

  function createParticle(container) {

    const particle = document.createElement("span");

    const size = Math.random() * 6 + 3;

    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particle.style.left = Math.random() * 100 + "%";

    particle.style.bottom = Math.random() * 80 + "%";

    const duration = 18 + Math.random() * 20;

    particle.style.animationDuration = duration + "s";

    const drift = (Math.random() * 40) - 20;

    particle.style.transform =
      "translateX(" + drift + "px)";

    const opacity = Math.random() * 0.25 + 0.05;

    particle.style.background =
      "rgba(255,122,24," + opacity + ")";

    container.appendChild(particle);

  }

  function createParticles() {

    if (document.querySelector(".page-particles")) return;

    const container = document.createElement("div");

    container.className = "page-particles";

    document.body.appendChild(container);

    for (let i = 0; i < particleCount; i++) {

      createParticle(container);

    }

  }

  window.addEventListener("load", createParticles);

})();