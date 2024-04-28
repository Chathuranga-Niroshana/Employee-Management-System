import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-gray-900 text-white py-7 p-11">
      <div className="footer__content flex justify-around">
        <div className="footer__section mr-10 w-1/3 pr-8">
          <h3 className="text-xl text-blue-400 font-semibold mb-4">About Us</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            convallis libero in dui iaculis, sed consectetur velit ultricies.
            Phasellus molestie odio vel ligula ultrices, nec interdum justo
            ullamcorper.
          </p>
        </div>
        <div className="footer__section ml-36 w-1/3">
          <h3 className="text-xl text-blue-400 font-semibold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-3">
              <a href="/home" className="text-white hover:underline">
                Home
              </a>
            </li>
            <li className="mb-3">
              <a href="/message" className="text-white hover:underline">
                Messages
              </a>
            </li>
            <li className="mb-3">
              <a href="/#" className="text-white hover:underline">
                About
              </a>
            </li>
            <li className="mb-3">
              <a href="/#" className="text-white hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__section ml-28 w-1/3 right-0">
          <h3 className="text-xl text-blue-400 font-semibold mb-4">Contact Us</h3>
          <p>123 Kandy Road,</p>
          <p>Colombo, Sri Lanka.</p>
          <p>abcd@gmail.com</p>
          <p>+94 123 456 789</p>
        </div>
      </div>
      <div className="footer__bottom text-center mt-8">
        <p>&copy; 2024 Angel (PVT) LTD. All rights reserved.</p>
      </div>
      
    </footer>
  );
};

export default Footer;
