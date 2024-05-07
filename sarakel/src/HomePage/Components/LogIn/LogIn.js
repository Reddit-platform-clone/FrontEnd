import React, { useState, useEffect } from "react";
import styles from "./LogIn.module.css";
import { IoMdClose } from "react-icons/io";
import SignUpOne from "../SignUp/SignUpOne";
import ForgotUsername from "./ForgotUsername";
import ForgotPassword from "./ForgotPassword";
import { useAuth } from "../AuthContext";
import { ToastContainer, toast } from "react-toastify";
// import { signInWithGoogle } from "./firebase";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function LogIn({ onSuccessfulLogin }) {
  const [redirectToSignUp, setRedirectToSignUp] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const { setToken } = useAuth();
  const firebaseConfig = {
    apiKey: "AIzaSyANfoLDGZsVAl8NwHJUlgLrUynJJMaSsg0",
    authDomain: "auth-8b1ef.firebaseapp.com",
    projectId: "auth-8b1ef",
    storageBucket: "auth-8b1ef.appspot.com",
    messagingSenderId: "445273762769",
    appId: "1:445273762769:web:81f403cae7cb5fe3760ef0",
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    // Sign in with Google popup
    const result = await signInWithPopup(auth, provider);
    console.log(result)
    // Extract token from result
    const token = result._tokenResponse.oauthAccessToken;
    // Send token to the specified endpoint
    const response = await fetch("http://127.0.0.1:5000/api/verifyToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      // Log the response if successful
      const responseData = await response.json();
      console.log("Response from server:", responseData);
      
      // Access the token sent back from the server
      const serverToken = responseData.token;
      // Now you can use `serverToken` as needed in your application
      console.log("Token from server:", serverToken);
      sessionStorage.setItem('token', serverToken);
      setToken(serverToken);

      
    } else {
      // Handle error response
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error:", error);
  }
};

  const handleSignUpClick = () => {
    setRedirectToSignUp(true);
  };

  const handleUsernameClick = () => {
    setShowUsername(true);
  };

  const handlePasswordClick = () => {
    setShowPassword(true);
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
        sessionStorage.setItem("username",emailOrUsername)
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

  const handleGoogleSignIn = async () => {
  await signInWithGoogle();
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

          <button className={styles["login-with-google-btn"]} onClick={handleGoogleSignIn}>Log in with google</button>
          
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
