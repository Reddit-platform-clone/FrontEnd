import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './Posts.module.css';
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { GoReply } from "react-icons/go";
import { LuShare } from "react-icons/lu";

function Posts({ username }) {
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState(null);

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

    useEffect(() => {
        async function fetchUserPosts() {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/${username}/submitted`);
                console.log('User Posts Data:', response.data);
                setPosts(response.data.posts);
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
        }

        fetchUserPosts();
    }, [username]); // Fetch user posts whenever the username changes

    const handleUpvote = (postId) => {
        // Implement upvote functionality here
        console.log(`Upvoting post with ID ${postId}`);
    };

    const handleDownvote = (postId) => {
        // Implement downvote functionality here
        console.log(`Downvoting post with ID ${postId}`);
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={style.overviewPostComment1}>
            {posts.map(post => (
                <div className={style.post} key={post._id}>
                    <div className={style.postheader}>
                        <img src={userData.profilePicture} alt='User Avatar' className={style.logoup1} />
                        <span className={style.username2}>{userData.username}</span>
                        {post.scheduled && (
                            <div className={style.posttime}>
                                <span className={style.posttime}>{formatTime(post.scheduled.time)}</span>
                            </div>
                        )}
                    </div>
                    <div className={style.postcontent}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        {post.media && ( // Check if media exists and render it
                            <div className={style.postMedia}>
                                <img src={post.media} alt="Media" />
                            </div>
                        )}
                    </div>
                    <div className={style.postactions}>
                        <button onClick={() => handleUpvote(post._id)}><BiUpvote /> {post.upvotes}</button>
                        <button onClick={() => handleDownvote(post._id)}><BiDownvote /> {post.downvotes}</button>
                        <button><GoReply /> Reply</button>
                        <button><LuShare /> Share</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Posts;
