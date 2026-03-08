const skills = {

python:{
icon:"🐍",
name:"Python",

description:
"Python is used for automation, scripting, and building data analytics tools. It is widely adopted for building efficient and maintainable applications.",

projects:[

{
name:"MyGoPandai Online Learning Platform",

summary:
"A full web-based learning platform designed to support course modules, instructors, and student learning workflows.",

tech:"HTML · CSS · ASP.NET · SQL Server",

github:"https://github.com/itsHudson/MyGoPandai",

features:[
"Role based authentication",
"Course module management",
"Instructor dashboard"
]
}

]
},


cpp:{
icon:"💠",
name:"C++",

description:
"C++ is used to build high performance systems and implement data structure algorithms.",

projects:[

{
name:"Bus Reservation System",

summary:
"A structured reservation system built with data structures to simulate real ticket booking workflows.",

tech:"C++",

github:"https://github.com/itsHudson/BusReservationSystem",

features:[
"Seat reservation logic",
"Passenger record management",
"File based data storage"
]
}

]
},


java:{
icon:"☕",
name:"Java",

description:
"Java is used to design object-oriented applications and simulate real world system workflows.",

projects:[

{
name:"OODJ Medical System",

summary:
"A clinic management simulation built using object oriented design principles.",

tech:"Java",

github:"https://github.com/itsHudson/OODJMedicalSystem",

features:[
"Patient record management",
"Doctor appointment simulation",
"OOP architecture"
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

projectGithub.innerHTML=
`<a href="${project.github}" target="_blank">${project.github}</a>`;

projectFeatures.innerHTML="";

project.features.forEach(feature=>{

const li=document.createElement("li");

li.textContent=feature;

projectFeatures.appendChild(li);

});

}



function renderSkill(skillKey){

const skill=skills[skillKey];

skillIcon.textContent=skill.icon;
skillName.textContent=skill.name;
skillDescription.textContent=skill.description;

projectList.innerHTML="";

skill.projects.forEach((project,index)=>{

const card=document.createElement("div");

card.className="project-preview-card";

card.innerHTML=
`<strong>${project.name}</strong>
<p>${project.summary}</p>`;

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