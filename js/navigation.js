function goTo(path) {
  window.location.href = path;
}

(function createParticles() {
  const holder = document.createElement("div");
  holder.className = "page-particles";

  for (let i = 0; i < 18; i += 1) {
    const dot = document.createElement("span");
    const size = Math.random() * 10 + 6;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.animationDuration = `${8 + Math.random() * 8}s`;
    dot.style.animationDelay = `${Math.random() * 4}s`;
    holder.appendChild(dot);
  }

  document.body.prepend(holder);
})();