import React from "react";
import OnboardingForm from "./OnboardingForm";
import "../styles/onboarding-modal.css";

const OnboardingModal = ({ isOpen, compact = false, onClose }) => {
  return (
    <div
      className="chat-popup-container"
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <div className="chat-popup">
        <button className="chat-close-button" onClick={onClose}>
          ×
        </button>
        <OnboardingForm compact={compact} />
      </div>
    </div>
  );
};

export default OnboardingModal;
