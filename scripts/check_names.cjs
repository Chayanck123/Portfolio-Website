const fs = require('fs');
global.window = {};
global.document = { createElement: () => ({}) };
global.Image = class {
  constructor() {
    setTimeout(() => { if (this.onload) this.onload(); }, 1);
  }
};
global.THREE = require('three');
const { GLTFLoader } = require('three-stdlib');
const loader = new GLTFLoader();
loader.register((parser) => ({
  name: 'EXT_texture_webp',
  loadTexture: () => Promise.resolve(new THREE.Texture())
}));
const buf = fs.readFileSync('public/models/character.glb');
const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

loader.parse(ab, '', (gltf) => {
  console.log('--- ALL MESHES IN GLTF.SCENE ---');
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      const matName = Array.isArray(child.material) ? child.material.map(m => m.name).join(', ') : child.material.name;
      console.log(`NAME: "${child.name}" | type: ${child.type} | mat: "${matName}"`);
    }
  });
});
