import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Comment.module.css'; // Import CSS module
import { useAuth } from "../../HomePage/Components/AuthContext.js";

function Comments() {
    const [comments, setComments] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        async function fetchComments() {
            try {
                const response = await axios.post('http://localhost:5000/searchBy/comments', { keyword: "test" }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const commentsData = response.data.commentsResults;
                setComments(commentsData);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        }
        
        fetchComments();
    }, [token]);

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    return (
        <div className={styles.CommentsContainer}>
            {comments.map(comment => (
                <div className={styles.Comment} key={comment._id}>
                    <div className={styles.CommentHeader}>
                        <span className={styles.userID}>{comment.userID}</span>
                        {/* Render each comment header here if needed */}
                    </div>
                    <div className={styles.CommentContent}>
                        <p>{comment.content}</p>
                    </div>
                    <div className={styles.CommentTime}>
                        <span>{formatTime(comment.dateTime)}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Comments;
