import React, { forwardRef } from "react";
import { flushSync } from "react-dom";
import Moveable from "react-moveable";

const Sunglasses = forwardRef((props, ref) => {
  return (
    <>
      <Moveable
        flushSync={flushSync}
        target={ref}
        draggable={true}
        scalable={true}
        pinchable={true}
        keepRatio={true}
        onDrag={(e) => {
          e.target.style.transform = e.transform;
        }}
        onScale={(e) => {
          e.target.style.width = `${e.width}px`;
          e.target.style.height = `${e.height}px`;
          e.target.style.transform = e.drag.transform;
        }}
      ></Moveable>
      <img
        alt="Sunglasses"
        className="img-fluid"
        ref={ref}
        src={`${process.env.PUBLIC_URL}/images/sunglasses.png`}
        width={props.width}
      />
    </>
  );
});

export default Sunglasses;
