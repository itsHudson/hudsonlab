const text=[
"Software Developer",
"Data Analytics Enthusiast",
"Computer Science Student"
]

let i=0
let j=0
let current=""
let letter=""

function type(){

if(i===text.length){
i=0
}

current=text[i]
letter=current.slice(0,++j)

document.getElementById("typing").textContent=letter

if(letter.length===current.length){
i++
j=0
}

setTimeout(type,120)

}

type()