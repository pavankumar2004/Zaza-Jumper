import * as THREE from 'three';

export class FollowCamera {
  constructor(camera) {
    this.camera = camera;
    this.smoothness = 0.1;
    this.offset = new THREE.Vector3(0, 5, 10);
  }

  update(target) {
    const targetPosition = target.position.clone().add(this.offset);
    this.camera.position.lerp(targetPosition, this.smoothness);
    this.camera.lookAt(target.position);
  }
} 