import React, { } from 'react';
import './NavBar.css';
import logo from "./pngwing.com.png"
import './bootstrap.min.css'
function NavBar() {
  return (
    <div className='container-fluid'>
    <div className="navbar sticky-top">
      <div className="left">
          <img src={logo} className="img" />
        <a href="#" className="logo">Sarakel</a>
      </div>
      <div className="center">
        <input type="text" placeholder="Search..."  className="search" />
      </div>
      
      <div className="right">
      <a href="#" className="login">Login</a>
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
