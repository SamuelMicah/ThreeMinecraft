import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { World } from './world';
import { createUI } from './ui';

// Initialize and display stats
const fps_stats = new Stats();
fps_stats.showPanel(0);
document.body.appendChild(fps_stats.dom);

// Renderer Setup
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.setPixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setClearColor(0xffff00)
document.body.appendChild(renderer.domElement);

// Camera Setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.set(-32,16,-32);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(16,0,16);

// Scene Setup
const scene = new THREE.Scene();

const world = new World();
world.generate();
scene.add(world);

function setupLight(){
    const light1 = new THREE.DirectionalLight({color: 0xff0000});
    light1.position.set(1,1,1);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight({color: 0x00ff00});
    light1.position.set(-1,-1,-0.5);
    scene.add(light2);

    const ambient = new THREE.AmbientLight({color: 0xffffff});
    ambient.position.set(1,1,1);
    scene.add(ambient);
}

// Render Loop
function animate(){
    fps_stats.begin();
    
    renderer.render(scene, camera);

    fps_stats.end();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
});

setupLight();
createUI(world);
animate();