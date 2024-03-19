import React from 'react';
import './SignUpOne.css';
import { IoMdClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";



function SignUpOne() {
  return (
    <div className="signup-overlay">
      <div className="signup-modal">
        <div className='signup-content'>
        <button className='signup-close-btn'> <IoMdClose /> </button>

        <h2>Sign Up</h2>
        <p>By continuing, you agree to our <a href="#" className="login-user-agremnt">User Agreement</a> and acknowledge that you understand the <a href="#" className='login-privcy-plcy'>Privacy Policy</a>.</p>
        
        <button className='signup-google'><FcGoogle />Continue with google</button>
        <br></br>
        <button className='signup-apple'><FaApple />Continue with Apple</button>

        <div className="signup-divider">
            <span className="signup-divider-line"></span>
            <span className="signup-divider-text">OR</span>
            <span className="signup-divider-line"></span>
          </div>

          <div className="signup-input-group">
            <label htmlFor="Email"></label>
            <input id="signup-email" type="email" placeholder="Email*" required />
          
            <br></br>

            <div className='signup-login-text'>
            <p>Already a redditor? <a href="#" className='login-forgot-username'>Log In</a>
            </p>
            </div>

            <button className='signup-cntnu-btn'>Continue</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SignUpOne;