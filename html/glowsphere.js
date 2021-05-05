import { ShaderMaterial } from "https://unpkg.com/three@0.128.0/src/materials/ShaderMaterial.js";

// Glow sphere
export default class GlowSphere extends THREE.Object3D {
  constructor(camera, radius) {
    super();

    const geometry = new THREE.SphereGeometry(radius, 20, 20);
    const material = new THREE.ShaderMaterial({
      uniforms : {
        glowColor : {type:'c', value: new THREE.Color(0x96ecff)},
        viewVector: {type:'v3', value: camera.position}
      },
      vertexShader: `
        uniform vec3 viewVector; // Camera position
        varying float opacity; // Opacity
        void main() {
          vec3 nNormal = normalize(normal);
          vec3 nViewVec = normalize(viewVector);
          opacity = dot(nNormal, nViewVec);
          opacity = 1.0 - opacity;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying float opacity;
        void main() {
          gl_FragColor = vec4(glowColor, opacity);
        }
      `,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.add(this.mesh);
  }
};
