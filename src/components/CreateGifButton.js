import React from "react";

const CreateGifButton = ({ onClick }) => (
  <div className="container">
    <div className="row row-cols-4">
      <div className="col">
        <button className="btn btn-primary" onClick={onClick} type="button">
          Create GIF
        </button>
      </div>
    </div>
  </div>
);

export default CreateGifButton;
