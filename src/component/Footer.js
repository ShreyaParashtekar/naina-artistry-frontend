import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2 className="footer-logo">
            Naina <span>Artistry</span>
          </h2>

          <p>
            Timeless jewellery crafted with elegance, beauty, and tradition.
            Discover handcrafted collections designed for every special moment.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>

          <a href="/home">Home</a>
          <a href="/home/rings">Rings</a>
          <a href="/home/necklace">Necklaces</a>
          <a href="/cart">Cart</a>
        </div>

        <div className="footer-section">
          <h3>Customer Care</h3>

          <p>Email: support@nainaartistry.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Mon - Sat : 9AM - 8PM</p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>

          <div className="social-icons">

            <a
              href="https://www.instagram.com/__naina.creation__?igsh=NGI0cnI4bTFnd2Jr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>

            <a
              href="Shreya Parashtekar (@ShreyaPara73547) / X https://share.google/zkMKBbGRqS7hbhbFV"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>

            <a
              href="https://www.linkedin.com/in/shreya-sanjay-parashtekar-744694270?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>

          </div>
        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 Naina Artistry. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;