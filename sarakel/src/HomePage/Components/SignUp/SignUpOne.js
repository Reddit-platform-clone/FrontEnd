import React, { useState,useEffect } from "react";
import styles from "./SignUpOne.module.css";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUpTwo from "./SignUpTwo.js";
import { useAuth } from "../AuthContext";
import LogIn from "../LogIn/LogIn.js";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// const ClientID =
//   "1098296945879-b02a0lauc8d73hld7t59oji2bgi7vtga.apps.googleusercontent.com";

function SignUpOne() {
  const [showSignUpTwo, setShowSignUpTwo] = useState(false);
  const [email, setEmail] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [showModal, setShowModal] = useState(true); // State for modal visibility
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
      // console.log("Token from server:", serverToken);
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

const handleGoogleSignIn = async () => {
  await signInWithGoogle();
};

  // function handleCallbackResponse(response) {
  //   console.log("Encoded JWT ID token : "+response.credential )
  // }
  
  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.initialize({ 
  //     client_id: '579900774553-gv8jas84grhmnqfqq6k0otb7tod7f8nq.apps.googleusercontent.com',
  //     callback: handleCallbackResponse
  //   });
  //   google.accounts.id.renderButton(document.getElementById("signInDiv"),
  //     { theme: "outline", size: "large" }
  // )
  // }, []);

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
              {/* <div id="signInDiv" className={styles["notyet"]}></div> */}
              <button className={styles["login-with-google-btn"]} onClick={handleGoogleSignIn}>Log in with google</button>
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
