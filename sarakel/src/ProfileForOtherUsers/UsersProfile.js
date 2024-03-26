import React, { useState } from 'react';
import jsonData from '../mock.json';
import './UsersProfile.css';
import './bootstrap.min.css';
import logo from './logo512.png';

function UsersProfile() {
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
        // Call GetLoggedIn and Followerlist1 functions if user follows
        if (!isFollowing) {
            GetLoggedIn();
            Followerlist1();
        }
        if (isFollowing) {
            // Call Clearfollowlist function if user unfollows
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
        jsonData.users.map((user) => {
            if (user.id === x) {
                user.followinglist.push({ id: userid, name: username });
                console.log(user.name,"Following List:", user.followinglist);
            }
        });
        jsonData.users.map((user) => {
            if (user.id === userid) {
                user.followerlist.push({ id: x, name: y });
                console.log(user.name,"Follower List:", user.followerlist);
            }
        });
    };

    const Clearfollowlist = () => {
        jsonData.users.map((user) => {
            if (user.id === x) {
               user.followinglist.splice({ id: userid, name: username })
                console.log(user.name,"Following List:", user.followinglist);
            }
        });
        jsonData.users.map((user) => {
            if (user.id === userid) {
               user.followerlist.splice({ id: user.id, name: user.name })
                console.log(username,"Follower List:", user.followerlist);
            }
        });
    };
    
    const [showList, setShowList] = useState(false);

    const handleBlockAccount = () => {
        jsonData.users.map((user) => {
            if (user.id === x) {
                user.blockedacc.push({ name: username})
                console.log(user.name,"has blocked" ,username ,"account",user.blockedacc)
                user.followinglist.pop({ id: userid, name: username })
                console.log(user.name,"Following List:", user.followinglist);
                
                
            }
        });
        // Call GetLoggedIn function when blocking an account
        GetLoggedIn();
        jsonData.users.map((user) => {
            if (user.id === userid) {
                user.followerlist.pop({ id: user.id, name: user.name })
                console.log(username,"Follower List:", user.followerlist);   
            }
        });
        
    };
  
    const handleReportAccount = () => {
        jsonData.users.map((user) => {
            if (user.id === x) {
                user.reportedacc.push({name:username , id:userid})
                console.log(user.name,"has reported" ,username, "account",user.reportedacc)
            }
        });
        // Call GetLoggedIn function when blocking an account
        GetLoggedIn();
    };
   

    return (
        <>
            <div>
                <div className='logo'>
                    <img src={userimage} alt='Logo' className='logo2' />
                </div>
                <div className='usersdata'>
                    <h3 className='username'>{username}</h3>
                </div>
            </div>

            <div className='Contents'>
                <a className='nav-link' href='#'>
                    Overview
                </a>
                <a className='nav-link' href='#'>
                    Posts
                </a>
                <a className='nav-link' href='#'>
                    Comments
                </a>
                <hr className='border-0 border-b-sm border-solid border-b-neutral-border-weak'></hr>
            </div>

            <div className='container'>
                <h6 className=''>{username}</h6>

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
