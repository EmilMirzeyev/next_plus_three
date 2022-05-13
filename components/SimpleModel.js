import React, { useState, useEffect, useRef } from "react";
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
  const [ambient, setAmbient] = useState();
  const [scene] = useState(new THREE.Scene());
  const [model, setModel] = useState();

  useEffect(() => {
    const { current: container } = refBody;
    if (container && !renderer) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;
      const aspectRatio = scW / scH;

      const camera = new THREE.PerspectiveCamera(35, aspectRatio, 0.1, 5000);
      camera.position.set(0, 0, 20);
      console.log(camera);
      setCamera(camera);

      scene.add(new THREE.AxesHelper(500));

      // const ambient = new THREE.AmbientLight('white', 3);
      // scene.add(ambient);

      // const directionalLight = new THREE.DirectionalLight('grey', 1.0);
      // directionalLight.position.set(-5, 120, 0);
      // // directionalLight.target.position.set(50, 0, 100);
      // scene.add(directionalLight);

      const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
      scene.add(hemiLight);

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
      loader.load("/bunny/scene.gltf", function (gltf) {
        scene.add(gltf.scene);
        console.log(gltf.scene.children[0]);
        setModel(() => gltf.scene.children[0]);
        let box = new THREE.Box3().setFromObject(gltf.scene);
        let center = box.getCenter(new THREE.Vector3());
        let size = box.getSize(new THREE.Vector3());
        console.log(size);
        gltf.scene.position.x -= center.x;
        gltf.scene.position.y -= center.y;
        gltf.scene.position.z -= center.z + 2;
        (function animate() {
          requestAnimationFrame(animate);
          gltf.scene.rotation.y += 0.01;
          renderer.render(scene, camera);
        })();
      });
    }
  }, []);

  return (
    <div className={css.canvas} ref={refBody}>
      {/* {loading && <p>loading...</p>} */}
    </div>
  );
};

export default SimpleModel;
