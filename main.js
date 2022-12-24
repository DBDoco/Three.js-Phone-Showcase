import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Triangle } from 'three'
import gsap from 'gsap'

const gltfLoader = new GLTFLoader()
let tl = new gsap.timeline()

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

//Phone

gltfLoader.load('phone.glb', (gltf)=>{
    gltf.scene.scale.set(0.5, 0.5, 0.5),
    gltf.scene.rotation.set(0, 3.3, 0),
    scene.add(gltf.scene)

    tl.fromTo('nav', {opacity: 0}, {opacity:1})
    tl.to(gltf.scene.rotation, {y:4.7, duration: 1})
    tl.to(gltf.scene.scale, {x:0.3, y:0.3, z:0.3, duration: 1}, "-=1")
    tl.to(gltf.scene.scale, {x:0.35,y:0.35,z:0.35, duration:1}, "-=1")
    tl.fromTo('.heading', {opacity: 0}, {opacity:1})
    tl.fromTo('nav', {y:"-100%"}, {y:"0%"})

})

// Lights

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
ambientLight.position.x = 2
ambientLight.position.y = 3
ambientLight.position.z = 4
scene.add(ambientLight)


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)


const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()