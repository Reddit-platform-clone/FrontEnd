import React, { useState } from 'react';
import './SignUpOne.css';
import { IoMdClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUpTwo from './SignUpTwo.js';
import jsonData from '../mock.json';
import GoogleLogin from "react-google-login";
import LogIn from '../LogIn2/LogIn.js';

const ClientID = "1098296945879-b02a0lauc8d73hld7t59oji2bgi7vtga.apps.googleusercontent.com";

function SignUpOne() {
  const [showSignUpTwo, setShowSignUpTwo] = useState(false);
  const [email, setEmail] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleContinueButtonClick = () => {
    // Check if email is empty or not in a valid format
    if (!email || !validateEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    // Check if the entered email exists in the users section of the JSON data
    const userExists = jsonData.users.some(user => user.email === email);

    if (userExists) {
      toast.error("Email already exists");
    } else {
      setShowSignUpTwo(true);
    }
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLoginClick = () => {
    setRedirectToLogin(true);
  };

  // If redirectToLogin is true, render the LogIn component
  if (redirectToLogin) {
    return <LogIn />;
  }

  // If showSignUpTwo is true, render SignUpTwo component
  if (showSignUpTwo) {
    return <SignUpTwo />;
  }

  // Otherwise, render SignUpOne component
  return (
    <div className="signup-overlay">
      <div className="signup-modal">
        <ToastContainer />
        <div className='signup-content'>
          <button className='signup-close-btn'> <IoMdClose /> </button>
          <h2>Sign Up</h2>
          <p>By continuing, you agree to our <a href="#" className="login-user-agremnt">User Agreement</a> and acknowledge that you understand the <a href="#" className='login-privcy-plcy'>Privacy Policy</a>.</p>
          {/* <button className='signup-google'><FcGoogle />Continue with Google</button> */}
          <GoogleLogin clientId={ClientID} buttonText='Continue with google' cookiePolicy='single_host_origin' className='signup-google' />
          <br></br>
          {/* <button className='signup-apple'><FaApple />Continue with Apple</button> */}
          <div className="signup-divider">
            <span className="signup-divider-line"></span>
            <span className="signup-divider-text">OR</span>
            <span className="signup-divider-line"></span>
          </div>
          <div className="signup-input-group">
            <label htmlFor="Email"></label>
            <input
              id="signup-email"
              type="email"
              placeholder="Email*"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br></br>
            <div className='signup-login-text'>
              <p>Already a redditor? <a href="#" className='login-forgot-username' onClick={handleLoginClick}>Log In</a></p>
            </div>
            <button className='signup-cntnu-btn' onClick={handleContinueButtonClick}>Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpOne;
