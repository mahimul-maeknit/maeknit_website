import React from "react";
import Navbar from "../components/Navbar";
import OnboardingForm from "../components/OnboardingForm";

import "../styles/onboarding.css";

function Onboarding({userCity, userCountry, userCountryCode}) {
  console.log('userCity:', userCity);
  console.log('userCountry:', userCountry);
  console.log('userCountryCode:', userCountryCode);
  return (
    <>
      <Navbar page="ONBOARDING" />
      <div className="custom-form-container">
        <OnboardingForm
          userCity={userCity}
          userCountry={userCountry}
          userCountryCode={userCountryCode}
        />
      </div>
    </>
  );
}

export default Onboarding;
