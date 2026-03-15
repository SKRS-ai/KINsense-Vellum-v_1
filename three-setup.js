// KINsense Vellum v1 - 3D Engine Setup
import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('throne-canvas').appendChild(renderer.domElement);

// 1. LIGHTING (To highlight the Brushed Steel & Gold Array)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const bluePointLight = new THREE.PointLight(0x00d4ff, 2, 50);
bluePointLight.position.set(5, 5, 5);
scene.add(bluePointLight);

const goldSpotLight = new THREE.SpotLight(0xf2cc60, 5);
goldSpotLight.position.set(0, -5, 2); // Aimed at the Gold Array
scene.add(goldSpotLight);

// 2. LOAD THE TRUE VELLUM V1 PROTOTYPE
let vellum;
const loader = new GLTFLoader();
loader.load('assets/vellum_v1_core.glb', (gltf) => {
    vellum = gltf.scene;
    vellum.scale.set(1.5, 1.5, 1.5);
    scene.add(vellum);
});

camera.position.z = 5;

// 3. ANIMATION LOOP (Levitation & Rotation)
let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
});

function animate() {
    requestAnimationFrame(animate);
    
    if (vellum) {
        // Subtle levitation (The "Breathing" effect)
        vellum.position.y = Math.sin(Date.now() * 0.001) * 0.1;
        
        // Interactive tilt based on mouse position
        vellum.rotation.y += 0.005 + (mouseX * 0.05);
        vellum.rotation.x = mouseY * 0.2;
    }

    renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});