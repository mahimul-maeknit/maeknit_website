import React, { useState, useEffect } from "react";
import "../styles/work.css";
import Navbar from "../components/Navbar";

function Work() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const sampleImages = Array.from({ length: 90 }, (_, index) => {
      const fileNumber = index + 1;
      const extension = fileNumber <= 7 ? "jpeg" : "png";
      return { src: `/assets/images/${fileNumber}.${extension}`, fileNumber };
    });

    setImages(sampleImages);
  }, []);

  const handleImageError = (index) => {
    setImages((prevImages) => prevImages.filter((img) => img.fileNumber !== index));
  };

  return (
    <>
      <Navbar page="OUR WORK" />
      <div className="work-gallery">
        {images.map((img) => (
          <img
            key={img.fileNumber}
            src={img.src}
            alt={`Work ${img.fileNumber}`}
            className="work-image"
            onError={() => handleImageError(img.fileNumber)}
          />
        ))}
      </div>
    </>
  );
}

export default Work;
