import React from "react";
import dynamic from "next/dynamic";
import css from "../styles/Home.module.css";

const CustomModeling = dynamic(() => import("../components/CustomModeling"), {
  ssr: false,
});

const SimpleModel = dynamic(() => import("../components/SimpleModel"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className={css.scene}>
      <CustomModeling />
      <SimpleModel />
    </div>
  );
}
