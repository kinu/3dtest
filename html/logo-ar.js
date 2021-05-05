export default class Logo extends THREE.Object3D {
  constructor(radius, camera) {
    super();

    this.ts = 0;

    this.loader = new THREE.GLTFLoader();
    this.loaderPromise = new Promise((resolve, reject) => {
      this.loader.load("./images/text_simple2.glb", (gltf) => {
        let scale = radius * 0.6;
        this.text = gltf.scene;
        this.text.scale.set(scale, scale, scale);

        for (let i = 0; i < this.text.children.length; i++) {
          let mesh = this.text.children[i];
          if (mesh.material && mesh.name.startsWith("Torus")) {
            mesh.material.opacity = 0.3;
            mesh.material.transparent = true;
            mesh.material.depthTest = false;
          }
        }
        this.add(this.text);
        // console.log('added!', this.text);
        resolve(this);
      });
    });
  }

  async setup() {
    return this.loaderPromise;
  }

  update() {
    this.ts++;

    if (this.text) {
      this.text.rotation.y = Math.sin(this.ts/30) / 4;
    }

    if (this.cylinder)
      this.cylinder.update();
  }
};
