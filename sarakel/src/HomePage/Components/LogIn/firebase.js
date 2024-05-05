

// Import necessary modules
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Initialize Firebase app with configuration
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

// Function to sign in with Google
export const signInWithGoogle = async () => {
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
        
      } else {
        // Handle error response
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error:", error);
    }
  };
  
