import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__section">
          <h3>About Us</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            convallis libero in dui iaculis, sed consectetur velit ultricies.
            Phasellus molestie odio vel ligula ultrices, nec interdum justo
            ullamcorper.ligula ultrices, nec interdum justo ullamcorper.
          </p>
        </div>
        <div className="footer__section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/message">Messages</a>
            </li>
            <li>
              <a href="/#">About</a>
            </li>
            <li>
              <a href="/#">Contact</a>
            </li>
          </ul>
        </div>
        <div className="footer__section">
          <h3>Contact Us</h3>
          <p>123 Kandy Road,</p>
          <p>Colombo, Sri Lanka.</p>
          <p>abcd@gmail.com</p>
          <p>+94 123 456 789</p>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; 2024 Angel (PVT) LTD. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
