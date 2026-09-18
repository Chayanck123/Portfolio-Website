import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    let isMounted = true;
    let animId: number | null = null;
    let resizeListener: (() => void) | null = null;
    let debounce: number | undefined;

    if (!canvasDiv.current) return;

    // Clean any existing canvas to guarantee exactly one WebGL canvas in the container
    while (canvasDiv.current.querySelector("canvas")) {
      canvasDiv.current.querySelector("canvas")?.remove();
    }

    const rect = canvasDiv.current.getBoundingClientRect();
    const container = {
      width: rect.width || window.innerWidth,
      height: rect.height || window.innerHeight,
    };
    const aspect = container.width / container.height;

    // Fresh, isolated Scene for this mount cycle to prevent ghost duplicates
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    canvasDiv.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.z = 10;
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    let headBone: THREE.Object3D | null = null;
    let screenLight: any | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let loadedCharacter: THREE.Object3D | null = null;

    const clock = new THREE.Clock();

    const light = setLighting(scene);
    let progress = setProgress((value) => setLoading(value));
    const { loadCharacter } = setCharacter(renderer, scene, camera);

    loadCharacter().then((gltf) => {
      // Abort if unmounted during asynchronous decryption/loading
      if (!isMounted || !gltf) return;

      // Remove any previously loaded character model
      if (loadedCharacter) {
        scene.remove(loadedCharacter);
      }
      const existing = scene.getObjectByName("metarig002");
      if (existing && existing.parent) {
        existing.parent.remove(existing);
      }

      const animations = setAnimations(gltf);
      hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
      mixer = animations.mixer;
      const characterObj = gltf.scene;
      loadedCharacter = characterObj;
      scene.add(characterObj);

      headBone = characterObj.getObjectByName("spine006") || null;
      screenLight = characterObj.getObjectByName("screenlight") || null;

      progress.loaded().then(() => {
        setTimeout(() => {
          if (!isMounted) return;
          light.turnOnLights();
          animations.startIntro();
        }, 2500);
      });

      resizeListener = () =>
        handleResize(renderer, camera, canvasDiv, characterObj);
      window.addEventListener("resize", resizeListener);
    });

    let mouse = { x: 0, y: 0 },
      interpolation = { x: 0.1, y: 0.2 };

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => (mouse = { x, y }));
    };

    const onTouchStart = (event: TouchEvent) => {
      const element = event.target as HTMLElement;
      debounce = window.setTimeout(() => {
        element?.addEventListener("touchmove", (e: TouchEvent) =>
          handleTouchMove(e, (x, y) => (mouse = { x, y }))
        );
      }, 200);
    };

    const onTouchEnd = () => {
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    const landingDiv = document.getElementById("landingDiv");
    if (landingDiv) {
      landingDiv.addEventListener("touchstart", onTouchStart);
      landingDiv.addEventListener("touchend", onTouchEnd);
    }

    let isCharacterInView = true;
    const charScrollTrigger = ScrollTrigger.create({
      trigger: ".whatIDO",
      start: "center top",
      onEnter: () => {
        isCharacterInView = false;
      },
      onLeaveBack: () => {
        isCharacterInView = true;
      },
    });

    const animate = () => {
      if (!isMounted) return;
      animId = requestAnimationFrame(animate);

      if (!isCharacterInView) {
        clock.getDelta();
        return;
      }

      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
        light.setPointLight(screenLight);
      }
      const delta = clock.getDelta();
      if (mixer) {
        mixer.update(delta);
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      isMounted = false;
      charScrollTrigger.kill();
      if (animId !== null) {
        cancelAnimationFrame(animId);
      }
      if (debounce) {
        clearTimeout(debounce);
      }
      if (resizeListener) {
        window.removeEventListener("resize", resizeListener);
      }
      document.removeEventListener("mousemove", onMouseMove);
      if (landingDiv) {
        landingDiv.removeEventListener("touchstart", onTouchStart);
        landingDiv.removeEventListener("touchend", onTouchEnd);
      }
      scene.clear();
      renderer.dispose();
      if (
        canvasDiv.current &&
        renderer.domElement.parentNode === canvasDiv.current
      ) {
        canvasDiv.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
