import React, { forwardRef } from "react";
import Draggable from "react-draggable";

const Sunglasses = forwardRef((props, ref) => {
  return (
    <Draggable bounds="parent">
      <img
        alt="Sunglasses"
        className="img-fluid"
        ref={ref}
        src={`${process.env.PUBLIC_URL}/images/sunglasses.png`}
        width={props.width}
      />
    </Draggable>
  );
});

export default Sunglasses;
