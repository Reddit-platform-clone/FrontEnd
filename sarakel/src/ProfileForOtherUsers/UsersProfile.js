import React, { useState } from 'react';
import jsonData from 'F:/Cairo university/CMPS203, Software Engineering/software-project/FrontEnd/sarakel/src/mock.json';
import './UsersProfile.css';
import './bootstrap.min.css';
import logo from './logo512.png';
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { GoReply } from "react-icons/go";
import { LuShare } from "react-icons/lu";


function UsersProfile() {
    let userid;
    let username;
    // const [posts, setPosts] = useState(jsonData.posts);
    
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

                if (user.id === userid) {
                    user.followerlist.pop({ id: user.id, name: user.name })
                    console.log(username,"Follower List:", user.followerlist);   
                }
                
                
            }
        });
        // Call GetLoggedIn function when blocking an account
        GetLoggedIn();
        // jsonData.users.map((user) => {
        //     if (user.id === userid) {
        //         user.followerlist.pop({ id: user.id, name: user.name })
        //         console.log(username,"Follower List:", user.followerlist);   
        //     }
        // });
        
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
            <div className='user-data'>
                <img src={jsonData.users[0].image} alt='User Avatar' className='logoup' />
                <span className='username'>{jsonData.users[0].name}</span>
            </div>

            <div className='Contents'>
                <a className='nav-link' href='#'>
                    <span>Overview</span>
                </a>
                <a className='nav-link' href='#'>
                    <span>Posts</span>
                </a>
                <a className='nav-link' href='#'>
                    <span>Comments</span>
                </a><br/>
                <hr className="hr-solid1"></hr>
            </div>


            {/* Display posts */}
            <div className='overview-post-comment1'>
            {jsonData.posts.map(post => {
                    // const user = jsonData.users.find(user => user.id === post.user_id);
                    // if (!user) return null; // If user does not exist, skip this post
                    return (
                        <div className='post' key={post.id}>
                            <div className='post-header'>
                                <img src={post.user.image} alt='User Avatar' className='logoup1' />
                                <span className='username1'>{post.user.name}</span>
                                <div className='posttime'>
                                    <span className='posttime'>{post.time} ago</span>
                                </div>
                            </div>
                            <div className='post-content'>
                                <h3>{post.title}</h3>
                                <p>{post.text}</p>
                                {Array.isArray(post.media) ? (
                                    post.media.map((media, index) => (
                                        <img src={media} key={index} alt={`Media ${index}`} />
                                    ))
                                ) : (
                                    <img src={post.media} alt='Media' />
                                )}
                            </div>
                            <div className='post-actions'>
                                <button><BiUpvote /> {post.likes}</button>
                                <button><BiDownvote /> {post.comments}</button>
                                <button><GoReply /> Reply</button>
                                <button><LuShare /> Share</button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className='container'>
                <h6 className=''>{username}</h6>
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