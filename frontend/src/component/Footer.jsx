import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = ({ footerContent = {} }) => {
  const { about = '', quickLinks = [], newsletter = '' } = footerContent;

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">About</h3>
            <p>{about}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p>{newsletter}</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-700 text-white p-2 rounded-md mt-2"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#"><FaFacebook className="text-gray-400 hover:text-white" /></a>
              <a href="#"><FaTwitter className="text-gray-400 hover:text-white" /></a>
              <a href="#"><FaInstagram className="text-gray-400 hover:text-white" /></a>
              <a href="#"><FaLinkedin className="text-gray-400 hover:text-white" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
