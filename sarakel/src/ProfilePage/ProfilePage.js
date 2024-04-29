
import React, { useState, useEffect } from 'react';
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
                            <img src={userData.ProfilePicture} alt="Profile Picture" className={style.profilePicture} />
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

                    <a className='nav-link' href='#'>
                        <span>+ Create Post</span>
                    </a>
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
                            <div className={style.backgroundimage}></div>

                            <a href="">
                                <button className={style.addbannerbtn}>
                                    <CgAddR className={style.usersettings} />
                                </button>
                            </a>
                            <br />

                            <div className={style.usernamecontainer}>
                                {/* Background image */}

                                {/* Username */}
                                <h2 className="text-lg font-bold">{userData && userData.username}</h2><br />
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

                                    <div className="profile-info">
                                        <span className={style.boldtext}>Profile</span>
                                        <span className={style.description11}>Customize your profile</span>
                                    </div>
                                    <button className={style.editprofilebtn}>
                                        <span>Edit Profile</span>
                                    </button>
                                </div>

                                <div className={style.editavatar}>
                                    <img src="data:image/svg+xml,%3Csvg%20fill%3D%22currentColor%22%20height%3D%2220%22%20icon-name%3D%22avatar-style-outline%22%20viewBox%3D%220%200%2020%2020%22%20width%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22m19.683%205.252-3.87-3.92a1.128%201.128%200%200%200-.8-.332h-1.55a1.093%201.093%200%200%200-1.1.91%201.9%201.9%200%200%201-3.744%200A1.094%201.094%200%200%200%207.533%201h-1.55c-.3%200-.588.12-.8.332L1.317%205.253a1.1%201.1%200%200%200%20.014%201.557l1.87%201.829a1.121%201.121%200%200%200%201.48.076l.32-.24v1.936c.344-.31.786-.49%201.25-.511V5.977L3.993%207.668l-1.68-1.646L6.036%202.25H7.42a3.156%203.156%200%200%200%206.16%200h1.383l3.723%203.772-1.7%201.668-2.236-1.749v8.138c.501.337.927.774%201.25%201.284V8.509l.338.264a1.117%201.117%200%200%200%201.436-.109l1.894-1.853a1.101%201.101%200%200%200%20.015-1.559ZM13.691%2020H1.31A1.325%201.325%200%200%201%200%2018.663v-4.916a1.03%201.03%200%200%201%20.5-.884.988.988%200%200%201%20.98-.014%203%203%200%200%200%203.3-.266c.334-.342.649-.702.944-1.078a.624.624%200%200%201%20.775-.163l6.75%203.5A2.945%202.945%200%200%201%2015%2017.584v1.079A1.325%201.325%200%200%201%2013.691%2020Zm-12.44-5.873v4.536c0%20.054.033.087.058.087h12.382c.025%200%20.06-.033.06-.087v-1.079a1.72%201.72%200%200%200-1.035-1.609l-6.349-3.29a9.24%209.24%200%200%201-.76.831%204.235%204.235%200%200%201-4.357.611Zm4.022%204.042-.9-.862%203.138-3.3.9.862-3.138%203.3Zm3.04%200-.913-.857%202.09-2.219.91.857-2.088%202.219Z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E" alt="avatar" width="20" height="20"></img>
                                    <div className='avatar-info'>
                                        <span className={style.boldtext}>Avatar</span>
                                        <span className={style.description11}>Customize and style</span>
                                    </div>
                                    <button className={style.editprofilebtn}>
                                        <span>Style Avatar</span>
                                    </button>

                                </div>
                                <div className={style.modsettings}>
                                    <img src="data:image/svg+xml,%3Csvg%20fill%3D%22currentColor%22%20height%3D%2220%22%20icon-name%3D%22mod-outline%22%20viewBox%3D%220%200%2020%2020%22%20width%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M10%2020c-.101%200-.202-.014-.3-.04C8.249%2019.554%201%2017.277%201%2012V3.187A1.122%201.122%200%200%201%201.846%202.1L9.73.108c.177-.044.363-.044.54%200L18.154%202.1A1.122%201.122%200%200%201%2019%203.187V12c0%205.277-7.249%207.554-8.7%207.957A1.162%201.162%200%200%201%2010%2020ZM2.25%203.283V12c0%204.465%206.989%206.531%207.786%206.751.725-.22%207.714-2.286%207.714-6.751V3.283L10%201.33%202.25%203.283Z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E" alt="mod" width="20" height="20"></img>

                                    <div className='mod-info'>
                                        <span className={style.boldtext}>Moderation</span>
                                        <span className={style.description11}>Moderation Tools</span>
                                    </div>
                                    <button className={style.modsettingsbtn}>
                                        <span className='modsettxt'>Mod settings</span>
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
