import React, { useState } from "react";
import "./LogIn.css";
import { IoMdClose } from "react-icons/io";
import SignUpOne from "../SignUp/SignUpOne";
import ForgotUsername from "./ForgotUsername";
import ForgotPassword from "./ForgotPassword";
import jsonData from "../mock.json";
import { ToastContainer, toast } from "react-toastify";
import GoogleLogin from "react-google-login";
import "react-toastify/dist/ReactToastify.css";

const ClientID = "1098296945879-b02a0lauc8d73hld7t59oji2bgi7vtga.apps.googleusercontent.com";

function LogIn() {
  const [redirectToSignUp, setRedirectToSignUp] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUpClick = () => {
    setRedirectToSignUp(true);
  };

  const handleUsernameClick = () => {
    setShowUsername(true);
  };

  const handlePasswordClick = () => {
    setShowPassword(true);
  };

  const handleLogin = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = jsonData.users.find(user => user.email === username && user.pass === password);

    if (user) {
      toast.success("Login successful!");
    } else {
      toast.error("Invalid username or password.");
    }
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

  return (
    <div className="login-overlay">
      <div className="login-modal">
        <div className="login-content">
          <button className="login-close-btn">
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
            <input id="username" type="text" placeholder="Username*" required />

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
  );
}

export default LogIn;
