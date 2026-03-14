import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js";

const canvas=document.getElementById("aboutSystemCanvas")

const scene=new THREE.Scene()

const camera=new THREE.PerspectiveCamera(
60,
window.innerWidth/window.innerHeight,
0.1,
1000
)

camera.position.z=18

const renderer=new THREE.WebGLRenderer({
canvas,
alpha:true
})

renderer.setSize(window.innerWidth,window.innerHeight)

renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

const POINT_COUNT=180

const positions=[]
const velocities=[]

for(let i=0;i<POINT_COUNT;i++){

positions.push(
(Math.random()-0.5)*36,
(Math.random()-0.5)*50,
(Math.random()-0.5)*14
)

velocities.push(
(Math.random()-0.5)*0.01,
(Math.random()-0.5)*0.01,
(Math.random()-0.5)*0.004
)

}

const geometry=new THREE.BufferGeometry()

geometry.setAttribute(
"position",
new THREE.Float32BufferAttribute(positions,3)
)

const material=new THREE.PointsMaterial({

color:0xff9e47,
size:0.18,
transparent:true,
opacity:.75,
depthWrite:false,
blending:THREE.AdditiveBlending

})

const points=new THREE.Points(geometry,material)

scene.add(points)


function animate(){

const pos=geometry.attributes.position.array

for(let i=0;i<POINT_COUNT;i++){

pos[i*3]+=velocities[i*3]
pos[i*3+1]+=velocities[i*3+1]
pos[i*3+2]+=velocities[i*3+2]

}

geometry.attributes.position.needsUpdate=true

renderer.render(scene,camera)

requestAnimationFrame(animate)

}

animate()


window.addEventListener("scroll",()=>{

const scrollY=window.scrollY

camera.position.y=scrollY*-0.002

})


window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight
camera.updateProjectionMatrix()

renderer.setSize(window.innerWidth,window.innerHeight)

})