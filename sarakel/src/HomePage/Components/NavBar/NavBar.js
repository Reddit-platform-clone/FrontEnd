import React from 'react';
import styles from './NavBar.module.css';
import logo from "./pngwing.com.png";
import './bootstrap.min.css';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Import useAuth hook

function NavBar() {
  const { logout } = useAuth(); // Use the logout function from the authentication context

  const handleLogout = () => {
    logout(); // Call the logout function when the user clicks on logout button
  };

  return (
    <div className={styles["container-fluid"]}>
      <div className={styles["navbar"] + " " + styles["sticky-top"]}>
        <Link to='/' className={styles["left"] + " " + styles["textStyle"]}>
          <img src={logo} className={styles["img"]} alt="Logo" />
          <a className={styles["logo"]} >Sarakel</a>
        </Link>

        <div className={styles["center"]}>
          <label htmlFor="search" className={styles["search-label"]} data-title="Search Sarakel"></label>
          <div className={styles["search-icon-container"]}>
            <IoSearchOutline id={styles["search-icon"]} />
          </div>
          <input type="text" id="search" placeholder="search sarakel" className={styles["search"]} />
        </div>

        <div className={styles["right"]}>
          <button className={styles["button"] + " " + styles["notification-button"]} data-title="Open inbox">
            <IoIosNotificationsOutline />
          </button>

          <button className={styles["button"] + " " + styles["chat-button"]} data-title="Open chat">
            <IoChatbubbleEllipsesOutline />
          </button>

          <button className={styles["button"] + " " + styles["create-button"]} data-title="Create post">
            <FaPlus />
            <span>Create</span>
          </button>  

          <div className={styles['dropdown']}>
            <button className={styles['dropbtn'] + " " + styles['user-button']}>
              <span><img className={styles['userImage']} src='https://www.redditstatic.com/avatars/defaults/v2/avatar_default_5.png' alt="User avatar" /></span>
            </button>
            <div className={styles['dropdownContent']}>
              <a>User profile</a>
              <Link to='/settings'>User Settings</Link>
              <a onClick={handleLogout}>Log out</a> {/* Call handleLogout function on click */}
            </div>
          </div>
        </div>
      </div>
      <div className={styles["divider"]} />
    </div>
  );
}

export default NavBar;
