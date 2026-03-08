const words = [
    "Software Developer",
    "Data Analytics Enthusiast",
    "Computer Science Student",
    "Structured Problem Solver"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {
    if (!typingElement) return;

    const currentWord = words[wordIndex];

    if (!isDeleting) {
        charIndex++;
        typingElement.textContent = currentWord.substring(0, charIndex);

        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }
    } else {
        charIndex--;
        typingElement.textContent = currentWord.substring(0, charIndex);

        if (charIndex === 0) {
            isDeleting = false;
            wordIndex++;

            if (wordIndex === words.length) {
                wordIndex = 0;
            }
        }
    }

    const speed = isDeleting ? 45 : 85;
    setTimeout(typeEffect, speed);
}

typeEffect();

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("show");
    });

    const menuLinks = mainNav.querySelectorAll("a");
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("show");
        });
    });
}

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".main-nav a");

function setActiveNav() {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 140;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", setActiveNav);
setActiveNav();

const revealElements = document.querySelectorAll(".reveal");
const skillProgressBars = document.querySelectorAll(".skill-progress");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");

            if (entry.target.classList.contains("skill-card")) {
                const progress = entry.target.querySelector(".skill-progress");
                if (progress) {
                    const targetWidth = progress.getAttribute("data-width");
                    progress.style.width = targetWidth;
                }
            }
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

const backToTop = document.getElementById("backToTop");

function handleBackToTop() {
    if (!backToTop) return;

    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
}

window.addEventListener("scroll", handleBackToTop);
handleBackToTop();

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

const progressBar = document.getElementById("scrollProgress");

function updateProgressBar() {
    if (!progressBar) return;

    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateProgressBar);
window.addEventListener("load", updateProgressBar);
updateProgressBar();