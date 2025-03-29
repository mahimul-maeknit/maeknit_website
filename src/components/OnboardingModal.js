"use client"

import { useState, useRef, useEffect, useCallback } from "react";
import OnboardingForm from "./OnboardingForm"
import "../styles/onboarding-modal.css"

const OnboardingModal = ({ isOpen, compact = false, onClose }) => {
  const [isClosing, setIsClosing] = useState(false)
  const modalRef = useRef(null)

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  }, [onClose]);
  
  // Close when clicking outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Handle escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, onClose])

  if (!isOpen && !isClosing) return null

  return (
    <div className="chat-popup-container">
      <div ref={modalRef} className={`chat-popup ${isClosing ? "closing" : ""}`}>
        <button className="chat-close-button" onClick={handleClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <OnboardingForm compact={compact} />
        <div className="chat-popup-arrow"></div>
      </div>
    </div>
  )
}

export default OnboardingModal

