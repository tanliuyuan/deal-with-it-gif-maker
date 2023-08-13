import React from "react";

const ImageUpload = ({ onUpload }) => (
  <form>
    <div className="form-group">
      <div className="form-row">
        <input
          className="form-control-file"
          type="file"
          onChange={onUpload}
          accept="image/*"
        />
      </div>
    </div>
  </form>
);

export default ImageUpload;
