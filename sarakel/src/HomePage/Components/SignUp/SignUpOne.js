import React, { useState,useEffect } from "react";
import styles from "./SignUpOne.module.css";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUpTwo from "./SignUpTwo.js";
import GoogleLogin from "react-google-login";
import LogIn from "../LogIn/LogIn.js";

const ClientID =
  "1098296945879-b02a0lauc8d73hld7t59oji2bgi7vtga.apps.googleusercontent.com";

function SignUpOne() {
  const [showSignUpTwo, setShowSignUpTwo] = useState(false);
  const [email, setEmail] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [showModal, setShowModal] = useState(true); // State for modal visibility

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

  const handleContinueButtonClick = () => {
    // Check if email is empty or not in a valid format
    if (!email || !validateEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    // Check if the entered email exists in the users section of the JSON data
    //const userExists = jsonData.users.some((user) => user.email === email);

  //   if (userExists) {
  //     toast.error("Email already exists");
  //   } else {
       setShowSignUpTwo(true);
  //   }
   };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLoginClick = () => {
    setRedirectToLogin(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // If redirectToLogin is true, render the LogIn component
  if (redirectToLogin) {
    return <LogIn />;
  }

  // If showSignUpTwo is true, render SignUpTwo component
  if (showSignUpTwo) {
    return <SignUpTwo email={email} />;
  }

  // Otherwise, render SignUpOne component
  return (
    <>
      {showModal && (
        <div className={styles["signup-overlay"]}>
          <div className={styles["signup-modal"]}>
            <ToastContainer />
            <div className={styles["signup-content"]}>
              <button
                className={styles["signup-close-btn"]}
                onClick={handleCloseModal}
              >
                {" "}
                <IoMdClose />{" "}
              </button>
              <h2>Sign Up</h2>
              <p>
                By continuing, you agree to our{" "}
                <a href="#" className={styles["login-user-agremnt"]}>
                  User Agreement
                </a>{" "}
                and acknowledge that you understand the{" "}
                <a href="#" className={styles["login-privcy-plcy"]}>
                  Privacy Policy
                </a>
                .
              </p>
              {/* <button className='signup-google'><FcGoogle />Continue with Google</button> */}
              {/* <GoogleLogin
                clientId={ClientID}
                buttonText="Continue with google"
                cookiePolicy="single_host_origin"
                className={styles["signUpOne-google"]}
              /> */}
              <div id="signInDiv" className={styles["notyet"]}></div>
              <br></br>
              {/* <button className='signup-apple'><FaApple />Continue with Apple</button> */}

              <div className={styles["signUpOne-divider"]}>
                <div className={styles["SignUpOne-divider-line"]}></div>
                <div className={styles["SignUpOne-divider-text"]}>OR</div>
                <div className={styles["SignUpOne-divider-line"]}></div>
              </div>

              <div className={styles["signup-input-group"]}>
                <label htmlFor="Email"></label>
                <input
                  id={styles["signup-email"]}
                  type="email"
                  placeholder="Email*"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br></br>
                <div className={styles["signup-login-text"]}>
                  <p>
                    Already in sarakel?{" "}
                    <a
                      href="#"
                      className={styles["login-forgot-username"]}
                      onClick={handleLoginClick}
                    >
                      Log In
                    </a>
                  </p>
                </div>
                <button
                  className={styles["signup-cntnu-btn"]}
                  onClick={handleContinueButtonClick}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUpOne;
