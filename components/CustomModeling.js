import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import OrbitControls from "./OrbitControls";
import Light from "./LightBulb";
import Floor from "./Floor";
import Box from "./Box";
import css from "../styles/Home.module.css";

const Draggable = dynamic(() => import("./Draggable"), { ssr: false });

const CustomModeling = () => {
  return (
    <div className={css.canvas}>
      <Canvas
        shadows={true}
        camera={{
          position: [-6, 7, 9],
        }}
      >
        <ambientLight color={"white"} intensity={0.2} />
        <Light position={[0, 3, 0]} />
        <Draggable>
          <Suspense fallback={null}>
            <Box rotateX={3} rotateY={0.2} />
          </Suspense>
        </Draggable>
        <OrbitControls />
        <Floor position={[0, -2, 0]} />
      </Canvas>
    </div>
  );
};

export default CustomModeling;
