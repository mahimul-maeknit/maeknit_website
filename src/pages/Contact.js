import React from "react";
import "../styles/contact.css";
import Navbar from "../components/Navbar";

function Contact() {
  return (
    <>
    <Navbar page="CONTACT"/>
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-section">
          <div className="contact-header">CONTACT US</div>
          <div className="contact-text">
          Connect with us to revolutionize your knitwear development:
          <br></br>
          <strong>Email:</strong> intel@maeknit.io
          <br></br>
          <strong>Location:</strong> Jamaica, NY & London, UK
          <br></br>
          <strong>Phone:</strong> (206) 909-7684


          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Contact;