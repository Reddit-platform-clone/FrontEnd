import React, { useState, useEffect } from 'react';
import './messagespage.css'; // Import your CSS file for styling
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import logo_2d from './logo_2d.png'
// import comboBoxIcon from './comboBoxIcon.svg'; // Import the icon for the button
import NavBar from '../HomePage/Components/NavBar/NavBar.js'
import Footer from './components/footer/footer.js'
import Chats from './components/chats.js'
function Messagespage() {
 
 // BrowserRouter
// function onChange(value) {
//     // Handle the value of the captcha here
//     console.log("Captcha value:", value);
// }
  
  
  // useEffect(() => {
  //   // Fetch chat messages from Reddit's API
  //   fetchRedditChat();
  // }, []);

  // const fetchRedditChat = () => {
  //   // Perform API request to fetch Reddit chat data
  //   // Example using fetch API
  //   fetch('https://api.reddit.com/chat/messages', {
  //     headers: {
  //       // Include any necessary headers for authentication
  //       // Authorization: 'Bearer your_access_token'
  //     }
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     // Process fetched messages
  //     setMessages(data.messages);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching Reddit chat:', error);
  //   });
  // };

  // const handleApply = () => {
  //   // Do something with the selected checkboxes
  //   console.log('Checkbox 1:', checkbox1);
  //   console.log('Checkbox 2:', checkbox2);
  //   console.log('Checkbox 3:', checkbox3);
  //   // Close the pop-up window
  //   setShowPopup(false);
  // };

// const onChange = (value) => {
//     // Here you would handle the verification of the reCAPTCHA value
//     console.log("Captcha value:", value);
// }
// const [toggleState, setToggleState] = useState(1);
// const [toggleState2, setToggleState2] = useState(1);
// const toggleTab = (index) => {
//   setToggleState(index);

//  }

//  const toggleTab2 = (index2) => {
//   setToggleState2(index2);

//  }

  return (

   <div className='app-container1'> 
   <div className='navbar_jo'> 
    <NavBar/>
   </div>
  
    <Chats/>
                
   <div className='footer'>
    <Footer/>
   </div>
   </div>

);
}

export default Messagespage;