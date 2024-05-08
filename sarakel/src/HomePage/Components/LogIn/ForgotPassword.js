import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import SignUpOne from "../SignUp/SignUpOne";
import LogIn from "./LogIn.js";
import ForgotUsername from "./ForgotUsername.js";
import { FaArrowLeft } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";

function ForgotPassword() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showUsername, setUsername] = useState(false);
  const [showBackButton, setBackButton] = useState(false);
  const [showModal, setShowModal] = useState(true); // State for modal visibility

  const handleResetPasswordClick = async () => {
    const username = document.getElementById(styles["forget-password-username"]).value;

    try {
      const response = await fetch('http://localhost:5000/api/login/forget_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emailOrUsername: username })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while processing your request.');
    }
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleUseranmeClick = () => {
    setUsername(true);
  };

  const handleBackButtonClick = () => {
    setBackButton(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (showSignUp) {
    return <SignUpOne />;
  }

  if (showLogin || showBackButton) {
    return <LogIn />;
  }

  if (showUsername) {
    return <ForgotUsername />;
  }

  return (
    <>
      {showModal && (
        <div className={styles["forget-password-overlay"]}>
          <div className={styles["forget-password-modal"]}>
            <div className={styles["forget-password-content"]}>
              <button
                className={styles["forget-password-back-btn"]}
                onClick={handleBackButtonClick}
              >
                {" "}
                <FaArrowLeft />{" "}
              </button>
              <button className={styles["forget-password-close-btn"]} onClick={handleCloseModal}>
                {" "}
                <IoMdClose />{" "}
              </button>

              <h2>Reset your password</h2>
              <p>
                Tell us the username and email address associated with your Reddit
                account, and we’ll send you an email with a link to reset your
                password.
              </p>

              <div className={styles["forget-password-input-group"]}>
                <label htmlFor="username"></label>
                <input
                  id={styles["forget-password-username"]}
                  type="text"
                  placeholder="Username*"
                  required
                />

                {/* <label htmlFor="password"></label>
                <input
                  id="forget-password-pass"
                  type="text"
                  placeholder="Password*"
                  required
                /> */}
              </div>
              <br></br>

              <div className={styles["forget-password-forgot-text"]}>
                <p>
                  Don't have an email or need assistance logging in?{" "}
                  <a href="#" className={styles["forget-password-get-help"]}>
                    Get help
                  </a>
                </p>
              </div>

              <div className={styles["forget-password-forgot-text"]}>
                <p>
                  Forgot your{" "}
                  <a
                    href="#"
                    className={styles["forget-password-username"]}
                    onClick={handleUseranmeClick}
                  >
                    username
                  </a>{" "}
                  ?
                </p>
              </div>

              <div className={styles["forget-password-new-text"]}>
                <p>
                  <a
                    href="#"
                    className={styles["forget-password-signup-text"]}
                    onClick={handleSignUpClick}
                  >
                    Sign Up
                  </a>{" "}
                  .{" "}
                  <a
                    href="#"
                    className={styles["forget-password-login-text"]}
                    onClick={handleLoginClick}
                  >
                    Login
                  </a>
                </p>
              </div>

              <button className={styles["forget-password-btn-final"]} onClick={handleResetPasswordClick}>Reset passsword</button>

              <ToastContainer />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ForgotPassword;
