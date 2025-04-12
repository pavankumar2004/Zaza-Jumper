import './style.css';
import * as THREE from 'three';
import { Player } from './js/player';
import { PlatformManager } from './js/platforms';
import { FollowCamera } from './js/camera';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(0, 15, 5);
directionalLight.castShadow = true;

// Configure shadow properties
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
directionalLight.shadow.camera.left = -15;
directionalLight.shadow.camera.right = 15;
directionalLight.shadow.camera.top = 15;
directionalLight.shadow.camera.bottom = -15;

scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

// Create player
const player = new Player();
scene.add(player.mesh);
player.mesh.position.y = 5;

// Create platforms
const platformManager = new PlatformManager();

// Ground
scene.add(platformManager.createPlatform(0, -2, 0, 20, 1, 20));

// Flying steps - creating a more interesting path
scene.add(platformManager.createPlatform(-4, 0, 0, 3, 0.5, 3));    // First step
scene.add(platformManager.createPlatform(0, 2, -1, 3, 0.5, 3));    // Second step
scene.add(platformManager.createPlatform(4, 4, 0, 3, 0.5, 3));     // Third step
scene.add(platformManager.createPlatform(0, 6, 1, 3, 0.5, 3));     // Fourth step
scene.add(platformManager.createPlatform(-4, 8, 0, 3, 0.5, 3));    // Fifth step
scene.add(platformManager.createPlatform(0, 10, -1, 3, 0.5, 3));   // Sixth step

// Camera setup
const followCamera = new FollowCamera(camera);

// Input handling
const keys = {};
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Handle input
  if (keys['a'] || keys['ArrowLeft']) player.moveLeft();
  if (keys['d'] || keys['ArrowRight']) player.moveRight();
  if (keys[' ']) player.jump();

  // Update player
  player.update(platformManager.getPlatforms());

  // Update camera
  followCamera.update(player.mesh);

  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();