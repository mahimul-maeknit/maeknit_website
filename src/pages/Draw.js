import React, { useRef, useEffect, useState } from "react";
import { Excalidraw, exportToBlob } from "@excalidraw/excalidraw";
import Navbar from "../components/Navbar";
import SubmitModal from "../components/SubmitModal";
import "../styles/draw.css";
import TypedText from "./TypedText";

function Draw() {
  const excalidrawRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
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

  const handleOpenSubmitModal = async () => {
    const api = excalidrawRef.current;
    if (!api) return;

    const elements = api.getSceneElements();
    const appState = api.getAppState();
    const files = api.getFiles();

    try {
      const blob = await exportToBlob({
        elements,
        appState,
        files,
        mimeType: "image/png",
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result);
        setIsModalOpen(true);
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error("Error exporting drawing:", err);
    }
  };

  const handleSubmit = async (formData) => {
    setIsSending(true);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, imageBase64: imageData }),
      });

      if (!res.ok) throw new Error("Failed to send");

      alert("Design submitted successfully!");
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Submission failed. Try again.");
    } finally {
      setIsSending(false);
    }
  };

  const messageMobile = "Welcome to your personal workboard!";
  const messageDesktop =
    "Welcome to your personal workboard! Drag And DROP Inspiration associated with your project in the form of photos, drawings or text! Do whatever you want it's yours. We will use this to create your ideas into knit reality!";

  return (
    <>
      <Navbar page="DRAW" />
      <div className="draw-container">
        <div className="handwritten">
          <TypedText text={isMobile ? messageMobile : messageDesktop} />
        </div>

        <div className="button-group">

          <button className="submit-button-alt" onClick={handleOpenSubmitModal}>
            Submit Design
          </button>
        </div>

        <div className="draw-wrapper">
          <Excalidraw ref={excalidrawRef} />
        </div>
      </div>

      <SubmitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        isLoading={isSending}
      />
    </>
  );
}

export default Draw;
