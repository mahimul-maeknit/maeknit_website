"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import OnboardingModal from "../components/OnboardingModal"
import ChatTrigger from "../components/ChatTrigger"
import "../styles/home.css"

function Home() {
  const [showModal, setShowModal] = useState(false)
  const [triggerVisible, setTriggerVisible] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    // Show modal after 2 seconds, but only if user hasn't interacted yet
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowModal(true)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [hasInteracted])

  const handleCloseModal = () => {
    setShowModal(false)
    setTriggerVisible(true) // Show the chat trigger button after closing modal
    setHasInteracted(true)
  }

  const handleOpenModal = () => {
    setShowModal(true)
  }

  return (
    <>
      <Navbar page="HOME" />
      <div className="home">
        <div className="video-container">
          <video autoPlay loop muted playsInline className="background-video">
            <source src="/assets/ml_v1.mp4" type="video/mp4" />
          </video>
          <div className="centered-text-container">
            <img src="/assets/images/mfaw.png" alt="Centered Text" className="centered-text" />
          </div>
        </div>
      </div>

      {/* Chat popup modal */}
      <OnboardingModal isOpen={showModal} compact={true} onClose={handleCloseModal} />

      {/* Chat trigger button */}
      <ChatTrigger onClick={handleOpenModal} hidden={showModal} />
      </>
  )
}

export default Home

