import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../HomePage/Components/AuthContext.js";
import styles from './Upvoted.module.css';

function Upvoted() {
  const { token } = useAuth();
  const [upvotedData, setUpvotedData] = useState([]);
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
    const fetchUpvotedData = async () => {
      try {
        if (username) {
          const response = await axios.get(`http://57.151.116.81:5000/api/user/${username}/upvoted`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          setUpvotedData(response.data.upvotes);
          setLoading(false);
          console.log('Upvoted data fetched successfully');
        }
      } catch (error) {
        console.error('Error fetching upvoted data:', error);
        setLoading(false);
      }
    };

    if (token && username) {
      fetchUpvotedData();
    }
  }, [token, username]); // Add username to the dependency array

  return (
    <div className={styles.upvotedcontainer}>
      {loading ? (
        <p className={styles.loadingtext}>Loading...</p>
      ) : (
        <ul className={styles.upvotedlist}>
          {upvotedData.map((item, index) => (
            <li className={styles.upvoteditem} key={index}>
              {item[0] === "post" ? (
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
                    <p className={styles.postTitle}> {item[1][0].title}</p>
                    <p className={styles.postContentText}>{item[1][0].content}</p>
                    
                    {/* Add media if available */}
                    {item[1][0].media && (
                      <div className={styles.mediaContainer}>
                        <img src={item[1][0].media} alt="Post Media" className={styles.media} />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className={styles.commentcontainer}>
                  {/* Add comments */}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Upvoted;
