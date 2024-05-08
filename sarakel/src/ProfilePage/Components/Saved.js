import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../HomePage/Components/AuthContext.js";
import styles from './Saved.module.css';
import { FaBookmark } from "react-icons/fa";

function Saved() {
  const { token } = useAuth();
  const [savedData, setSavedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await axios.get('http://localhost:5000/api/get_save', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data && response.data.message) {
            const posts = response.data.message
              .filter(([type]) => type === 'post') // Filter out only post data
              .flatMap(([, data]) => data) // Extract post data
              .flatMap(data => data); // Flatten the array

            setSavedData(posts);
            setLoading(false);
            console.log('Saved data fetched successfully:', posts);
          } else {
            setLoading(false);
            console.error('Error fetching saved data: Invalid response');
          }
        }
      } catch (error) {
        console.error('Error fetching saved data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const removeFromSaved = async (postId) => {
    try {
      
      const updatedSavedData = savedData.filter(post => post._id !== postId);
      setSavedData(updatedSavedData);
      alert('Post removed from saved successfully!');
    } catch (error) {
      console.error('Error removing post from saved:', error);
    }
  };

  return (
    <div className={styles.savedContainer}>
      {loading ? (
        <p className={styles.loadingText}>Loading...</p>
      ) : (
        <ul className={styles.savedList}>
          {savedData.length > 0 ? (
            savedData.map(post => (
              <li className={styles.savedItem} key={post._id}>
                <div className={styles.post}>
                  <button className={styles.removeButton} onClick={() => removeFromSaved(post._id)}><FaBookmark /></button>
                  <div className={styles.postUserInfo}>
                    {post.profilePicture ? (
                      <img src={post.profilePicture} alt='User Avatar' className={styles.userLogo} />
                    ) : (
                      <div className={styles.defaultUserLogo}></div>
                    )}
                    <p className={styles.username}>{post.username}</p>
                  </div>
                  <div className={styles.postContent}>
                    <p className={styles.postTitle}>{post.title}</p>
                    <p>{post.content}</p>
                    {/* Add media if available */}
                    {post.media && (
                      <div className={styles.mediaContainer}>
                        <img src={post.media} alt="Post Media" className={styles.media} />
                      </div>
                    )}
                    <p>Created at: {new Date(post.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className={styles.errorText1}>No saved posts found</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default Saved;
