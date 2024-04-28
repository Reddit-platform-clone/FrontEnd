import React, { useState } from 'react';
import jsonData from 'F:/Cairo university/CMPS203/software-project/FrontEnd/sarakel/src/mock.json';
import NavBarUnlogged from '../HomePage/Components/NavBar Unlogged/NavBarUnlogged';
import SideBar from '../HomePage/Components/SideBar/SideBar';
import Overview from './Components/Overview';
import Posts from './Components/Posts';
import Comments from './Components/Comments';
import styles from './UsersProfile.module.css';
import logo from './logo512.png';
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { GoReply } from "react-icons/go";
import { LuShare } from "react-icons/lu";

function UsersProfile() {
    const [activeTab, setActiveTab] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);
    const [showList, setShowList] = useState(false);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
        if (!isFollowing) {
            GetLoggedIn();
            Followerlist1();
        }
        if (isFollowing) {
            Clearfollowlist();
        }
    };

    // Remaining functions and logic remain unchanged...

    return (
        <>
            <NavBarUnlogged />
            <SideBar />
            <div className={styles.userData}>
                <img src={jsonData.users[0].image} alt='User Avatar' className={styles.logoUp} />
                <span className={styles.username}>{jsonData.users[0].name}</span>
            </div>

            <div className={styles.contents}>
                <a className={`${styles.navLink} ${activeTab === 0 ? styles.active : ''}`} href='#' onClick={() => handleTabClick(0)}>
                    <span>Overview</span>
                </a>
                <a className={`${styles.navLink} ${activeTab === 1 ? styles.active : ''}`} href='#' onClick={() => handleTabClick(1)}>
                    <span>Posts</span>
                </a>
                <a className={`${styles.navLink} ${activeTab === 2 ? styles.active : ''}`} href='#' onClick={() => handleTabClick(2)}>
                    <span>Comments</span>
                </a>
                <br />
                <hr className={styles.hrSolid}></hr>
            </div>

            <div className={styles.overviewPostComment}>
                {activeTab === 0 && (
                    <div>
                        <Overview />
                    </div>
                )}
                {activeTab === 1 && (
                    <div>
                        <Posts />
                    </div>
                )}
                {activeTab === 2 && (
                    <div>
                        <Comments />
                    </div>
                )}
            </div>

            <div className={styles.containerUP}>
                <h6 className=''>{jsonData.users[0].name}</h6>
                <div className={styles.buttonContainer}>
                    <button className={`${styles.button123456} ${isFollowing ? styles.following : ''}`} onClick={toggleFollow}>
                        {isFollowing ? '- Unfollow' : '→ Follow'}
                    </button>
                    <button className={styles.button123456}>Chat</button>
                    <div>
                        <button className={styles.button123456} onClick={() => setShowList(!showList)}>
                            {showList ? 'Close' : 'Options'}
                        </button>
                        {showList && (
                            <div>
                                <ul>
                                    <button className={styles.button123456}>Share</button><br/>
                                    <button className={styles.button123456} >Send a message</button>
                                    <button className={styles.button123456} onClick={handleBlockAccount}>Block account</button>
                                    <button className={styles.button123456} onClick={handleReportAccount}>Report account</button>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <br />
                <div className={styles.userData}>
                    <div className={styles.horizontalAli}>
                        <p className={styles.textSm}>Post Karma</p>
                        <p className={styles.textLg}>1</p>
                    </div>
                    <div className={styles.horizontalAli}>
                        <p className={styles.textSm}>Comment Karma</p>
                        <p className={styles.textLg}>0</p>
                    </div>
                    <div className={styles.horizontalAli}>
                        <p className={styles.textSm}>Cake day</p>
                        <p className={styles.textLg}>Mar 1, 2024</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UsersProfile;
