import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './HashTags.module.css'; 
import { useAuth } from "../../HomePage/Components/AuthContext.js";

export default function HashTags() {
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
        
        return `${hours}:${minutes}`;
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value); // Update the search term state
    };

    return (
        <div className={styles.PostsContainer}>
            <input
                type="text"
                placeholder="Search For Hashtag..."
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
                        {post.hashtags && post.hashtags.length > 0 && (
                            <div className={styles.Hashtags}>
                                {post.hashtags.map((hashtag, index) => (
                                    <span key={index} className={styles.Hashtag}>{hashtag}</span>
                                ))}
                            </div>
                        )}
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
                </div>
            ))}
        </div>
    );
}
