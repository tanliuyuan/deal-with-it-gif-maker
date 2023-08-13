import React, { forwardRef, useState } from "react";
import Draggable from "react-draggable";

const Sunglasses = forwardRef((props, ref) => {
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (event, data) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({
      x: x + data.deltaX,
      y: y + data.deltaY,
    });
    props.updatePosition(deltaPosition);
  };

  return (
    <Draggable bounds="parent" onDrag={handleDrag} onStop={handleDrag}>
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
