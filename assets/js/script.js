// mobile menu

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.onclick = () => {

navMenu.classList.toggle("show");

};

// typing animation

const text = [
"Data Analytics Enthusiast",
"Software Developer",
"Computer Science Student"
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

function type(){

if(count === text.length){
count = 0;
}

currentText = text[count];
letter = currentText.slice(0, ++index);

document.getElementById("typing").textContent = letter;

if(letter.length === currentText.length){

count++;
index = 0;

}

setTimeout(type,120);

}

type();