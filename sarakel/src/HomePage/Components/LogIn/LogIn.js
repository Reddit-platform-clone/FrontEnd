import React, { useState, useEffect } from "react";
import styles from "./LogIn.module.css";
import { IoMdClose } from "react-icons/io";
import SignUpOne from "../SignUp/SignUpOne";
import ForgotUsername from "./ForgotUsername";
import ForgotPassword from "./ForgotPassword";
import { useAuth } from "../AuthContext";
import { ToastContainer, toast } from "react-toastify";

function LogIn({ onSuccessfulLogin }) {
  const [redirectToSignUp, setRedirectToSignUp] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const { setToken } = useAuth();

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token : "+response.credential )
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({ 
      client_id: '579900774553-gv8jas84grhmnqfqq6k0otb7tod7f8nq.apps.googleusercontent.com',
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
  )
  }, []);
  const handleSignUpClick = () => {
    setRedirectToSignUp(true);
  };

  const handleUsernameClick = () => {
    setShowUsername(true);
  };

  const handlePasswordClick = () => {
    setShowPassword(true);
  };

  const onSuccess = (res) => {
    console.log("login success! current user:", res.profileObj);
  };

  const onFailure = (res) => {
    console.log("login failed! res:", res);
  };

  const handleLogin = async () => {
    const emailOrUsername = document.getElementById(styles.username).value;
    const password = document.getElementById(styles.password).value;

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        body: JSON.stringify({ emailOrUsername, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Login successful!");
        console.log(data.token);
    
        // Save token in sessionStorage
        sessionStorage.setItem('token', data.token);
    
        setToken(data.token);
        onSuccessfulLogin();
      } else {
        const errorText = await response.text();
        console.error("Server error:", errorText);
        toast.error("Invalid username or password.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "An error occurred while logging in. Please try again later."
      );
    }
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  if (redirectToSignUp) {
    return <SignUpOne />;
  }

  if (showUsername) {
    return <ForgotUsername />;
  }

  if (showPassword) {
    return <ForgotPassword />;
  }

  return showLoginModal ? (
    <div className={styles["login-overlay"]}>
      <div className={styles["login-modal"]}>
        <div className={styles["login-content"]}>
          <button
            className={styles["login-close-btn"]}
            onClick={handleCloseModal}
          >
            {" "}
            <IoMdClose />{" "}
          </button>

          <h2>Log In</h2>
          <p>
            By continuing, you agree to our{" "}
            <a href="#" className={styles["login-user-agreement"]}>
              User Agreement
            </a>{" "}
            and acknowledge that you understand the{" "}
            <a href="#" className={styles["login-privacy-policy"]}>
              Privacy Policy
            </a>
            .
          </p>

          {/* <GoogleOAuthProvider
            className={styles["login-google-oauth"]}
            clientId={ClientID}
          >
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider> */}
          <div id="signInDiv" className={styles["notyet"]}>

          </div>

          <div className={styles["login-divider"]}>
            <div className={styles["login-divider-line"]}></div>
            <div className={styles["login-divider-text"]}>OR</div>
            <div className={styles["login-divider-line"]}></div>
          </div>

          <div className={styles["input-group"]}>
            <label htmlFor="username"></label>
            <input
              id={styles["username"]}
              type="text"
              placeholder="Username or Email*"
              required
            />

            <label htmlFor="password"></label>
            <input
              id={styles["password"]}
              type="password"
              placeholder="Password*"
              required
            />
          </div>

          <div className={styles["login-forgot-text"]}>
            <p>
              Forgot your{" "}
              <a
                href="#"
                className={styles["login-forgot-username"]}
                onClick={handleUsernameClick}
              >
                username
              </a>{" "}
              or{" "}
              <a
                href="#"
                className={styles["login-forgot-password"]}
                onClick={handlePasswordClick}
              >
                password
              </a>
              ?
            </p>
          </div>

          <div className={styles["login-new-text"]}>
            <p>
              New to Sarakel?{" "}
              <a
                href="#"
                className={styles["login-signup-text"]}
                onClick={handleSignUpClick}
              >
                Sign Up
              </a>
            </p>
          </div>

          <button className={styles["login-btn-final"]} onClick={handleLogin}>
            Log In
          </button>

          <ToastContainer />
        </div>
      </div>
    </div>
  ) : null;
}

export default LogIn;
