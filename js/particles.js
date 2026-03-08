function createParticles() {
  const container = document.createElement("div");
  container.className = "page-particles";
  document.body.appendChild(container);

  for (let i = 0; i < 18; i++) {
    const p = document.createElement("span");
    const size = Math.random() * 10 + 4;
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.left = Math.random() * 100 + "%";
    p.style.bottom = Math.random() * 60 + "%";
    p.style.animationDuration = 12 + Math.random() * 14 + "s";
    container.appendChild(p);
  }
}
window.addEventListener("load", createParticles);
