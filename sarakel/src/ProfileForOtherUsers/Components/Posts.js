import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './Posts.module.css';
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { GoReply } from "react-icons/go";
import { LuShare } from "react-icons/lu";

function Posts({ username }) {
    const [posts, setPosts] = useState([]);

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

    return (
        <div className={style.overviewPostComment1}>
            {posts.map(post => (
                <div className={style.post} key={post.id}>
                    <div className={style.postheader}>
                        {post.user && post.user.image && (
                            <img src={post.user.image} alt='User Avatar' className={style.logoup1} />
                        )}
                        {post.user && post.user.name && (
                            <span className={style.username2}>{username}</span>
                        )}
                        <div className={style.posttime}>
                            <span className={style.posttime}> {post.time} ago</span>
                        </div>
                    </div>
                    <div className={style.postcontent}>
                        <h3>{post.title}</h3>
                        <p>{post.text}</p>
                        {post.media && post.media.length > 0 && (
                            <div>
                                {Array.isArray(post.media) ? (
                                    post.media.map((media, index) => (
                                        <img src={media} key={index} alt={`Media ${index}`} />
                                    ))
                                ) : (
                                    <img src={post.media} alt='Media' />
                                )}
                            </div>
                        )}
                    </div>
                    <div className={style.postactions}>
                        <button onClick={() => handleUpvote(post.id)}><BiUpvote /> {post.upvotes}</button>
                        <button onClick={() => handleDownvote(post.id)}><BiDownvote /> {post.downvotes}</button>
                        <button><GoReply /> Reply</button>
                        <button><LuShare /> Share</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Posts;
