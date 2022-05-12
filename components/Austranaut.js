import React, { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Austranaut = ({ stopRotation }) => {
  const mesh = useRef();
  const gltf = useLoader(GLTFLoader, "/car/scene.gltf");
  const box = new THREE.Box3().setFromObject(gltf.scene);
  const center = box.getCenter(new THREE.Vector3());
  useFrame(() => {
    if (!stopRotation) {
      mesh.current.position.x = gltf.scene.position.x - center.x;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <primitive
      object={gltf.scene}
      ref={mesh}
      position={[
        gltf.scene.position.x - center.x,
        gltf.scene.position.y - center.y,
        gltf.scene.position.z - center.z,
      ]}
    />
  );
};

export default Austranaut;
