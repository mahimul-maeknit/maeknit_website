import React, { useRef, useEffect, useState } from "react";
import { Excalidraw, exportToBlob } from "@excalidraw/excalidraw";
import Navbar from "../components/Navbar";
import "../styles/draw.css";
import TypedText from "./TypedText";

function Draw() {
  const excalidrawRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize(); // Run on mount
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleDownloadPNG = async () => {
    const api = excalidrawRef.current;
    if (!api) return;

    const elements = api.getSceneElements();
    const appState = api.getAppState();

    const blob = await exportToBlob({
      elements,
      appState,
      files: api.getFiles(),
      mimeType: "image/png",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "maeknit-design.png";
    link.click();
    URL.revokeObjectURL(url);
  };

  const messageMobile = "Welcome to your personal workboard!";
  const messageDesktop =
    "Welcome to your personal workboard! Drag And DROP Inspiration associated with your project in the form of photos, drawings or text! Do whatever you want it's yours. We will use this to create your ideas into knit reality! Download your PNG and email it to us at intel@maeknit.io!";

  return (
    <>
      <Navbar page="DRAW" />

      <div className="draw-container">
        <div className="handwritten">
          <TypedText text={isMobile ? messageMobile : messageDesktop} />
        </div>

        <button className="submit-button" onClick={handleDownloadPNG}>
          Download PNG
        </button>
        <div className="draw-wrapper">
          <Excalidraw ref={excalidrawRef} />
        </div>
      </div>
    </>
  );
}

export default Draw;
