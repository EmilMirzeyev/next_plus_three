import React, { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import css from "../styles/Home.module.css";

const SimpleModel = () => {
  const refBody = useRef(null);
  const [loading, setLoading] = useState(true);
  const [renderer, setRenderer] = useState();
  const [camera, setCamera] = useState();
  const [controls, setControls] = useState();
  const [spotLight, setSpotLight] = useState();
  const [scene] = useState(new THREE.Scene());
  const [model, setModel] = useState();

  const handleWindowResize = useCallback(() => {
    const { current: container } = refBody;
    if (container && renderer) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(scW, scH);
    }
  }, [renderer]);

  useEffect(() => {
    const { current: container } = refBody;
    if (container && !renderer) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;
      const aspectRatio = scW / scH;
      const camera = new THREE.PerspectiveCamera(35, aspectRatio, 0.1, 5000);
      camera.position.set(0, 0, 20);
      setCamera(camera);

      scene.add(new THREE.AxesHelper(500));

      const hemiLight = new THREE.HemisphereLight(0x888888, 0x080820, 4);
      scene.add(hemiLight);

      const spotLight = new THREE.SpotLight(0xfff9e4, 3);
      spotLight.castShadow = true;
      setSpotLight(spotLight);
      scene.add(spotLight);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(scW, scH);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);
      setRenderer(renderer);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      setControls(controls);

      const loader = new GLTFLoader();
      loader.load("/archive/Astronaut.gltf", function (gltf) {
        scene.add(gltf.scene);
        setModel(() => gltf.scene.children[0]);
        let box = new THREE.Box3().setFromObject(gltf.scene);
        let center = box.getCenter(new THREE.Vector3());
        gltf.scene.position.x -= center.x;
        gltf.scene.position.y -= center.y;
        gltf.scene.position.z -= center.z;
        setLoading(false);
        (function animate() {
          requestAnimationFrame(animate);
          spotLight.position.set(
            camera.position.x + 10,
            camera.position.y + 10,
            camera.position.z + 10
          );
          spotLight.rotation.y + 1;
          gltf.scene.rotation.y += 0.01;
          renderer.render(scene, camera);
        })();
      });

      return () => {
        console.log("unmount");
        cancelAnimationFrame(req);
        renderer.dispose();
      };
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize, false);
    return () => {
      window.removeEventListener("resize", handleWindowResize, false);
    };
  }, [renderer, handleWindowResize]);

  return (
    <div className={css.canvas} ref={refBody}>
      {loading && <p>loading...</p>}
    </div>
  );
};

export default SimpleModel;
