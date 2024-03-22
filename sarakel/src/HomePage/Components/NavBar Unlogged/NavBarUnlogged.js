import React, { useState } from 'react';
import './NavBarUnlogged.css';
import logo from "./pngwing.com.png"
import './bootstrap.min.css'
import { IoSearchOutline } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import LogIn from "../LogIn2/LogIn.js"



function NavBar() {
  const[ShowLogin,setLogin]=useState(false);

  const handleLogin = () =>{
    setLogin(true);
  }

  if(ShowLogin){
    return <LogIn />
  }


  return (
    <div className='container-fluid'>
    <div className="navbar sticky-top">
    <div className="left">
          {/* <div className="hamburger-menu" data-title="Open navigation">&#9776;</div> */}
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
          <button className="dropbtn" >&#8226;&#8226;&#8226;</button>
          <div className='dropdown-content'>
            <a href="#">Option 1</a>
            <a href="#">Option 2</a>
            <a href="#">Option 3</a>
          </div>
        </div>
      </div>
      
    </div>
    <hr className="m-0" />
    </div>
  );
}

export default NavBar;