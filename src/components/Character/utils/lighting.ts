import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  // 1. Warm, natural key light on face & body (from front-right)
  const keyLight = new THREE.DirectionalLight(0xfff3e0, 0);
  keyLight.position.set(2.5, 4, 6);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 50;
  scene.add(keyLight);

  // 2. Vibrant purple/cyan rim light from behind for stylish 3D edge glow
  const rimLight = new THREE.DirectionalLight(0xc084fc, 0);
  rimLight.position.set(-3, 3, -3);
  scene.add(rimLight);

  // 3. Soft cool fill light from front-left
  const fillLight = new THREE.DirectionalLight(0x93c5fd, 0);
  fillLight.position.set(-3, 2, 4);
  scene.add(fillLight);

  // 4. Subtle ambient light to keep shadow details rich and colorful
  const ambientLight = new THREE.AmbientLight(0x2e1065, 0.4);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xc2a4ff, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function setPointLight(screenLight: any) {
    if (screenLight.material.opacity > 0.9) {
      pointLight.intensity = screenLight.material.emissiveIntensity * 20;
    } else {
      pointLight.intensity = 0;
    }
  }
  const duration = 2;
  const ease = "power2.inOut";
  function turnOnLights() {
    gsap.to(scene, {
      environmentIntensity: 0.75,
      duration: duration,
      ease: ease,
    });
    gsap.to(keyLight, {
      intensity: 1.6,
      duration: duration,
      ease: ease,
    });
    gsap.to(rimLight, {
      intensity: 1.5,
      duration: duration,
      ease: ease,
    });
    gsap.to(fillLight, {
      intensity: 0.8,
      duration: duration,
      ease: ease,
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
