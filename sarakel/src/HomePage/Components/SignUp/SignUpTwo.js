import React, { useState } from 'react';
import './SignUpTwo.css';
import SignUpOne from "./SignUpOne.js";
import { FaArrowLeft } from "react-icons/fa6";
import ReCAPTCHA from "react-google-recaptcha";
import jsonData from "../mock.json"; 
import { ToastContainer, toast } from "react-toastify";

function SignUpTwo() {
  const [showSignUpOne, setShowSignUpOne] = useState(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(true);

  const handleContinueClick = () => {
    if (!recaptchaVerified) {
      toast.error("Please verify that you're not a robot.");
      return;
    }
    
    const username = document.getElementById("signuptwo-username").value;
    const user = jsonData.users.find(user => user.name === username);

    if (user) {
      toast.error("Username already exists!");
    } else {
      toast.success("Account created!");
      handleCloseModal();
    }
  };

  const handleBackButtonClick = () => {
    // Set the state to show the SignUpOne component
    setShowSignUpOne(true);
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaVerified(!!value);
  };

  const handleCloseModal = () => {
    setShowSignUpModal(false);
  };
  // If showSignUpOne is true, render SignUpOne component
  if (showSignUpOne) {
    return <SignUpOne />;
  }

  // Otherwise, render SignUpTwo component
  return showSignUpModal ? (
    <div className="signuptwo-overlay">
      <div className="signuptwo-modal">
        <div className='signuptwo-content'>
          <button className='signuptwo-back-btn' onClick={handleBackButtonClick}> <FaArrowLeft /> </button>
          <h2>Create your username and password</h2>
          <p>Sarakel is anonymous, so your username is what you’ll go by here. Choose wisely—because once you get a name, you can’t change it.</p>
        
          <div className="signuptwo-input-group">
            <label htmlFor="username"></label>
            <input id="signuptwo-username" type="text" placeholder="Username*" required />
          
            <label htmlFor="password"></label>
            <input id="signuptwo-password" type="password" placeholder="Password*" required />            

            <br></br>
            <ReCAPTCHA sitekey="6LfKJ54pAAAAAKOVJdj7SYP5-xuXU8-YNqAQ0E2t" onChange={handleRecaptchaChange} className='signuptwo-recaptcha'/>

            <button className='signuptwo-cntnu-btn' onClick={handleContinueClick}>Continue</button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  ): null;
}

export default SignUpTwo;





