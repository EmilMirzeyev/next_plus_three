import React from "react";

function Floor(props) {
  return (
    <mesh {...props} recieveShadow={true}>
      <boxBufferGeometry args={[10,1,10]} />
      <meshPhysicalMaterial color='white' />
    </mesh>
  );
}

export default Floor;