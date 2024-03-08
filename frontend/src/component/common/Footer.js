import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Small-Light.png";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-richblack-800 flex justify-evenly gap-2 text-pure-greys-300 py-10">
      <div className="text-center">Developer: Uday Biswas</div>
      <div className="text-center">Copyrights reserved @Social Bee</div>
              <div className="flex gap-3 justify-center mb-3 text-lg">
                <a href="#" rel="noopener noreferrer" target="_blank">
                  <FaInstagram />
                </a>
                <a
                  href="https://www.linkedin.com/in/udaybiswas944"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {" "}
                  <FaLinkedin />
                </a>
                <a
                  href="https://github.com/uday-biswas"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {" "}
                  <FaGithub />
                </a>
              </div>
        </div>
  );
};

export default Footer;
