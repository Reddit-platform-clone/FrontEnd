import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Hidden.module.css';
import { useAuth } from "../../HomePage/Components/AuthContext.js";

function Hidden() {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [userLogo, setUserLogo] = useState(null);

  useEffect(() => {
    if (token) {
      axios.get('http://127.0.0.1:5000/api/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUsername(response.data.user.username);
        setUserLogo(response.data.user.profilePicture);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setLoading(false); // Set loading to false in case of error
      });
    }
  }, [token]);

  useEffect(() => {
    const fetchHiddenPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/get_hide', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data.message.filter(([type]) => type === 'post').flatMap(([, data]) => data[0]));
        setLoading(false);
        console.log('Hidden posts fetched successfully');
      } catch (error) {
        console.error('Error fetching hidden posts:', error);
        setLoading(false);
      }
    };

    if (username) {
      fetchHiddenPosts();
    }
  }, [token, username]);

  return (
    <div className={styles.hiddenContainer}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map(post => (
          <div className={styles.post} key={post._id}>
            <div className={styles.postUserInfo}>
              <img className={styles.userLogo} src={userLogo} alt="User Logo" />
              <p className={styles.username}>{username}</p>
            </div>
            <h3 className={styles.postTitle}>{post.title}</h3>
            <p className={styles.postContent}>{post.content}</p>

            {/* Check if media exists */}
            {post.media && (
              <div className={styles.mediaContainer}>
                <img src={post.media} alt="Post Media" className={styles.media} />
              </div>
            )}

            {/* Render other post details as needed */}
          </div>
        ))
      )}
    </div>
  );
}

export default Hidden;
