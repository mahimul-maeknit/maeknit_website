import React, { useRef, useEffect, useState } from "react";
import { Excalidraw, exportToBlob } from "@excalidraw/excalidraw";
import Navbar from "../components/Navbar";
import SubmitModal from "../components/SubmitModal";
import "../styles/draw.css";
import TypedText from "./TypedText";
import Toast from "../components/Toast";

function Draw() {
  const excalidrawRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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

      setToast({ message: "Design submitted successfully!", type: "success" });
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      setToast({
        message: "Submission failed. Please try again.",
        type: "error",
      });
    } finally {
      setIsSending(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  const messageMobile = "Welcome to your personal workboard!";
  const messageDesktop =
    "Welcome to your personal workboard! Drag And DROP Inspiration associated with your project in the form of photos, drawings or text! Do whatever you want it's yours. We will use this to create your ideas into knit reality!";

  return (
    <>
      <Navbar page="DRAW" />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
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
