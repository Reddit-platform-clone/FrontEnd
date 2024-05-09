import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../HomePage/Components/AuthContext.js"
import style from './ProfilePage.module.css'
import logo from './logo512.png'
import jsonData from '../mock.json'
import { CgAddR } from "react-icons/cg";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { GoReply } from "react-icons/go";
import { LuShare } from "react-icons/lu";
import NavBar from '../HomePage/Components/NavBar/NavBar';
import SideBar from '../HomePage/Components/SideBar/SideBar';
import Overview from './Components/Overview';
import Posts from './Components/Posts'
import Comments from './Components/Comments';
import Saved from './Components/Saved';
import Hidden from './Components/Hidden';
import Upvoted from './Components/Upvoted';
import Downvoted from './Components/Downvoted';

function ProfilePage() {
    const [activeTab, setActiveTab] = useState(0);
    const [userData, setUserData] = useState(null);
    const { token } = useAuth(); // Assuming you get the token from the AuthContext

    useEffect(() => {
        if (token) {
            // Fetch user data from the backend API
            axios.get('http://127.0.0.1:5000/api/v1/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    // Set the userData state with the received user data
                    setUserData(response.data.user);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [token]);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };



    return (
        <>
            <NavBar />
            <SideBar />

            <div className={style.profileContainer}>

                <div className={style.usernameContainer}>
                    {userData && (
                        <>
                            <img src={userData.profilePicture} alt="Profile Picture" className={style.profilePicture} />
                            <h2 className={`${style.username} text-lg font-bold`}>{userData.username}</h2>

                        </>
                    )}
                </div>




                {/* Navigation links */}
                <div className={style.Contents1}>
                    <a className={`nav-link ${activeTab === 0 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(0)}>
                        <span>Overview</span>
                    </a>
                    <a className={`nav-link ${activeTab === 1 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(1)}>
                        <span>Posts</span>
                    </a>
                    <a className={`nav-link ${activeTab === 2 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(2)}>
                        <span>Comments</span>
                    </a>
                    <a className={`nav-link ${activeTab === 3 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(3)}>
                        <span>Saved</span>
                    </a>
                    <a className={`nav-link ${activeTab === 4 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(4)}>
                        <span>Hidden</span>
                    </a>
                    <a className={`nav-link ${activeTab === 5 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(5)}>
                        <span>Upvoted</span>
                    </a>
                    <a className={`nav-link ${activeTab === 6 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(6)}>
                        <span>Downvoted</span>
                    </a>

                    <Link to="/CreatePost" className='nav-link'>
                        <span>+ Create Post</span>
                    </Link>

                </div>
                <hr className={style.linePP} />

                {/* Content section */}
                <div className={style.overviewPostComment1}>
                    {activeTab === 0 && (
                        /* Render content for Overview tab */
                        <div>
                            <Overview />
                        </div>
                    )}
                    {activeTab === 1 && (
                        /* Render content for Posts tab */
                        <div>
                            <Posts />

                        </div>
                    )}
                    {activeTab === 2 && (
                        /* Render content for Comments tab */
                        <div>
                            <Comments />
                        </div>
                    )}
                    {activeTab === 3 && (
                        /* Render content for Saved tab */
                        <div>
                            <Saved />
                        </div>
                    )}
                    {activeTab === 4 && (
                        /* Render content for Saved tab */
                        <div>
                            <Hidden />
                        </div>
                    )}
                    {activeTab === 5 && (
                        /* Render content for Saved tab */
                        <div>
                            <Upvoted />
                        </div>
                    )}
                    {activeTab === 6 && (
                        /* Render content for Saved tab */
                        <div>
                            <Downvoted />
                        </div>
                    )}
                </div>

                {/* Right side container */}
                <div className={style.rightsidecontainer}>
                    {/* Other content */}
                    <div className={style.rightside}>
                        {/* Content of right side */}
                        <div className="flex items-center justify-between">
                            <div className={style.backgroundimage}>
                                {userData && (
                                    <>
                                        <img src={userData.profilePicture} alt="Profile Picture" className={style.backgroundimage} />
                                        {/* <h2 className={`${style.username} text-lg font-bold`}>{userData.username}</h2> */}
                                    </>
                                )}

                            </div>

                            <Link to="/Settings">
                                <button className={style.addbannerbtn}>
                                    <CgAddR className={style.usersettings} />
                                </button>
                            </Link>
                            <br />

                            <div className={style.usernamecontainer}>
                                {/* Background image */}

                                {/* Username */}
                                <h2 className="text-lg font-bold">{userData && userData.username}</h2><br />
                            </div>

                            <div className={style.aboutme}>
                                {
                                    userData && (
                                        <>
                                            <h4 className={style.aboutme}>{userData.about}</h4>

                                        </>
                                    )
                                }
                            </div>
                            <button className={style.sharebtn}>
                                <span className="flex mr-xs">
                                    <svg fill="currentColor" height="16" icon-name="share-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.942 7.058 12.8.912l-.883.883 5.079 5.08h-2.871A13.189 13.189 0 0 0 1.067 18h1.267a11.94 11.94 0 0 1 11.791-9.875h2.866l-5.079 5.08.883.883 6.147-6.146a.624.624 0 0 0 0-.884Z"></path>
                                    </svg>
                                </span>
                                Share
                            </button>

                        </div>
                        <hr />

                        <div className="mt-6">
                            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Settings</h3>
                            <div className={style.Settingsbutton}>
                                <div className={style.editprofile}>
                                    <img src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_2.png" alt="u/ahmet77mostafa avatar" width="24" height="24" loading="eager" />

                                    <div className={style.profileinfo}>
                                        <span className={style.boldtext}>Profile</span>
                                        <span className={style.description11}>Customize your profile</span>
                                    </div>
                                    <button className={style.editprofilebtn}>
                                        <Link to="/settings">
                                            <span className={style.editprofilew}>Edit Profile</span>
                                        </Link>
                                    </button>
                                </div>

                                <div className={style.modsettings}>
                                    <img src="data:image/svg+xml,%3Csvg%20fill%3D%22currentColor%22%20height%3D%2220%22%20icon-name%3D%22mod-outline%22%20viewBox%3D%220%200%2020%2020%22%20width%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M10%2020c-.101%200-.202-.014-.3-.04C8.249%2019.554%201%2017.277%201%2012V3.187A1.122%201.122%200%200%201%201.846%202.1L9.73.108c.177-.044.363-.044.54%200L18.154%202.1A1.122%201.122%200%200%201%2019%203.187V12c0%205.277-7.249%207.554-8.7%207.957A1.162%201.162%200%200%201%2010%2020ZM2.25%203.283V12c0%204.465%206.989%206.531%207.786%206.751.725-.22%207.714-2.286%207.714-6.751V3.283L10%201.33%202.25%203.283Z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E" alt="mod" width="20" height="20"></img>

                                    <div className={style.modinfo}>
                                        <span className={style.boldtext}>Moderation</span>
                                        <span className={style.description11}>Moderation Tools</span>
                                    </div>
                                    <button className={style.modsettingsbtn}>
                                        <Link to="/Moderation">
                                            <span className={style.modsettxt}>Mod settings</span>
                                        </Link>

                                    </button>

                                </div>

                            </div>
                        </div>
                        <hr />

                        <div className={style.Sociallink}>
                            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Links</h3>
                            <button className={style.Sociallink} style={{ display: 'flex', alignItems: 'center' }}>
                                <img src="data:image/svg+xml,%3Csvg%20fill='currentColor'%20height='12'%20icon-name='add-fill'%20viewBox='0%200%2020%2020'%20width='12'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20d='M19%209h-8V1H9v8H1v2h8v8h2v-8h8V9Z'%3E%3C/path%3E%3C/svg%3E" alt="Add Icon" width="12" height="12"></img>
                                <span style={{ marginLeft: '4px' }}>Add Social Link</span>
                            </button>
                        </div>



                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;
