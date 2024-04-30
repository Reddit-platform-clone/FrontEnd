import { useEffect, useState } from 'react';
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { GoReply } from "react-icons/go";
import { LuShare } from "react-icons/lu";
import style from './Overview.module.css';
import axios from 'axios';
import { useAuth } from "../../HomePage/Components/AuthContext.js";

function Overview() {
  const { token } = useAuth();
  const [overviewData, setOverviewData] = useState([]);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

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
    const fetchOverviewData = async () => {
      try {
        if (username) {
          const response = await fetch(`http://localhost:5000/api/user/${username}/overview`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch overview data');
          }
          const data = await response.json();
          setOverviewData(data.posts || []); // Set empty array if data.posts is undefined
          setLoading(false); // Set loading state to false
          console.log('Overview data fetched successfully');
        }
      } catch (error) {
        console.error('Error fetching overview data:', error);
        setLoading(false); // Set loading state to false in case of error
      }
    };

    if (token && username) {
      fetchOverviewData();
    }
  }, [token, username]); // Fetch data whenever the token or username changes

  return (
    <div className={style.overviewpostcomment1}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        overviewData.map(post => (
          <div className={style.post} key={post.id}>
            <div className={style.postheader}>
              <img src={post.user.image} alt='User Avatar' className={style.logoup1} />
              <span className={style.username1}>{post.user.name}</span>
              <div className={style.posttime}>
                <span className={style.posttime}>{post.time} ago</span>
              </div>
            </div>
            <div className={style.postcontent}>
              <h3>{post.title}</h3>
              <p>{post.text}</p>
            </div>
            <div className={style.postactions}>
              <button><BiUpvote /> {post.likes}</button>
              <button><BiDownvote /> {post.comments}</button>
              <button><GoReply /> Reply</button>
              <button><LuShare /> Share</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Overview;
