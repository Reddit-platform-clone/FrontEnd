import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Post.module.css'; // Import CSS module
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { useAuth } from "../../HomePage/Components/AuthContext.js";

function Post() {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await axios.post('http://localhost:5000/searchBy/posts', { keyword: searchTerm }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const postsData = response.data.postsResults;
                setPosts(postsData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }
        
        fetchPosts();
    }, [searchTerm, token]);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        // Format the time as desired, for example: 23:38
        return `${hours}:${minutes}`;
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value); // Update the search term state
    };

    return (
        <div className={styles.PostsContainer}>
            <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={handleInputChange}
                className={styles.SearchInput}
            />
            {posts.map(post => (
                <div className={`${styles.Post} ${post.isLocked ? styles.LockedPost : ''}`} key={post._id}>
                    <div className={styles.PostHeader}>
                        {post.user && (
                            <>
                                <img src={post.user?.image} alt='User Avatar' className={styles.LogoUp1} />
                                <span className={styles.Username1}>{post.user.name}</span>
                            </>
                        )}
                        <div className={styles.PostTime}>
                            <span className={styles.PostTime}>{formatTime(post.createdAt)}</span>
                        </div>
                    </div>
                    <div className={styles.PostContent}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        {post.media && ( // Check if media exists and render it
                            <div className={styles.PostMedia}>
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
                    <div className={styles.PostFooter}>
                        <span className={styles.Votes}><BiUpvote/> {post.upvotes}</span>
                        <span className={styles.Votes}><BiDownvote/> {post.downvotes}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Post;
