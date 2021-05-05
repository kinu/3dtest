import Cylinder from './cylinder.js';

export default class Logo extends THREE.Object3D {
  constructor(radius) {
    super();
    this.cylinder = new Cylinder(radius, radius * 0.7, radius * 0.8, 0xffcea0);
    this.add(this.cylinder);
    this.ts = 0;

    this.loader = new THREE.GLTFLoader();
    this.loader.load("images/text_simple3.glb", (gltf) => {
      this.text = gltf.scene;
      this.text.scale.set(6, 6, 6);
      this.add(this.text);
      // console.log('added!', this.text);
    });
  }

  update(camera) {
    this.ts++;

    if (this.text) {
      this.text.quaternion.copy(camera.quaternion);
      this.text.rotation.z = Math.sin(this.ts/30) / 3;
      this.text.rotation.y = Math.cos(this.ts/60) / 3;
    }

    this.cylinder.update();
  }
};
