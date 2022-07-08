import React from "react";

import {
  Audio,
  BallTriangle,
  Bars,
  Circles,
  Grid,
  Hearts,
  MutatingDots,
  Oval,
  Plane,
  RevolvingDot,
  Rings,
  TailSpin,
  Triangle,
  Watch,
} from "react-loader-spinner";

const Loader = (props: any) => {
  return (
    <div
      className=""
      style={{
        position: "absolute",
        top: "40%",
        right: 0,
        left: "50%",
        bottom: 0,
      }}
    >
      <TailSpin {...props} />
    </div>
  );
};

export default Loader;
