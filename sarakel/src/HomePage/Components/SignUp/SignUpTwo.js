import React, { useState } from "react";
import "./SignUpTwo.css";
import SignUpOne from "./SignUpOne.js";
import { useAuth } from "../AuthContext";
import { FaArrowLeft } from "react-icons/fa6";
// import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";

function SignUpTwo({ email }) {
  const [showSignUpOne, setShowSignUpOne] = useState(false);
  // const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(true);
  //const { setToken } = useAuth();
 
  const handleContinueClick = async () => {
    // if (!recaptchaVerified) {
    //   toast.error("Please verify that you're not a robot.");
    //   return;
    // }

    const usernameInput = document.getElementById("signuptwo-username");
    const passwordInput = document.getElementById("signuptwo-password");

    if (!usernameInput || !passwordInput) {
      toast.error("Username or password is missing.");
      return;
    }

    const username = usernameInput.value.trim(); // Trim whitespace
    const password = passwordInput.value.trim();

    if (!username || !password) {
      toast.error("Username and password cannot be empty.");
      return;
    }

    try {
      // Check if the username is available
      const availabilityResponse = await fetch(`http://localhost:5000/api/username_available/${username}`);
      const availabilityData = await availabilityResponse.json();
      
      // if (!availabilityResponse.ok) {
      //   toast.error("An error occurred while checking username availability");
      //   return;
      // }
      console.log(availabilityData)

      if (availabilityData.message === 'Username is not available') {
        toast.error("Username is not available.");
        return;
      }

      // Proceed with signup if the username is available
      const signupResponse = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });
      const signupData = await signupResponse.json();
      
      if (signupResponse.ok) {
        toast.success("Account created!");
        console.log("Token:", signupData.token);
        //setToken(signupData.token);
        handleCloseModal();
      } else {
        toast.error(signupData.error);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while signing up");
    }
  };
  

  const handleBackButtonClick = () => {
    setShowSignUpOne(true);
  };

  // const handleRecaptchaChange = (value) => {
  //   setRecaptchaVerified(!!value);
  // };

  const handleCloseModal = () => {
    setShowSignUpModal(false);
  };

  if (showSignUpOne) {
    return <SignUpOne />;
  }

  return showSignUpModal ? (
    <div className="signuptwo-overlay">
      <div className="signuptwo-modal">
        <div className="signuptwo-content">
          <button
            className="signuptwo-back-btn"
            onClick={handleBackButtonClick}
          >
            {" "}
            <FaArrowLeft />{" "}
          </button>
          <h2>Create your username and password</h2>
          <p>
            Sarakel is anonymous, so your username is what you’ll go by here.
            Choose wisely—because once you get a name, you can’t change it.
          </p>

          <div className="signuptwo-input-group">
            <label htmlFor="username"></label>
            <input
              id="signuptwo-username"
              type="text"
              placeholder="Username*"
              required
            />

            <label htmlFor="password"></label>
            <input
              id="signuptwo-password"
              type="password"
              placeholder="Password*"
              required
            />

            <br></br>
            {/* <ReCAPTCHA
              sitekey="6LfKJ54pAAAAAKOVJdj7SYP5-xuXU8-YNqAQ0E2t"
              onChange={handleRecaptchaChange}
              className="signuptwo-recaptcha"
            /> */}

            <button
              className="signuptwo-cntnu-btn"
              onClick={handleContinueClick}
            >
              Continue
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default SignUpTwo;
