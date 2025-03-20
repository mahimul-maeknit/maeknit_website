import React from "react";
import "../styles/home.css";
import Navbar from "../components/Navbar";


function Home() {

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
    </>
  );
}

export default Home;