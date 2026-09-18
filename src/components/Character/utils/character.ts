import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;

            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                const norm = mesh.name.replace(/[\._]/g, "").toLowerCase();

                // 1. Natural Warm Indian / Golden Skin Tone (Face, Ears, Neck, Hands)
                if (
                  norm.includes("plane007") ||
                  norm.includes("face") ||
                  norm.includes("neck") ||
                  norm.includes("ear") ||
                  norm.includes("hand")
                ) {
                  // Crucial: remove white vertex color attribute embedded in Plane007 geometry
                  if (mesh.geometry && mesh.geometry.attributes && mesh.geometry.attributes.color) {
                    mesh.geometry.deleteAttribute("color");
                  }
                  mesh.material = new THREE.MeshStandardMaterial({
                    color: new THREE.Color("#d5946e"),
                    roughness: 0.55,
                    metalness: 0.0,
                    emissive: new THREE.Color("#3d1a0e"),
                    emissiveIntensity: 0.15,
                    vertexColors: false,
                  });
                }
                // 2. Smart vibrant tech royal navy / cobalt blue sweater
                else if (norm.includes("bodyshirt") || norm.includes("shirt")) {
                  if (mesh.geometry && mesh.geometry.attributes && mesh.geometry.attributes.color) {
                    mesh.geometry.deleteAttribute("color");
                  }
                  mesh.material = new THREE.MeshStandardMaterial({
                    color: new THREE.Color("#2563eb"),
                    roughness: 0.5,
                    metalness: 0.05,
                    emissive: new THREE.Color("#1d4ed8"),
                    emissiveIntensity: 0.08,
                    vertexColors: false,
                  });
                }
                // 3. Tailored dark slate chinos
                else if (norm.includes("pant")) {
                  mesh.material = new THREE.MeshStandardMaterial({
                    color: new THREE.Color("#1e293b"),
                    roughness: 0.65,
                    metalness: 0.05,
                    vertexColors: false,
                  });
                }
                // 4. Designer slate sneakers
                else if (norm.includes("shoe")) {
                  mesh.material = new THREE.MeshStandardMaterial({
                    color: new THREE.Color("#0f172a"),
                    roughness: 0.45,
                    metalness: 0.08,
                    vertexColors: false,
                  });
                }
                // 5. Crisp white sneaker soles
                else if (norm.includes("sole")) {
                  mesh.material = new THREE.MeshStandardMaterial({
                    color: new THREE.Color("#f8fafc"),
                    roughness: 0.35,
                    metalness: 0.0,
                    vertexColors: false,
                  });
                }
                // 6. Styled natural espresso hair
                else if (norm.includes("hair")) {
                  mesh.material = new THREE.MeshStandardMaterial({
                    color: new THREE.Color("#1c1411"),
                    roughness: 0.3,
                    metalness: 0.12,
                    vertexColors: false,
                  });
                }
                // 7. Crisp dark eyebrows
                else if (norm.includes("eyebrow")) {
                  mesh.material = new THREE.MeshStandardMaterial({
                    color: new THREE.Color("#120c0a"),
                    roughness: 0.5,
                    metalness: 0.0,
                    vertexColors: false,
                  });
                }
                // 8. Eyes - keep texture, add lifelike corneal gloss
                else if (norm.includes("eye")) {
                  const mat = (
                    Array.isArray(mesh.material)
                      ? mesh.material[0]
                      : mesh.material
                  ) as THREE.MeshStandardMaterial;
                  if (mat) {
                    mat.roughness = 0.05;
                    mat.metalness = 0.05;
                    mat.needsUpdate = true;
                  }
                }
              }
            });

            await renderer.compileAsync(character, camera, scene);
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
