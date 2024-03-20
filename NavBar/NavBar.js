import React from 'react';
import './NavBar.css';
import logo from "./pngwing.com.png"
import './bootstrap.min.css';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { TbCirclesRelation } from "react-icons/tb";




function NavBar() {
  return (
    <nav>
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

        <button className="button user-button" data-title="Open profile menu"> 
          <TbCirclesRelation />
        </button>


        
        </div>
      </div>
      <hr className="m-0" />
    </div>
    </nav>
  );
}

export default NavBar;