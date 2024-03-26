import React from 'react';
import './NavBar.css';
import logo from "./pngwing.com.png"
import './bootstrap.min.css';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import {  Link } from "react-router-dom";



function NavBar() {
  return (
      
    
      
    <div className='container-fluid'>
      <div className="navbar sticky-top">
        <Link to='/' className="left textStyle">
          {/* <div className="hamburger-menu" data-title="Open navigation">&#9776;</div> */}
          <img src={logo} className="img" alt="Logo" />
          <a className="logo" >Sarakel</a>
        </Link>

        
        <div className="center">
  <label htmlFor="search" className="search-label" data-title="Search Sarakel"></label>
  <div className="search-icon-container">
    <IoSearchOutline id="search-icon" />
  </div>
  <input type="text" id="search" placeholder="search sarakel" className="search" />
</div>

        <div className="right">

        <button className="button notification-button" data-title="Open inbox">
          <IoIosNotificationsOutline />
        </button>

        <button className="button chat-button" data-title="Open chat">
          <IoChatbubbleEllipsesOutline />
        </button>

        <button className="button create-button" data-title="Create post">
          <FaPlus />
          <span>Create</span>
        </button>  

        <div className='dropdown'>
          <button className='dropbtn user-button'><span><img className='userImage' src='	https://www.redditstatic.com/avatars/defaults/v2/avatar_default_5.png'></img></span></button>
          <div className='dropdownContent'>
              <a >User profile</a>
              <Link to='/settings'>User Settings</Link>
          </div>
        </div>


        
        </div>
      </div>
      <hr className="m-0" />
    </div>
    
  );
}

export default NavBar;