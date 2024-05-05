import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UsersProfile.module.css';
import NavBarUnlogged from '../HomePage/Components/NavBar Unlogged/NavBarUnlogged';
import SideBar from '../HomePage/Components/SideBar/SideBar';
import Overview from './Components/Overview';
import Posts from './Components/Posts';
import Comments from './Components/Comments';
import { useParams } from 'react-router-dom';

function UsersProfile() {
    const { username } = useParams(); // Access the username from URL params
    const [userData, setUserData] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [showList, setShowList] = useState(false);
    const [activeTab, setActiveTab] = useState(0);


    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/${username}/overview`);
                console.log('User Data:', response.data);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUserData();
    }, [username]);

    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

   

    return (
        <>
            <NavBarUnlogged />
            <SideBar />
            <div className='user-data'>
                <img src={userData.profilePicture} alt='User Avatar' className={styles.logoup} />
                <span className={styles.username}>{username}</span>
            </div>

            <div className={styles.Contents}>
            
                    <a className={`nav-link ${activeTab === 0 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(0)}>
                        <span>Overview</span>
                    </a>
                    <a className={`nav-link ${activeTab === 1 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(1)}>
                        <span>Posts</span>
                    </a>
                    <a className={`nav-link ${activeTab === 2 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(2)}>
                        <span>Comments</span>
                    </a>
                
            </div>

            <div className={styles.overviewPostComment1}>
                    {activeTab === 0 && (
                        /* Render content for Overview tab */
                        <div>
                            <Overview />
                        </div>
                    )}
                    {activeTab === 1 && (
                        /* Render content for Posts tab */
                        <div>
                            <Posts username={username} />

                        </div>
                    )}
                    {activeTab === 2 && (
                        /* Render content for Comments tab */
                        <div>
                            <Comments />
                        </div>
                    )}

                    </div>

            <div className={styles.containerUP}>
                <h6 className=''>{username}</h6>
                <div className={styles.buttoncontainer}>
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
                                    <button className={styles.button123456}>Send a message</button>
                                    <button className={styles.button123456}>Block account</button>
                                    <button className={styles.button123456}>Report account</button>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <br/>
                <div className='usersdata'>
                    <div className={styles.horizontalali}>
                        <p className='text-sm text-gray-500'>Post Karma</p>
                        <p className='text-lg font-bold'>1</p>
                    </div>
                    <div className={styles.horizontalali}>
                        <p className='text-sm text-gray-500'>Comment Karma</p>
                        <p className='text-lg font-bold'>0</p>
                    </div>
                    <div className={styles.horizontalali}>
                        <p className='text-sm text-gray-500'>Cake day</p>
                        <p className='text-lg font-bold'>Mar 1, 2024</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UsersProfile;
