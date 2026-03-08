const skills = {

python:{
name:"Python",
description:"Python is widely used for automation, scripting and data analysis.",

projects:[

{
name:"MyGoPandai Online Learning Platform",

summary:"A web-based learning platform with multiple user roles.",

tech:"HTML, CSS, ASP.NET, SQL Server",

github:"https://github.com/itsHudson/MyGoPandai",

features:[
"Role based login",
"Instructor dashboard",
"Course management"
]

}

]

},

cpp:{
name:"C++",
description:"C++ is used for system development and data structure implementation.",

projects:[

{
name:"Bus Reservation System",

summary:"A system that manages seat reservations and passenger data.",

tech:"C++",

github:"https://github.com/itsHudson/BusReservationSystem",

features:[
"Seat reservation",
"Passenger record system",
"File storage"
]

}

]

},

java:{
name:"Java",
description:"Java is used for object oriented programming and application design.",

projects:[

{
name:"OODJ Medical System",

summary:"A system that manages clinic patient records.",

tech:"Java",

github:"https://github.com/itsHudson/OODJMedicalSystem",

features:[
"Patient record system",
"Object oriented architecture",
"Clinic workflow simulation"
]

}

]

}

};



const skillButtons=document.querySelectorAll(".orbit-skill");

const skillName=document.getElementById("skillName");
const skillDescription=document.getElementById("skillDescription");

const projectList=document.getElementById("projectList");

const projectName=document.getElementById("projectName");
const projectSummary=document.getElementById("projectSummary");
const projectTech=document.getElementById("projectTech");
const projectGithub=document.getElementById("projectGithub");
const projectFeatures=document.getElementById("projectFeatures");



function renderProjectDetail(project){

projectName.textContent=project.name;
projectSummary.textContent=project.summary;
projectTech.textContent=project.tech;

projectGithub.innerHTML=`<a href="${project.github}" target="_blank">${project.github}</a>`;

projectFeatures.innerHTML="";

project.features.forEach(feature=>{

const li=document.createElement("li");
li.textContent=feature;

projectFeatures.appendChild(li);

});

}



function renderSkill(skillKey){

const skill=skills[skillKey];

skillName.textContent=skill.name;
skillDescription.textContent=skill.description;

projectList.innerHTML="";

skill.projects.forEach((project,index)=>{

const card=document.createElement("button");

card.className="project-preview-card";

card.innerHTML=`
<strong>${project.name}</strong>
<br>
<span>${project.summary}</span>
`;

card.onclick=()=>renderProjectDetail(project);

projectList.appendChild(card);

if(index===0){

renderProjectDetail(project);

}

});

}



skillButtons.forEach(btn=>{

btn.onclick=()=>{

skillButtons.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

renderSkill(btn.dataset.skill);

};

});



renderSkill("python");