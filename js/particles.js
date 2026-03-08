(function createParticles() {
  const holder = document.createElement('div');
  holder.className = 'page-particles';
  for (let i = 0; i < 18; i += 1) {
    const dot = document.createElement('span');
    const size = Math.random() * 8 + 6;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.bottom = `${Math.random() * 40}%`;
    dot.style.animationDuration = `${10 + Math.random() * 10}s`;
    holder.appendChild(dot);
  }
  document.body.prepend(holder);
})();
