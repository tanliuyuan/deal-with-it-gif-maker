import "bootstrap/dist/css/bootstrap.min.css";
import CreateGifButton from "./components/CreateGifButton";
import Gif from "./components/Gif";
import gifshot from "gifshot";
import ImageUpload from "./components/ImageUpload";
import React, { useRef, useState } from "react";
import Sunglasses from "./components/Sunglasses";
import UploadedImage from "./components/UploadedImage";

function App() {
  const imageRef = useRef();
  const sunglassesRef = useRef();
  const [imageSrc, setimageSrc] = useState(null);
  const [imageWidth, setImageWidth] = useState(0);
  const [gifSrc, setGifSrc] = useState(null);
  const [showUploadedImage, setShowUploadedImage] = useState(false);
  const [showCreateGifButton, setShowCreateGifButton] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [sunglassesPosition, setSunglassesPosition] = useState({ x: 0, y: 0 });

  const handleImageUpload = (event) => {
    const reader = new FileReader();
    const imageWidth = 128;

    let file = event.target.files[0];
    reader.onloadend = (e) => {
      setimageSrc(e.target.result);
      setImageWidth(imageWidth);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    setShowUploadedImage(true);
    setShowCreateGifButton(true);
    setShowGif(false);
  };

  const updateSunglassesPosition = (newPosition) => {
    setSunglassesPosition(newPosition);
  };

  const handleGifCreation = () => {
    const image = imageRef.current;
    const sunglasses = sunglassesRef.current;
    console.log(
      `top: ${sunglasses.offsetTop}, left: ${sunglasses.offsetLeft}, width: ${sunglasses.offsetWidth}, height: ${sunglasses.offsetHeight}`
    );

    const images = [];

    // draw gif frame by frame
    for (
      let i = -sunglasses.offsetHeight;
      i <= sunglasses.offsetTop / 1.3;
      i += 2
    ) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(sunglasses, -10, i, 256, 20);
      images.push(canvas.toDataURL("image/png"));
    }

    // add 10 more frames at the end
    for (let i = 0; i < 10; i++) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(sunglasses, -10, sunglasses.offsetTop / 1.3, 256, 20);
      images.push(canvas.toDataURL("image/png"));
    }

    gifshot.createGIF(
      {
        images: images,
        gifWidth: image.offsetWidth,
        gifHeight: image.offsetHeight,
        numFrames: 5,
        numWorkders: 5,
        frameDuration: 0.01,
        sampleInterval: 10,
      },
      function (result) {
        if (result.error) {
          console.error("An error occurred: ", result.errorMsg);
          return;
        }
        setGifSrc(result.image);
        setShowUploadedImage(false);
        setShowCreateGifButton(false);
        setShowGif(true);
      }
    );
  };

  return (
    <div className="App">
      <ImageUpload onUpload={handleImageUpload} />
      <div width={imageWidth}>
        {showUploadedImage && (
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <UploadedImage ref={imageRef} src={imageSrc} width={imageWidth} />
            <Sunglasses
              ref={sunglassesRef}
              width={imageWidth}
              updatePosition={updateSunglassesPosition}
            />
            <div>
              Current sunglasses position: {sunglassesPosition.x},{" "}
              {sunglassesPosition.y}
            </div>
          </div>
        )}
      </div>
      {showCreateGifButton && <CreateGifButton onClick={handleGifCreation} />}
      {showGif && <Gif src={gifSrc} />}
    </div>
  );
}

export default App;
