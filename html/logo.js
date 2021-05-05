// import Cylinder from './cylinder.js';
import GlowSphere from './glowsphere.js';

export default class Logo extends THREE.Object3D {
  constructor(radius, camera) {
    super();

    /*
    this.cylinder = new Cylinder(radius, radius * 0.7, radius * 0.8, 0xffcea0);
    this.add(this.cylinder);
    */

    this.sphere = new GlowSphere(camera, radius);
    this.add(this.sphere);

    this.ts = 0;

    this.loader = new THREE.GLTFLoader();
    this.loaderPromise = new Promise((resolve, reject) => {
      this.loader.load("images/text_simple.glb", (gltf) => {
        let scale = radius * 0.5;
        this.text = gltf.scene;
        this.text.rotation.y = 90;
        this.text.scale.set(scale, scale, scale);
        this.add(this.text);
        // console.log('added!', this.text);
        resolve(this);
      });
    });
  }

  async setup() {
    return this.loaderPromise;
  }

  update(camera) {
    this.ts++;

    if (this.text) {
      this.text.quaternion.copy(camera.quaternion);
      this.text.rotation.z = Math.sin(this.ts/30) / 3;
      this.text.rotation.y = Math.cos(this.ts/60) / 3;
    }

    if (this.cylinder)
      this.cylinder.update();
  }
};
