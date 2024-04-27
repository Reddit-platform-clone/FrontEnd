import React, { useState } from 'react';
import styles from './NavBarUnlogged.module.css';
import logo from "./pngwing.com.png";
import './bootstrap.min.css';
import { IoSearchOutline } from "react-icons/io5";
import LogIn from "../LogIn/LogIn";


function NavBarUnlogged() {
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = () => {
    setShowLogin(!showLogin);
  };

  const handleCloseModal = () => {
    setShowLogin(false);
  };

  const handleSuccessfulLogin = () => {
    setShowLogin(false); // Close the modal after successful login
  };

  return (
    <div className={styles['container-fluid']}>
      <div className={styles["navbar"] + " " + styles["sticky-top"]}>
        <div className={styles["left"]}>
          <img src={logo} className={styles["img"]} alt="Logo" />
          <a href="#" className={styles["logo"]} >Sarakel</a>
        </div>

        <div className={styles["center"]}>
          <label htmlFor="search" className={styles["search-label"]} data-title="Search Sarakel"></label>
          <div className={styles["search-icon-container"]}>
            <IoSearchOutline id={styles["search-icon"]} />
          </div>
          <input type="text" id="search" placeholder="search sarakel" className={styles["search"]} />
        </div>

        <div className={styles["right"]}>
          <button className={styles['right-login-btn']} onClick={handleLogin}>Login</button>

          <div className={styles["dropdown"]}>
            <button className={styles["dropbtn"]}>&#8226;&#8226;&#8226;</button>
            <div className={styles['dropdown-content']}>
              <a href="#">Option 1</a>
              <a href="#">Option 2</a>
              <a href="#">Option 3</a>
            </div>
          </div>
        </div>
      </div>
      <hr className={styles["m-0"]} />

      {/* Render login modal if showLogin is true */}
      {showLogin && <LogIn onSuccessfulLogin={handleSuccessfulLogin} onCloseModal={handleCloseModal} />}
    </div>
  );
}

export default NavBarUnlogged;
