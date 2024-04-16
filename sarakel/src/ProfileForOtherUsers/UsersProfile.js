import React, { useState } from 'react';
import jsonData from 'F:/Cairo university/CMPS203/software-project/FrontEnd/sarakel/src/mock.json';
import './UsersProfile.css';
import './bootstrap.min.css';
import logo from './logo512.png';
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { GoReply } from "react-icons/go";
import { LuShare } from "react-icons/lu";
import NavBarUnlogged from '../HomePage/Components/NavBar Unlogged/NavBarUnlogged';
import SideBar from '../HomePage/Components/SideBar/SideBar';
import Overview from './Components/Overview';
import Posts from './Components/Posts';
import Comments from './Components/Comments';


function UsersProfile() {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    let userid;
    let username;
    let userimage;
    jsonData.users.map((user) => {
        if (user.LoggedIn !== 1) {
            userid = user.id;
            username = user.name;
            userimage = user.image;
            return;
        }
    });

    const [isFollowing, setIsFollowing] = useState(false);
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

    let x;
    let y;

    const GetLoggedIn = () => {
        jsonData.users.map((user) => {
            if (user.LoggedIn === 1) {
                x = user.id;
                y = user.name
                return JSON.stringify(user.id);
            }
        });
    };

    const Followerlist1 = () => {
        jsonData.users.forEach((user) => {
            if (user.id === x) {
                // Check if followinglist exists, if not initialize it as an empty array
                if (!user.followinglist) {
                    user.followinglist = [];
                }
                user.followinglist.push({ id: userid, name: username });
                console.log(user.name,"Following List:", user.followinglist);
            }
        });
    
        jsonData.users.forEach((user) => {
            if (user.id === userid) {
                // Check if followerlist exists, if not initialize it as an empty array
                if (!user.followerlist) {
                    user.followerlist = [];
                }
                user.followerlist.push({ id: x, name: y });
                console.log(user.name,"Follower List:", user.followerlist);
            }
        });
    };

    const Clearfollowlist = () => {
        jsonData.users.forEach((user) => {
            if (user.id === x) {
                // Check if followinglist exists before attempting to splice
                if (user.followinglist) {
                    const index = user.followinglist.findIndex(item => item.id === userid);
                    if (index !== -1) {
                        user.followinglist.splice(index, 1);
                    }
                    console.log(user.name,"Following List:", user.followinglist);
                }
            }
        });
    
        jsonData.users.forEach((user) => {
            if (user.id === userid) {
                // Check if followerlist exists before attempting to splice
                if (user.followerlist) {
                    const index = user.followerlist.findIndex(item => item.id === user.id);
                    if (index !== -1) {
                        user.followerlist.splice(index, 1);
                    }
                    console.log(username,"Follower List:", user.followerlist);
                }
            }
        });
    };

    const [showList, setShowList] = useState(false);
    const handleBlockAccount = () => {
        jsonData.users.map((user) => {
            if (user.id === x) {
                // Initialize blockedacc as an array if it's undefined
                if (!user.blockedacc) {
                    user.blockedacc = [];
                }
                user.blockedacc.push({ name: username });
                console.log(user.name, "has blocked", username, "account", user.blockedacc);
    
                // Filter out the user from followinglist
                user.followinglist = user.followinglist.filter((item) => item.id !== userid);
                console.log(user.name, "Following List:", user.followinglist);
    
                // If the user is the same as the one being blocked, remove from followerlist
                if (user.id === userid) {
                    user.followerlist = user.followerlist.filter((item) => item.id !== user.id);
                    console.log(username, "Follower List:", user.followerlist);
                }
            }
        });
        GetLoggedIn();
    };
    
  
    const handleReportAccount = () => {
        jsonData.users.map((user) => {
            if (user.id === x) {
                // Check if reportedacc is undefined, if so, initialize it as an empty array
                if (!user.reportedacc) {
                    user.reportedacc = [];
                }
                user.reportedacc.push({ name: username, id: userid });
                console.log(user.name, "has reported", username, "account", user.reportedacc);
            }
        });
        GetLoggedIn();
    };
    
    return (
        <>
            <NavBarUnlogged />
            <SideBar />
            <div className='user-data'>
                <img src={jsonData.users[0].image} alt='User Avatar' className='logoup' />
                <span className='username'>{jsonData.users[0].name}</span>
            </div>

            <div className='Contents'>
                <a className={`nav-link ${activeTab === 0 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(0)}>
                    <span>Overview</span>
                </a>
                <a className={`nav-link ${activeTab === 1 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(1)}>
                    <span>Posts</span>
                </a>
                <a className={`nav-link ${activeTab === 2 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(2)}>
                    <span>Comments</span>
                </a>
                <br/>
                <hr className="hr-solid1"></hr>
            </div>

            <div className='overview-post-comment1'>
                {activeTab === 0 && (
                    /* Render content for Overview tab */
                    <div>
                        <Overview/>
                    </div>
                )}
                {activeTab === 1 && (
                    <div>
                        <Posts/>
                    </div>
                    
                )}
                {activeTab === 2 && (
                    /* Render content for Comments tab */
                    <div>
                        <Comments/>
                    </div>
                )}
            </div>

            <div className='containerUP'>
                <h6 className=''>{jsonData.users[0].name}</h6>
                <div className='button-container'>
                    <button className={`button ${isFollowing ? 'following' : ''}`} onClick={toggleFollow}>
                        {isFollowing ? '- Unfollow' : '→ Follow'}
                    </button>
                    <button className='button'>Chat</button>
                    <div>
                        <button className='button' onClick={() => setShowList(!showList)}>
                            {showList ? 'Close' : 'Options'}
                        </button>
                        {showList && (
                            <div>
                                <ul>
                                    <button className='button'>Share</button><br/>
                                    <button className='button' >Send a message</button>
                                    <button className='button' onClick={handleBlockAccount}>Block account</button>
                                    <button className='button' onClick={handleReportAccount}>Report account</button>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <br/>
                <div className='usersdata'>
                    <div className='horizontalali'>
                        <p className='text-sm text-gray-500'>Post Karma</p>
                        <p className='text-lg font-bold'>1</p>
                    </div>
                    <div className='horizontalali'>
                        <p className='text-sm text-gray-500'>Comment Karma</p>
                        <p className='text-lg font-bold'>0</p>
                    </div>
                    <div className='horizontalali'>
                        <p className='text-sm text-gray-500'>Cake day</p>
                        <p className='text-lg font-bold'>Mar 1, 2024</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UsersProfile;
