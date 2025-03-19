import React, { useState, useEffect } from "react";
import "../styles/work.css";
import Navbar from "../components/Navbar";

function Work() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const sampleImages = Array.from({ length: 9 }, (_, index) => `/assets/images/${index + 1}.jpeg`);
    setImages(sampleImages);
  }, []);

  return (
    <>
      <Navbar page="OUR WORK" />
      <div className="work-gallery">
        {images.map((img, index) => (
          <img key={index} src={img} alt={`Work ${index + 1}`} className={`work-image`} />
        ))}
      </div>
    </>
  );
}

export default Work;
