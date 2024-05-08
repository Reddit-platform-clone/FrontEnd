import React, { useState } from "react";
import styles from "./SignUpTwo.module.css";
import SignUpOne from "./SignUpOne.js";
import { FaArrowLeft } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../AuthContext.js";

function SignUpTwo({ email }) {
  const [showSignUpOne, setShowSignUpOne] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(true);
  const {setToken} = useAuth();

  const handleContinueClick = async () => {
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
      const availabilityResponse = await fetch(
        `http://57.151.116.81:5000/api/username_available/${username}`
      );
      const availabilityData = await availabilityResponse.json();

      if (availabilityData.message === "Username is not available") {
        toast.error("Username is not available.");
        return;
      }

      // Proceed with signup if the username is available
      const signupResponse = await fetch("http://57.151.116.81:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });
      const signupData = await signupResponse.json();
      console.log(signupData)
      console.log("sign up token : ",signupData.token)
      if (signupResponse.ok) {
        toast.success("Account created!");

        // Save token in sessionStorage
        sessionStorage.setItem("token", signupData.token);
        sessionStorage.setItem("username",username)
        setToken(signupData.token)
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

  const handleCloseModal = () => {
    setShowSignUpModal(false);
  };

  if (showSignUpOne) {
    return <SignUpOne />;
  }

  return showSignUpModal ? (
    <div className={styles["signuptwo-overlay"]}>
      <div className={styles["signuptwo-modal"]}>
        <div className={styles["signuptwo-content"]}>
          <button
            className={styles["signuptwo-back-btn"]}
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

          <div className={styles["signuptwo-input-group"]}>
            <label htmlFor="username"></label>
            <input
              id="signuptwo-username"
              className={styles["signuptwo-username"]}
              type="text"
              placeholder="Username*"
              required
            />

            <label htmlFor="password"></label>
            <input
              id="signuptwo-password"
              className={styles["signuptwo-password"]}
              type="password"
              placeholder="Password*"
              required
            />

            <br></br>

            <button
              className={styles["signuptwo-cntnu-btn"]}
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