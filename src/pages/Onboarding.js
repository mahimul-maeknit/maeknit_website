import React from "react";
import Navbar from "../components/Navbar";
import OnboardingForm from "../components/OnboardingForm";

import "../styles/onboarding.css";

function Onboarding() {
  return (
    <>
      <Navbar page="ONBOARDING" />
        <div className="custom-form-container">
          <OnboardingForm />
        </div>
    </>
  );
}

export default Onboarding;
