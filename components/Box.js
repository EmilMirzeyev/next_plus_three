import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

function Box(props) {
  const texture = useLoader(TextureLoader, "/texture.jpg");
  return (
    <mesh {...props} recieveShadow={true} castShadow={true}>
      <boxBufferGeometry args={[3, 3, 3]} />
      <meshPhysicalMaterial map={texture} color={"white"} />
    </mesh>
  );
}

export default Box;