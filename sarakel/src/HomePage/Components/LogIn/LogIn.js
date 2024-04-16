import React, { useState , useEffect } from "react";
import "./LogIn.css";
import { IoMdClose } from "react-icons/io";
import SignUpOne from "../SignUp/SignUpOne";
import ForgotUsername from "./ForgotUsername";
import ForgotPassword from "./ForgotPassword";
import  {useAuth}  from "../../AuthContext";
import { ToastContainer, toast } from "react-toastify";
import GoogleLogin from "react-google-login";
import { setJWT } from "../../token";
import "react-toastify/dist/ReactToastify.css";

const ClientID = "1098296945879-b02a0lauc8d73hld7t59oji2bgi7vtga.apps.googleusercontent.com";

function LogIn({ onSuccessfulLogin }) {
  const [redirectToSignUp, setRedirectToSignUp] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const { setToken } = useAuth();

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
    const emailOrUsername = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        body: JSON.stringify({ emailOrUsername, password }), // Ensure both fields are included
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        toast.success("Login successful!");
        console.log(data.token);
        console.log("before setting token");

          setToken(data.token);
          setJWT(data.token)
          console.log("after setting token")
        // Call onSuccessfulLogin function passed from parent component
        onSuccessfulLogin();
      } else {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        toast.error('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while logging in. Please try again later.');
    }
  };
  
  // Function to handle closing the login modal
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
    <div className="login-overlay">
      <div className="login-modal">
        <div className="login-content">
          <button className="login-close-btn" onClick={handleCloseModal}>
            {" "}
            <IoMdClose />{" "}
          </button>

          <h2>Log In</h2>
          <p>
            By continuing, you agree to our{" "}
            <a href="#" className="login-user-agremnt">
              User Agreement
            </a>{" "}
            and acknowledge that you understand the{" "}
            <a href="#" className="login-privcy-plcy">
              Privacy Policy
            </a>
            .
          </p>

          {/* Google login button */}
          <GoogleLogin
            clientId={ClientID}
            buttonText="Continue with Google"
            cookiePolicy="single_host_origin"
            className="login-google-oauth"
          />

          {/* Divider */}
          <div className="login-divider">
            <div className="login-divider-line"></div>
            <div className="login-divider-text">OR</div>
            <div className="login-divider-line"></div>
          </div>

          {/* Username and password inputs */}
          <div className="input-group">
            <label htmlFor="username"></label>
            <input id="username" type="text" placeholder="Username or Email*" required />

            <label htmlFor="password"></label>
            <input id="password" type="password" placeholder="Password*" required />
          </div>

          {/* Forgot username and password links */}
          <div className="login-forgot-text">
            <p>
              Forgot your{" "}
              <a href="#" className="login-forgot-username" onClick={handleUsernameClick}>
                username
              </a>{" "}
              or{" "}
              <a href="#" className="login-forgot-password" onClick={handlePasswordClick}>
                password
              </a>
              ?
            </p>
          </div>

          {/* New to Sarakel? Sign up link */}
          <div className="login-new-text">
            <p>
              New to Sarakel?{" "}
              <a href="#" className="login-signup-text" onClick={handleSignUpClick}>
                Sign Up
              </a>
            </p>
          </div>

          {/* Login button */}
          <button className="login-btn-final" onClick={handleLogin}>
            Log In
          </button>

          {/* Toast notification container */}
          <ToastContainer />
        </div>
      </div>
    </div>
  ) : null;
}

export default LogIn;
