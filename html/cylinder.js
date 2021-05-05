// Thanks to this article & code:
// https://ics.media/entry/11401/
// https://github.com/ics-creative/160304_threejs_save_point/blob/master/src/Pillar.ts

// import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';

export default class Cylinder extends THREE.Object3D {
  constructor(topRadius, bottomRadius, height, color) {
    super();
    this.counter = 0;

    this.texture = new THREE.TextureLoader().load("images/pillar.png");
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.repeat.set(10, 1);

    const geometry = new THREE.CylinderGeometry(
      topRadius, bottomRadius, height, 20, 1, true);
    const material = new THREE.MeshBasicMaterial({
      color: color,
      map: this.texture,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
      depthWrite: false
    });
    this.cylinder = new THREE.Mesh(geometry, material);
    this.cylinder.rotation.set(60 * Math.PI / 180, 0, 0);
    this.cylinder.position.set(0, 0, 0);
    this.add(this.cylinder);
  }

  update() {
    this.counter += 0.5;
    const angle = (this.counter * Math.PI) / 180;
    // Make the texture move/fluctuate horizontally.
    this.texture.offset.y = 0.1 + 0.3 * Math.sin(angle * 3);
    // Rotate the texture.
    this.texture.offset.x = angle;
  }
}
