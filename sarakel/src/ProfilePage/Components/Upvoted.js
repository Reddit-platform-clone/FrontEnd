import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../HomePage/Components/AuthContext.js";
import styles from './Upvoted.module.css';

function Upvoted() {
  const { token } = useAuth();
  const [upvotedData, setUpvotedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (token) {
      axios.get('http://127.0.0.1:5000/api/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUsername(response.data.user.username);
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
          const response = await axios.get(`http://localhost:5000/api/user/${username}/upvoted`, {
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
  }, [token, username]);

  return (
    <div className={styles.upvotedcontainer}>
      {loading ? (
        <p className={styles.loadingtext}>Loading...</p>
      ) : (
        <ul className={styles.upvotedlist}>
          {upvotedData.map((item, index) => (
            <li className={styles.upvoted-item} key={index}>
              {item[0] === "post" ? (
                <div>
                  <p className={styles.postauthor}> {item[1][0].username}</p>
                  <p className={styles.posttitle}> {item[1][0].title}</p>
                  <p className={styles.postcommunity}>Community: {item[1][0].communityId}</p>
                  {/* Add other relevant data for posts */}
                </div>
              ) : (
                <div>
                  {/* <p className={styles.commentid}>Comment ID: {item[1]._id}</p>
                  <p className={styles.commentauthor}>Author: {item[1].username}</p> */}
                  {/* Add other relevant data for comments */}
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
