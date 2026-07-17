import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <div className="hero-content">
        <h1>
          Timeless Jewellery
          <br />
          Crafted With Elegance
        </h1>

        <p>
          Discover handcrafted gold, diamond and designer jewellery
          for every occasion.
        </p>

        <button
          className="shop-btn"
          onClick={() => navigate("/home")}
        >
          Shop Collection →
        </button>
      </div>
    </div>
  );
}

export default Hero;