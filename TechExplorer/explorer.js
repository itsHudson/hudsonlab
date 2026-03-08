const skills = {

python:{
icon:"Images/tech/python.svg",
name:"Python",
},

java:{
icon:"Images/tech/java.svg",
name:"Java",
},

cpp:{
icon:"Images/tech/cpp.svg",
name:"C++",
},

javascript:{
icon:"Images/tech/javascript.svg",
name:"JavaScript",
},

html:{
icon:"Images/tech/html.svg",
name:"HTML",
},

css:{
icon:"Images/tech/css.svg",
name:"CSS",
},

sql:{
icon:"Images/tech/sql.svg",
name:"SQL",
},

r:{
icon:"Images/tech/r.svg",
name:"R",
},

sas:{
icon:"Images/tech/sas.svg",
name:"SAS",
}

};

const skillButtons = document.querySelectorAll('.orbit-skill');
const skillIcon = document.getElementById('skillIcon');
const skillName = document.getElementById('skillName');
const skillDescription = document.getElementById('skillDescription');
const skillMeaning = document.getElementById('skillMeaning');
const skillDirection = document.getElementById('skillDirection');
const projectList = document.getElementById('projectList');
const projectName = document.getElementById('projectName');
const projectSummary = document.getElementById('projectSummary');
const projectTech = document.getElementById('projectTech');
const projectGithub = document.getElementById('projectGithub');
const projectFeatures = document.getElementById('projectFeatures');
const projectThumbPreview = document.getElementById('projectThumbPreview');
const orbitShell = document.getElementById('orbitShell');
let orbitRotation = 0, isDragging = false, startX = 0, startRotation = 0;
function updateOrbitRotation(){ orbitShell.style.setProperty('--orbit-rotation', `${orbitRotation}deg`); }
function renderProjectDetail(project){ projectName.textContent = project.name; projectSummary.textContent = project.summary; projectTech.textContent = project.tech; projectGithub.innerHTML = project.github !== 'Available upon request' ? `<a href="${project.github}" target="_blank">${project.github}</a>` : 'Available upon request'; projectThumbPreview.textContent = project.thumb; projectFeatures.innerHTML = ''; project.features.forEach((feature)=>{ const li=document.createElement('li'); li.textContent=feature; projectFeatures.appendChild(li); }); }
function renderSkill(skillKey){ const skill = skills[skillKey]; if(!skill) return; skillIcon.textContent = skill.icon; skillName.textContent = skill.name; skillDescription.textContent = skill.description; skillMeaning.textContent = skill.meaning; skillDirection.textContent = skill.direction; projectList.innerHTML=''; skill.projects.forEach((project,index)=>{ const card=document.createElement('div'); card.className='project-preview-card'; card.innerHTML=`<strong>${project.name}</strong><p>${project.summary}</p>`; card.onclick=()=>renderProjectDetail(project); projectList.appendChild(card); if(index===0) renderProjectDetail(project); }); }
skillButtons.forEach((btn)=>{ btn.onclick=()=>{ skillButtons.forEach((b)=>b.classList.remove('active')); btn.classList.add('active'); renderSkill(btn.dataset.skill); }; });
orbitShell.addEventListener('mousedown',(event)=>{ isDragging=true; startX=event.clientX; startRotation=orbitRotation; orbitShell.classList.add('dragging'); });
window.addEventListener('mousemove',(event)=>{ if(!isDragging) return; const delta=event.clientX-startX; orbitRotation=startRotation+delta*0.6; updateOrbitRotation(); });
window.addEventListener('mouseup',()=>{ isDragging=false; orbitShell.classList.remove('dragging'); });
orbitShell.addEventListener('touchstart',(event)=>{ isDragging=true; startX=event.touches[0].clientX; startRotation=orbitRotation; orbitShell.classList.add('dragging'); }, {passive:true});
window.addEventListener('touchmove',(event)=>{ if(!isDragging) return; const delta=event.touches[0].clientX-startX; orbitRotation=startRotation+delta*0.6; updateOrbitRotation(); }, {passive:true});
window.addEventListener('touchend',()=>{ isDragging=false; orbitShell.classList.remove('dragging'); });
updateOrbitRotation(); renderSkill('python');
