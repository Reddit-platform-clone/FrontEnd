import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './Comments1.module.css';
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { GoReply } from "react-icons/go";
import { LuShare } from "react-icons/lu";

function Comments({ username }) {
    const [comments, setComments] = useState([]);
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
        async function fetchUserComments() {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/${username}/comments`);
                console.log('User Comments Data:', response.data);
                setComments(response.data.userComments);
            } catch (error) {
                console.error('Error fetching user comments:', error);
            }
        }

        fetchUserComments();
    }, [username]); // Fetch user comments whenever the username changes

    const handleUpvote = (commentId) => {
        // Implement upvote functionality here
        console.log(`Upvoting comment with ID ${commentId}`);
    };

    const handleDownvote = (commentId) => {
        // Implement downvote functionality here
        console.log(`Downvoting comment with ID ${commentId}`);
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={style.commentsContainer}>
            {comments.map(comment => (
                <div className={style.comment} key={comment._id}>
                    <div className={style.commentHeader}>
                        <img src={userData.profilePicture} alt='User Avatar' className={style.commentUserAvatar} />
                        <span className={style.commentUsername}>{userData.username}</span>
                        <div className={style.commentDateTime}>
                            <span className={style.commentDateTimeText}>{formatTime(comment.dateTime)}</span>
                        </div>
                    </div>
                    <div className={style.commentContent}>
                        <p>{comment.content}</p>
                    </div>
                    <div className={style.commentActions}>
                        <button onClick={() => handleUpvote(comment._id)}><BiUpvote /> {comment.upvote}</button>
                        <button onClick={() => handleDownvote(comment._id)}><BiDownvote /> {comment.downvote}</button>
                        <button><GoReply /> Reply</button>
                        <button><LuShare /> Share</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Comments;
