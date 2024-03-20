import React, { useState } from 'react';
import './ForgotPassword.css';
import SignUpOne from '../SignUp/SignUpOne';
import LogIn from './LogIn.js'; 
import ForgotUsername from './ForgotUsername.js';
import { FaArrowLeft } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";


function ForgotPassword() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showUsername, setUsername] = useState(false);

  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleUseranmeClick = () =>{
    setUsername(true);
  };

  const handleBackButtonClick = () => {
    setShowSignUp(false);
    setShowLogin(false);
    setUsername(false);
  };

  if (showSignUp) {
    return <SignUpOne />;
  }

  if (showLogin) {
    return <LogIn />;
  }

  if(showUsername){
    return <ForgotUsername />;
  }

  return (
    <div className="forget-password-overlay">
      <div className="forget-password-modal">
        <div className='forget-password-content'>
          <button className='forget-password-back-btn' onClick={handleBackButtonClick}> <FaArrowLeft /> </button>
          <button className='forget-password-close-btn'> <IoMdClose /> </button>

          <h2>Reset your password</h2>
          <p>Tell us the username and email address associated with your Reddit account, and we’ll send you an email with a link to reset your password.</p>

          <div className="forget-password-input-group">
            <label htmlFor="username"></label>
            <input id="forget-password-email" type="text" placeholder="Username*" required />

            <label htmlFor="email"></label>
            <input id="forget-password-email" type="text" placeholder="Email*" required />
          
            <br></br>

            <div className='forget-password-forgot-text'>
              <p>Don't have an email or need assistance logging in? <a href="#" className="forget-password-get-help">Get help</a></p>
            </div>

            <div className='forget-password-forgot-text'>
              <p>Forgot your <a href="#" className="forget-password-username" onClick={handleUseranmeClick}>username</a> ?</p>
            </div>

            <div className='forget-password-new-text'>
              <p><a href="#" className="forget-password-signup-text" onClick={handleSignUpClick}>Sign Up</a> . <a href="#" className="forget-password-login-text" onClick={handleLoginClick}>Login</a></p>
            </div>

            <button className='forget-password-btn-final'>Reset passsword</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
