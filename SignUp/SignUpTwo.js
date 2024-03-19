import React from 'react';
import './SignUpTwo.css';
import { FaArrowLeft } from "react-icons/fa6";
import ReCAPTCHA from "react-google-recaptcha";
import SignUpOne from "./SignUpOne.js";

function SignUpOne() {
  const onChange = () =>{};
  return (
    <div className="signuptwo-overlay">
      <div className="signuptwo-modal">
        <div className='signuptwo-content'>

        <button className='signuptwo-back-btn'> <FaArrowLeft /> </button>

        <h2>Create your username and password</h2>
        <p>Reddit is anonymous, so your username is what you’ll go by here. Choose wisely—because once you get a name, you can’t change it.</p>
        
          <div className="signuptwo-input-group">
          <label htmlFor="username"></label>
            <input id="signuptwo-username" type="text" placeholder="Username*" required />
          
            <label htmlFor="password"></label>
            <input id="signuptwo-password" type="password" placeholder="Password*" required />            

            <br></br>
            <ReCAPTCHA sitekey="6LfKJ54pAAAAAKOVJdj7SYP5-xuXU8-YNqAQ0E2t" onChange={onChange} className='signuptwo-recaptcha'/>

            <button className='signuptwo-cntnu-btn'>Continue</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SignUpOne;