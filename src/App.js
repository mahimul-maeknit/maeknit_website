import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Work from "./pages/Work";
import Onboarding from "./pages/Onboarding";
import Draw from "./pages/Draw";

// Initialize GA once
ReactGA.initialize("G-JVQKEJ6TGH");

function App() {
  const location = useLocation();
  const [userCity, setUserCity] = useState(null);
  const [userCountry, setUserCountry] = useState(null);
  const [userCountryCode, setUserCountryCode] = useState(null);
  
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data.city) setUserCity(data.city);
        if (data.country) setUserCountry(data.country); // or data.country_name
        if (data.country_code) setUserCountryCode(data.country_code);
      })
      .catch((err) => {
        console.error("IP Geolocation error:", err);
      });
  }, []);

  return (
    <div className="App">
      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                userCity={userCity}
                userCountry={userCountry}
                userCountryCode={userCountryCode}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/onboarding"
            element={
              <Onboarding
                userCity={userCity}
                userCountry={userCountry}
                userCountryCode={userCountryCode}
              />
            }
          />
          <Route path="/work" element={<Work />} />
          <Route path="/draw" element={<Draw />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
