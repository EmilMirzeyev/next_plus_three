import React, { useState } from "react";
import dynamic from "next/dynamic";
import css from "../styles/Home.module.css";

// const TrueModel = dynamic(() => import("../components/TrueModel"), {
//   ssr: false,
//   // loading: () => <p>Loading...</p>,
// });

// const CustomModeling = dynamic(() => import("../components/CustomModeling"), {
//   ssr: false,
// });
const SimpleModel = dynamic(() => import("../components/SimpleModel"), {
  ssr: false,
});

export default function Home() {
  const [load, setLoad] = useState(false);
  return (
    <div className={css.scene}>
      {/* <CustomModeling /> */}
      <SimpleModel />
      {/* <TrueModel /> */}

      <button onClick={() => setLoad(true)}>Load GLTF</button>
    </div>
  );
}
