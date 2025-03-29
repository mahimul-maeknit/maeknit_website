import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import OnboardingModal from "../components/OnboardingModal";
import ChatTrigger from "../components/ChatTrigger";

import "../styles/home.css";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [triggerVisible, setTriggerVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setTriggerVisible(true);
  };

  return (
    <>
      <Navbar page="HOME" />
      <div className="home">
        <div className="video-container">
          <video autoPlay loop muted playsInline className="background-video">
            <source src="/assets/ml_v1.mp4" type="video/mp4" />
          </video>
          <div className="centered-text-container">
            <img
              src="/assets/images/mfaw.png"
              alt="Centered Text"
              className="centered-text"
            />
          </div>
        </div>
      </div>

      <OnboardingModal
        isOpen={showModal}
        compact={true}
        onClose={handleCloseModal}
      />
      {triggerVisible && <ChatTrigger onClick={() => setShowModal(true)} />}
    </>
  );
}

export default Home;
