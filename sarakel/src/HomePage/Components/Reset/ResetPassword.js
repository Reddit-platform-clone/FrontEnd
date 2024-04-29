import React, { useState } from "react";
import styles from "./ResetPassword.module.css";
import { ToastContainer, toast } from "react-toastify";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (password.length < 8) {
      toast.error("Password must be atleast 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Proceed with password reset logic
    // For now, just logging the password to console
    console.log("Password reset successful:", password);
  };

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
          <button className={styles["login-btn-final"]} onClick={handleSubmit}>
            Submit
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
