console.log("Education page loaded");

const revealElements = document.querySelectorAll(".reveal, .reveal-delay");

const observer = new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.style.opacity=1;
entry.target.style.transform="translateY(0)";
}
});
});

revealElements.forEach(el=>{
el.style.opacity=0;
el.style.transform="translateY(30px)";
el.style.transition="all .8s ease";
observer.observe(el);
});