import React, { useState } from 'react';
import './NavBarUnlogged.css';
import logo from "./pngwing.com.png";
import './bootstrap.min.css';
import { IoSearchOutline } from "react-icons/io5";
import LogIn from "../LogIn/LogIn";


function NavBarUnlogged() {
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = () => {
    setShowLogin(!showLogin);
  };

  const handleCloseModal = () => {
    setShowLogin(false);
  };

  const handleSuccessfulLogin = () => {
    setShowLogin(false); // Close the modal after successful login
  };

  return (
    <div className='container-fluid'>
      <div className="navbar sticky-top">
        <div className="left">
          <img src={logo} className="img" alt="Logo" />
          <a href="#" className="logo" >Sarakel</a>
        </div>

        <div className="center">
          <label htmlFor="search" className="search-label" data-title="Search Sarakel"></label>
          <div className="search-icon-container">
            <IoSearchOutline id="search-icon" />
          </div>
          <input type="text" id="search" placeholder="search sarakel" className="search" />
        </div>

        <div className="right">
          <button className='right-login-btn' onClick={handleLogin}>Login</button>

          <div className="dropdown">
            <button className="dropbtn">&#8226;&#8226;&#8226;</button>
            <div className='dropdown-content'>
              <a href="#">Option 1</a>
              <a href="#">Option 2</a>
              <a href="#">Option 3</a>
            </div>
          </div>
        </div>
      </div>
      <hr className="m-0" />

      {/* Render login modal if showLogin is true */}
      {showLogin && <LogIn onSuccessfulLogin={handleSuccessfulLogin} onCloseModal={handleCloseModal} />}
    </div>
  );
}

export default NavBarUnlogged;
