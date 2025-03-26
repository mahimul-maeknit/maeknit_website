import React, { useEffect } from "react";
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

  useEffect(() => {
    // Fire a pageview on route change
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return (
    <div className="App">
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/work" element={<Work />} />
          <Route path="/draw" element={<Draw />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
