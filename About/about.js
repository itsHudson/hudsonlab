document.addEventListener("DOMContentLoaded",()=>{

const revealElements=document.querySelectorAll(".reveal")

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity=1
entry.target.style.transform="translateY(0)"

}

})

},{threshold:.15})

revealElements.forEach(el=>{

el.style.opacity=0
el.style.transform="translateY(40px)"
el.style.transition="all .8s ease"

observer.observe(el)

})

})