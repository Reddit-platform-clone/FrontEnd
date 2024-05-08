import React, { useState } from "react";
import styles from "./ForgotUsername.module.css";
import SignUpOne from "../SignUp/SignUpOne";
import LogIn from "./LogIn.js";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";




function ForgotUsername() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showBackButton, setBackButton] = useState(false);
  const [showModal, setShowModal] = useState(true); // State for modal visibility

  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleBackButtonClick = () => {
    setBackButton(true);
  };

  const handleEmailMeClick = async () => {
    const email = document.getElementById(styles["forget-username-email"]).value;
  
    try {
      const response = await fetch('http://localhost:5000/api/login/forget_username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
  
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error("Email is not registered");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while processing your request.');
    }
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

  return (
    <>
      {showModal && (
        <div className={styles["forget-username-overlay"]}>
          <div className={styles["forget-username-modal"]}>
            <div className={styles["forget-username-content"]}>
              <button
                className={styles["forget-username-back-btn"]}
                onClick={handleBackButtonClick}
              >
                {" "}
                <FaArrowLeft />{" "}
              </button>
              <button className={styles["forget-username-close-btn"]} onClick={handleCloseModal}>
                {" "}
                <IoMdClose />{" "}
              </button>

              <h2>Recover your username</h2>
              <p>
                Tell us the email address associated with your Reddit account, and
                we’ll send you an email with your username.
              </p>

              <div className={styles["forget-username-input-group"]}>
                <label htmlFor="email"></label>
                <input
                  id={styles["forget-username-email"]}
                  type="text"
                  placeholder="Email*"
                  required
                />

                <br></br>

                <div className={styles["forget-username-forgot-text"]}>
                  <p>
                    Don't have an email or need assistance logging in?{" "}
                    <a href="#" className={styles["forget-username-get-help"]}>
                      Get help
                    </a>
                  </p>
                </div>

                <div className={styles["forget-username-new-text"]}>
                  <p>
                    <a
                      href="#"
                      className={styles["forget-username-signup-text"]}
                      onClick={handleSignUpClick}
                    >
                      Sign Up
                    </a>{" "}
                    .{" "}
                    <a
                      href="#"
                      className={styles["forget-username-login-text"]}
                      onClick={handleLoginClick}
                    >
                      Login
                    </a>
                  </p>
                </div>

                <button
                  className={styles["forget-username-btn-final"]}
                  onClick={handleEmailMeClick}
                >
                  Email Me
                </button>
              </div>

              {/* Toast notification container */}
              <ToastContainer />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ForgotUsername;
