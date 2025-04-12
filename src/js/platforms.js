import * as THREE from 'three';

export class PlatformManager {
  constructor() {
    this.platforms = [];
  }

  createPlatform(x, y, z, width, height, depth) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const platform = new THREE.Mesh(geometry, material);
    
    platform.position.set(x, y, z);
    platform.receiveShadow = true;
    
    this.platforms.push(platform);
    return platform;
  }

  getPlatforms() {
    return this.platforms;
  }
} 