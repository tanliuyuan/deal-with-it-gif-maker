import React from "react";

const CreateGifButton = ({ onClick }) => (
  <button className="btn btn-primary" onClick={onClick} type="button">
    Create GIF
  </button>
);

export default CreateGifButton;
