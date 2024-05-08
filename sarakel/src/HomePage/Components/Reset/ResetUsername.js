import React, { useState } from "react";
import styles from "./ResetUsername.module.css";
import HomePage from "../../HomePage";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"; // Import axios for making HTTP requests
import { useParams } from "react-router-dom"; // Import useParams and Redirect

function ResetPassword() {
  const { token } = useParams(); // Retrieve the token from URL parameters

  const [username, setUsername] = useState("");
  const [confirmUsername, setConfirmUsername] = useState("");
  const [redirect, setRedirect] = useState(false); // State to handle redirection

  const handleSubmit = () => {
    console.log("token : ", token);

    axios
      .patch(`http://57.151.116.81:5000/api/login/reset_username/${token}`, { username: username })
      .then((response) => {
        // Handle successful response
        console.log("username reset successful:", response.data);
        toast.success("username reset successful, Redirecting to Homepage...");
        // Set redirect to true after a 2-second delay
        setTimeout(() => {
          setRedirect(true);
        }, 2000);
      })
      .catch((error) => {
        // Handle error
        console.error("Error resetting username:", error);
        toast.error("Failed to reset username. Please try again.");
      });
  };

  // Redirect to "/login" route after successful password reset
  if (redirect) {
    return <HomePage />;
  }

  return (
    <div className={styles["login-overlay"]}>
      <div className={styles["login-modal"]}>
        <div className={styles["login-content"]}>
          <h2>Reset Username</h2>
          <div className={styles["input-group"]}>
            <input
              className={styles["input-field"]}
              type="text"
              placeholder="New username*"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className={styles["input-field"]}
              type="text"
              placeholder="Confirm new username*"
              value={confirmUsername}
              onChange={(e) => setConfirmUsername(e.target.value)}
              required
            />
          </div>
          <button
            className={styles["login-btn-final"]}
            onClick={handleSubmit}
          >
            Submit
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
