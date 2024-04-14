import React, { useState, useEffect } from 'react';
import './messagespage.css'; // Import your CSS file for styling
//import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import logo_2d from './logo_2d.png'
// import comboBoxIcon from './comboBoxIcon.svg'; // Import the icon for the button
import NavBar from '../HomePage/Components/NavBar/NavBar.js'
import ReCAPTCHA from 'react-google-recaptcha';
import Footer from './components/footer/footer.js'
import Chats from './components/chats.js'
function MessagesPage() {


  return (

   <div className='app-container1'> 
   <div className='navbar_jo'>  <NavBar/></div>
  
    <Chats/>
                
    <div className='footer'>
  <Footer/>
  </div>
   </div>

);
}

export default MessagesPage;