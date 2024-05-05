import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../HomePage/Components/AuthContext.js";
import styles from './Downvoted.module.css';

function Downvoted() {
  const { token } = useAuth();
  const [downvotedData, setDownvotedData] = useState([]);
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
      });
    }
  }, [token]);
  
  useEffect(() => {
    const fetchDownvotedData = async () => {
      try {
        if (username) {
          const response = await axios.get(`http://localhost:5000/api/user/${username}/downvoted`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          setDownvotedData(response.data.upvotes);
          setLoading(false);
          console.log('Downvoted data fetched successfully');
        }
      } catch (error) {
        console.error('Error fetching downvoted data:', error);
        setLoading(false);
      }
    };

    if (token && username) {
      fetchDownvotedData();
    }
  }, [token, username]); // Add username to the dependency array

  return (
    <div className={styles.downvotedcontainer}>
      {loading ? (
        <p className={styles.loadingtext}>Loading...</p>
      ) : (
        <ul className={styles.downvotedlist}>
          {downvotedData.map((item, index) => (
            <li className={styles.downvoteditem} key={index}>
              {item[0] === "post" && (
                <div className={styles.postcontainer}>
                  {userLogo && <img src={userLogo} alt="User Logo" className={styles.userLogo} />}
                  <div className={styles.authorContainer}>
                    <div>
                      {/* Use username from state */}
                      <p className={styles.postauthor}>{username}</p>
                      <p className={styles.postcommunity}>Community: {item[1][0].communityId}</p>
                    </div>
                  </div>
                  <div className={styles.postContent}>
                    <p>Title:</p>
                    <p className={styles.postTitle}>{item[1][0].title}</p>
                    <p className={styles.postContentText}>{item[1][0].content}</p>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Downvoted;
