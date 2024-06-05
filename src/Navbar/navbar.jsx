import React, { useState } from "react";
import "./navbar.css";
import {
  FaBars,
  FaChalkboardTeacher,
  FaRegFileAlt,
  FaVideo,
  FaQuestionCircle,
  FaUser,
  FaHome,
} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`navbar-container ${isOpen ? "open" : "closed"}`}>
      <div className="navbar">
        <div className="navbar-header">
          <img src="\Navbar Assets\school logo.png" alt="School Logo" />
          <h2 className="school-name">Chaudhary Chhotu Ram Public School</h2>
        </div>
        <div className="navbar-content">
          <div className="navbar-mid">
            <ul>
              <li onClick={toggleNavbar} id="collapseListItem">
                <FaBars className="icon" />
                <span className="text ">Collapse</span>
              </li>
              <li>
                <FaHome className="icon" />
                <span className="text">Dashboard</span>
              </li>
              <li className="active">
                <FaChalkboardTeacher className="icon" />
                <span className="text">Teach</span>
              </li>
              <li>
                <FaRegFileAlt className="icon" />
                <span className="text">Test</span>
              </li>
              <li>
                <FaChalkboardTeacher className="icon" />
                <span className="text">Take Class</span>
              </li>
              <li>
                <FaVideo className="icon" />
                <span className="text">Video Library</span>
              </li>
              <li>
                <FaQuestionCircle className="icon" />
                <span className="text">Doubts</span>
              </li>
            </ul>
          </div>
          <div className="navbar-footer">
            <FaUser className="icon" />
            <span className="text">Mujtaba Ali Khan</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
