/* =========================================================
   SKILL GLOBE PROJECT FILTER
   ========================================================= */

document.addEventListener("DOMContentLoaded",()=>{

const skillIcons=document.querySelectorAll(".skill-icon");
const preview=document.getElementById("SkillProjectPreview");

skillIcons.forEach(icon=>{

icon.addEventListener("click",()=>{

const skill=icon.dataset.skill;

showProjects(skill);

});

});

});


async function showProjects(skill){

const res=await fetch("assets/data/projects.json");
const data=await res.json();

const preview=document.getElementById("SkillProjectPreview");

const filtered=data.projects.filter(p=>p.skills.includes(skill));

if(filtered.length===0){

preview.innerHTML="<p>No projects for this skill yet.</p>";
return;

}

preview.innerHTML=filtered.map(p=>`

<div class="skill-project-card">

<h4>${p.title}</h4>

<p>${p.description}</p>

<a href="${p.github}" target="_blank">

<i class="fa-brands fa-github"></i> View Project

</a>

</div>

`).join("");

}