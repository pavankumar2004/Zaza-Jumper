export class Physics {
  static checkCollision(box1, box2) {
    return (
      box1.position.x - box1.geometry.parameters.width / 2 < box2.position.x + box2.geometry.parameters.width / 2 &&
      box1.position.x + box1.geometry.parameters.width / 2 > box2.position.x - box2.geometry.parameters.width / 2 &&
      box1.position.y - box1.geometry.parameters.height / 2 < box2.position.y + box2.geometry.parameters.height / 2 &&
      box1.position.y + box1.geometry.parameters.height / 2 > box2.position.y - box2.geometry.parameters.height / 2 &&
      box1.position.z - box1.geometry.parameters.depth / 2 < box2.position.z + box2.geometry.parameters.depth / 2 &&
      box1.position.z + box1.geometry.parameters.depth / 2 > box2.position.z - box2.geometry.parameters.depth / 2
    );
  }
} 