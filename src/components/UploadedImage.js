import React, { forwardRef, useRef } from "react";

const UploadedImage = forwardRef((props, ref) => {
  return (
    <img
      alt="UploadedImage"
      className="img-fluid"
      ref={ref}
      src={props.src}
      width={props.width}
    />
  );
});

export default UploadedImage;
