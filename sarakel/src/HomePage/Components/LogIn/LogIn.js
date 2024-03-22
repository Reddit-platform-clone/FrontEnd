import React, { useState } from 'react';
import './LogIn.css';
import { IoMdClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import SignUpOne from '../SignUp/SignUpOne';
import ForgotUsername from './ForgotUsername';
import ForgotPassword from './ForgotPassword';

function LogIn() {
  const [redirectToSignUp, setRedirectToSignUp] = useState(false);
  const [ShowUsername, setUsername] = useState(false);
  const [showPassword,setPassword] = useState(false);

  const handleSignUpClick = () => {
    setRedirectToSignUp(true);
  };

  const handleUsernameClick = () =>{
    setUsername(true);
  }

  const handlePasswordClick = () =>{
    setPassword(true);
  }

  if (redirectToSignUp) {
    return <SignUpOne />;
  }

  if(ShowUsername){
    return <ForgotUsername />;
  }

  if(showPassword){
    return <ForgotPassword />
  }

  return (
    <div className="login-overlay">
      <div className="login-modal">
        <div className='login-content'>
        <button className='login-close-btn'> <IoMdClose /> </button>

        <h2>Log In</h2>
        <p>By continuing, you agree to our <a href="#" className="login-user-agremnt">User Agreement</a> and acknowledge that you understand the <a href="#" className='login-privcy-plcy'>Privacy Policy</a>.</p>
        
        <button className='login-google'><FcGoogle />Continue with google</button>
        <br></br>
        <button className='login-apple'><FaApple />Continue with Apple</button>

        <div className="login-divider">
            <span className="login-divider-line"></span>
            <span className="login-divider-text">OR</span>
            <span className="login-divider-line"></span>
          </div>

          <div className="input-group">
            <label htmlFor="username"></label>
            <input id="username" type="text" placeholder="Username*" required />
          
            <label htmlFor="password"></label>
            <input id="password" type="password" placeholder="Password*" required />
            <br></br>

            <div className='login-forgot-text'>
            <p>Forgot your <a href="#" className='login-forgot-username' onClick={handleUsernameClick}>username</a> or <a href="#" className="login-forgot-password" onClick={handlePasswordClick}>password</a>
            ?</p>
            </div>

            <div className='login-new-text'>
            <p>New to Sarakel? <a href="#" className="login-signup-text" onClick={handleSignUpClick}>Sign Up</a>
            </p>
            </div>

            <button className='login-btn-final'>Log In</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LogIn;
