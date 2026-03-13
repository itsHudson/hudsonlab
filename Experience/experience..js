console.log("Experience page loaded.");

document.addEventListener("DOMContentLoaded", function () {

const revealElements = document.querySelectorAll(
".reveal, .reveal-delay, .reveal-delay-2"
);

const observer = new IntersectionObserver(
(entries) => {

entries.forEach((entry) => {

if (!entry.isIntersecting) return;

let delay = "0s";

if (entry.target.classList.contains("reveal-delay")) {
delay = "0.12s";
}

if (entry.target.classList.contains("reveal-delay-2")) {
delay = "0.22s";
}

entry.target.style.transition =
`opacity 0.8s ease ${delay}, transform 0.8s ease ${delay}`;

entry.target.style.opacity = "1";
entry.target.style.transform = "translateY(0)";

});

},
{ threshold: 0.12 }
);

revealElements.forEach((el) => observer.observe(el));

});