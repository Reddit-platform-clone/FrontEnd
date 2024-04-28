import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Post.module.css'; // Import CSS module

function Post() {
    const [posts, setPosts] = useState([]);
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1bmlvciIsImlhdCI6MTcxMzg1MzAxOX0.x3EN0N2FMiRvLZen6Ro1nuVc4JJYcU88XCYtI2N510g'; // Replace 'YOUR_AUTH_TOKEN' with your actual auth token

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await axios.post('http://localhost:5000/searchBy/posts', { keyword: "first" }, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                const postsData = response.data.postsResults;
                setPosts(postsData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }
        
        fetchPosts();
    }, [authToken]);

    return (
        <div className={styles.PostsContainer}>
            {posts.map(post => (
                <div className={`${styles.Post} ${post.isLocked ? styles.LockedPost : ''}`} key={post.postId}>
                    <div className={styles.PostHeader}>
                        <img src={post.user.image} alt='User Avatar' className={styles.LogoUp1} />
                        <span className={styles.Username1}>{post.user.name}</span>
                        <div className={styles.PostTime}>
                            <span className={styles.PostTime}>{post.time} ago</span>
                        </div>
                    </div>
                    <div className={styles.PostContent}>
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
                    <div className={styles.PostFooter}>
                        <span className={styles.Votes}>Upvotes: {post.upvotes}</span>
                        <span className={styles.Votes}>Downvotes: {post.downvotes}</span>
                        <span className={styles.Comments}>Comments: {post.numComments}</span>
                        <span className={styles.Views}>Views: {post.numViews}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Post;
