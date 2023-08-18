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

  const drawGifFrame = (image, sunglasses, sunglassesX, sunglassesY) => {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, image.width, image.height);
    ctx.drawImage(
      sunglasses,
      sunglassesX,
      sunglassesY,
      sunglasses.width,
      sunglasses.height
    );
    return canvas.toDataURL("image/png");
  };

  const handleGifCreation = () => {
    const image = imageRef.current;
    const sunglasses = sunglassesRef.current;
    const imageRect = image.getBoundingClientRect();
    const sunglassesRect = sunglasses.getBoundingClientRect();

    const images = [];

    // draw gif frame by frame
    for (
      let i = -sunglasses.height;
      i <= sunglassesRect.top - imageRect.top;
      i += 2
    ) {
      images.push(
        drawGifFrame(image, sunglasses, sunglassesRect.left - imageRect.left, i)
      );
    }

    // add 10 more frames at the end
    for (let i = 0; i < 10; i++) {
      images.push(
        drawGifFrame(
          image,
          sunglasses,
          sunglassesRect.left - imageRect.left,
          sunglassesRect.top - imageRect.top
        )
      );
    }

    gifshot.createGIF(
      {
        images: images,
        gifWidth: image.width,
        gifHeight: image.height,
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
            <Sunglasses ref={sunglassesRef} width={imageWidth / 2} />
          </div>
        )}
      </div>
      {showCreateGifButton && <CreateGifButton onClick={handleGifCreation} />}
      {showGif && <Gif src={gifSrc} />}
    </div>
  );
}

export default App;
