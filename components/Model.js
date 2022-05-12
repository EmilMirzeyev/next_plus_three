import React, { Suspense, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import OrbitControls from "../components/OrbitControls";
import css from "../styles/Home.module.css";

const Austranaut = dynamic(() => import("./Austranaut"), { ssr: false });

function addListenerMulti(element, eventNames, listener) {
  var events = eventNames.split(" ");
  for (var i = 0, iLen = events.length; i < iLen; i++) {
    element.addEventListener(events[i], listener, false);
  }
}

const Model = () => {
  const canvas = useRef();
  const [stopRotate, setStopRotate] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  THREE.DefaultLoadingManager.onProgress = function (
    url,
    itemsLoaded,
    itemsTotal
  ) {
    console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    setProgress((itemsLoaded / itemsTotal) * 100);
    // console.log(itemsTotal);
  };

  THREE.DefaultLoadingManager.onLoad = function () {
    setTimeout(() => {
      setLoaded(true);
    }, 300);
  };

  return (
    <>
      <div
        style={{
          border: "1px solid red",
          height: "20px",
          display: !loaded ? "block" : "none",
        }}
      >
        <div
          style={{
            transition: "all 0.3s",
            backgroundColor: "green",
            width: progress + "%",
            height: "100%",
          }}
        ></div>
      </div>
      <Canvas
        shadows={true}
        className={css.canvas}
        onCreated={(state) => {
          addListenerMulti(state.gl.domElement, "mousedown touchstart", () => {
            setStopRotate(true);
          });
          addListenerMulti(state.gl.domElement, "mouseup touchend", () =>
            setStopRotate(false)
          );
        }}
        camera={{
          position: [0, 0, 4],
        }}
        ref={canvas}
      >
        <OrbitControls />
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <Suspense fallback={null}>
          <Austranaut stopRotation={stopRotate} />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Model;
