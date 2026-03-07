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

particlesJS.load('particles-js','https://cdn.jsdelivr.net/particles.js/2.0.0/particles.json');