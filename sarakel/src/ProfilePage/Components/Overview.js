import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './Overview.module.css';
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { useAuth } from "../../HomePage/Components/AuthContext.js";

function Overview() {
  const { token } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
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
    const fetchUserPosts = async () => {
      try {
        if (username) {
          const response = await axios.get(`http://57.151.116.81:5000/api/user/${username}/submitted`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserPosts(response.data.posts);
          setLoading(false);
          console.log('User posts fetched successfully');
          console.log('User posts:', response.data.posts); // Log user posts
        }
      } catch (error) {
        console.error('Error fetching user posts:', error);
        setLoading(false);
      }
    };

    if (username) {
      fetchUserPosts();
    }
  }, [token, username]);

  return (
    <div className={style.overviewPostComment1}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        userPosts.map(post => {
          console.log('Post media:', post.media); 
          return (
            <div className={style.post} key={post._id}>
              <div className={style.postUserInfo}>
                <img className={style.userLogo} src={userLogo} alt="User Logo" />
                <p className={style.username}>{username}</p>
              </div>
              <h3 className={style.postTitle}>{post.title}</h3>
              <p className={style.postContent}>{post.content}</p>

              {post.media && (
                <div className={style.mediaContainer}>
                  <img src={post.media} alt="Post Media" className={style.media} />
                </div>
              )}

              <div className={style.postActions}>
                <p><BiUpvote/> {post.upvotes}</p>
                <p><BiDownvote/> {post.downvotes}</p>
                <p><FaComment/> {post.commentCount}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Overview;
