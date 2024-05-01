import React, { useState } from "react";
import styles from "./ResetPassword.module.css";
import HomePage from "../../HomePage";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"; // Import axios for making HTTP requests
import { useParams } from "react-router-dom"; // Import usePara

function ResetPassword() {
  const { token } = useParams(); // Retrieve the token from URL parameters

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false); // State to handle redirection

  const handleSubmit = () => {
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    axios
      .patch(`http://localhost:5000/api/login/reset_password/${token}`, { password: password })
      .then((response) => {
        // Handle successful response
        console.log("Password reset successful:", response.data);
        toast.success("Password reset successful, Redirecting to Homepage...");
        // Set redirect to true after a 2-second delay
        setTimeout(() => {
          setRedirect(true);
        }, 2000);
      })
      .catch((error) => {
        // Handle error
        console.error("Error resetting password:", error);
        toast.error("Failed to reset password. Please try again.");
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
          <h2>Reset Password</h2>
          <div className={styles["input-group"]}>
            <input
              className={styles["input-field"]}
              type="password"
              placeholder="New password*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className={styles["input-field"]}
              type="password"
              placeholder="Confirm new password*"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
