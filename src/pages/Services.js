import React from "react";
import "../styles/services.css";
import Navbar from "../components/Navbar";

function Services() {
  return (
    <>
    <Navbar page="SERVICES"/>
    <div className="services-container">
      <div className="services-content">
        <div className="services-section">
          <div className="services-header">SWATCHING: WHERE IDEAS TAKE SHAPE</div>
          <div className="services-text">
          Swatches are the foundation of great knitwear.  They are the roadmap to your design.  We offer an extensive in house yarn library and source regionally specific yarns from top mills around the world.
          <br></br>
           Our swatch packages empower designers to experiment freely- exploring materials, stitch constructions, and washes. Track progress in real time with our collaborative whiteboard, where you can store, categorize and rearrange swatches.  Orders ship in 1-2 weeks. 
    
          </div>
        </div>
        <div className="services-section">
          <div className="services-header">RAPID PROTOTYPING</div>
          <div className="services-text">
          Welcome to MAEKNIT!  Give us a bit we’ll knit your fit.  We take you from sketch to SMS in weeks, not months–without cutting corners or compromising details. With decades of experience, our team of technicians, virtual simulators, knitwear programmers, and linkers, deliver high-quality, fully fashioned knitwear with precision and speed. We create virtual mannequins to target your target market, dress them with CAD to ensure your product fits your audience before making a physical sample.   With labs in NYC and London, we provide hands-on development in two global fashion hubs.
          </div>
        </div>

        <div className="services-section">
          <div className="services-header">FLEXIBLE PRODUCTION</div>
          <div className="services-text">
          At MAEKNIT we operate a seamless global production network with partners across the USA, UK, Peru, Turkey, Romania, Bulgaria, Spain, Hong Kong, China, and Bangladesh. With no minimum order quantity (MOQ) required, you can produce as little as one unit, allowing you to scale your brand or create products mid-season without the usual barriers.
          <br></br>
          We believe small-batch production and on-demand knitwear are the future of the industry, providing flexibility and efficiency for brands of all sizes. Whether you're looking to develop a single item or scale a larger production run, our extensive network of factories is equipped to meet your needs. From artisanal craftsmanship to large-scale manufacturing, we have the resources to support your vision at any scale.
          
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Services;