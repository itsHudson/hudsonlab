const skills = {

python:{
icon:"🐍",
name:"Python",
description:"Python is used for scripting, automation and structured programming tasks.",

projects:[

{
name:"MyGoPandai Online Learning Platform",

summary:"A web-based learning platform with structured modules for multiple user roles.",

tech:"HTML, CSS, ASP.NET, SQL Server",

github:"https://github.com/itsHudson/MyGoPandai",

features:[
"Role based login system",
"Instructor and learner modules",
"Course management system"
]

}

]

},

cpp:{
icon:"💠",
name:"C++",
description:"C++ is used to implement data structures and algorithm based systems.",

projects:[

{
name:"Bus Reservation System",

summary:"A system to manage bus seat reservations and passenger information.",

tech:"C++",

github:"https://github.com/itsHudson/BusReservationSystem",

features:[
"Seat reservation system",
"Passenger management",
"File storage system"
]

}

]

},

java:{
icon:"☕",
name:"Java",
description:"Java is used for object-oriented system development and application design.",

projects:[

{
name:"OODJ Medical System",

summary:"A Java project for managing clinic patient information.",

tech:"Java",

github:"https://github.com/itsHudson/OODJMedicalSystem",

features:[
"Object oriented programming design",
"Patient record management",
"Clinic workflow simulation"
]

}

]

}

};



const skillButtons=document.querySelectorAll(".orbit-skill");

const skillIcon=document.getElementById("skillIcon");
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

if(!skill) return;

skillIcon.textContent=skill.icon;
skillName.textContent=skill.name;
skillDescription.textContent=skill.description;

projectList.innerHTML="";

skill.projects.forEach((project,index)=>{

const card=document.createElement("button");

card.className="project-preview-card";

card.innerHTML=`
<strong>${project.name}</strong>
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