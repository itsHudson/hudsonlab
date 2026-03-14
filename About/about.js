console.log("About page loaded");

document.addEventListener("DOMContentLoaded",function(){

initReveal();

});


function initReveal(){

const elements=document.querySelectorAll(".reveal, .reveal-delay, .reveal-delay-2");

if(!("IntersectionObserver" in window)){

elements.forEach(el=>{
el.style.opacity=1;
el.style.transform="translateY(0)";
});

return;
}

const observer=new IntersectionObserver((entries,obs)=>{

entries.forEach(entry=>{

if(!entry.isIntersecting)return;

let delay=0;

if(entry.target.classList.contains("reveal-delay"))delay=.15;
if(entry.target.classList.contains("reveal-delay-2"))delay=.3;

entry.target.style.transition=
`opacity .8s ease ${delay}s, transform .8s ease ${delay}s`;

entry.target.style.opacity=1;
entry.target.style.transform="translateY(0)";

obs.unobserve(entry.target);

});

},{threshold:.15});

elements.forEach(el=>observer.observe(el));

}