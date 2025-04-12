import * as THREE from 'three';
import { Physics } from './physics';

export class Player {
  constructor() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    
    this.velocity = new THREE.Vector3();
    this.speed = 0.15;
    this.jumpForce = 0.3;
    this.gravity = -0.01;
    this.isGrounded = false;
  }

  update(platforms) {
    // Apply gravity
    this.velocity.y += this.gravity;
    
    // Update position
    this.mesh.position.add(this.velocity);

    // Check collisions with all platforms
    this.isGrounded = false;
    platforms.forEach(platform => {
      if (Physics.checkCollision(this.mesh, platform)) {
        // If we're moving down and hit something, we're grounded
        if (this.velocity.y < 0) {
          this.isGrounded = true;
          this.velocity.y = 0;
          this.mesh.position.y = platform.position.y + platform.geometry.parameters.height / 2 + this.mesh.geometry.parameters.height / 2;
        }
      }
    });
  }

  jump() {
    if (this.isGrounded) {
      this.velocity.y = this.jumpForce;
      this.isGrounded = false;
    }
  }

  moveLeft() {
    this.mesh.position.x -= this.speed;
  }

  moveRight() {
    this.mesh.position.x += this.speed;
  }
} 