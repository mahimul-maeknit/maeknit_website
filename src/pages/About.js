import React from "react";
import "../styles/about.css";
import Navbar from "../components/Navbar";

function About() {
  return (
    <>
    <Navbar page="ABOUT"/>
    <div className="about-container">
      <div className="about-content">
        <div className="about-section">
          <div className="about-header">ABOUT US</div>
          <div className="about-text">
            MAEKNIT revolutionizes knitwear development for fashion brands, enabling faster, more sustainable collections with minimal upfront risk. Founded by Mallory Epping, Naeem Riaz, Elias Brown, & Kadri Sen. MAEKNIT eliminates inefficiencies like high minimum order quantities (MOQs) and excessive lead times globally, delivering a responsive, waste-free production process. With cutting-edge technology and sustainable practices, we empower brands to launch trend-responsive collections while minimizing environmental impact. Imagine a service where you can get what you want when you want from where you want. That’s it MAEKNIT.
          </div>
        </div>
      </div>

      <div className="about-quote">
        <p>“The future of knitwear lies in our ability to connect the dots—between technology, education, and sustainability—and create a system that works for everyone.” <br/> - Dr. Andre West</p>
      </div>
    </div>
    </>
  );
}

export default About;