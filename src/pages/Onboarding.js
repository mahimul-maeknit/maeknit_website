import React from "react";
import Navbar from "../components/Navbar";

import "../styles/onboarding.css";   

function Onboarding() {
  return (
    <>
    <Navbar page="ONBOARDING"/>

    <div className="onboarding-container">
      <div className="form-section">
        <h2 className="form-header">Get Started with MAEKNIT</h2>
        <p className="form-subtext">
          Fill out the form below to begin your onboarding process.
        </p>

        <div className="jotform-container">
          <iframe
            title="Onboarding Form"
            src="https://form.jotform.com/250766976613166"
            width="100%"
            height="1100px"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
    </>
  );
}

export default Onboarding;