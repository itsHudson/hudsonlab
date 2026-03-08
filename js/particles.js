function createParticles() {

const container = document.createElement("div");
container.className = "page-particles";

document.body.appendChild(container);

for(let i=0;i<12;i++){

const p = document.createElement("span");

const size = Math.random()*8 + 6;

p.style.width = size+"px";
p.style.height = size+"px";

p.style.left = Math.random()*100+"%";
p.style.bottom = Math.random()*40+"%";

p.style.animationDuration = (10+Math.random()*10)+"s";

container.appendChild(p);

}

}

window.addEventListener("load",createParticles);