function createParticles() {
  if (document.querySelector(".page-particles")) {
    return;
  }

  const container = document.createElement("div");
  container.className = "page-particles";
  document.body.appendChild(container);

  for (let index = 0; index < 18; index++) {
    const particle = document.createElement("span");
    const size = Math.random() * 10 + 4;

    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.bottom = Math.random() * 60 + "%";
    particle.style.animationDuration = 12 + Math.random() * 14 + "s";

    container.appendChild(particle);
  }
}

window.addEventListener("load", createParticles);