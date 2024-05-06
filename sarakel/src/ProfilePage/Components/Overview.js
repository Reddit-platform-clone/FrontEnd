import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router
import { useAuth } from "../../HomePage/Components/AuthContext.js";
import style from './Overview.module.css';

function Overview() {
  const { token } = useAuth();
  const { username } = useParams(); // Get username from URL params
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch user data from the backend API
  useEffect(() => {
    if (token) {
      axios.get('http://127.0.0.1:5000/api/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUserData(response.data.user);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }, [token]);

  // Fetch overview data
  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        if (token) {
          const response = await axios.get(`http://localhost:5000/api/user/${username}/overview`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Overview data response:", response.data); // Log the response data
          setUserData(response.data); // Update to response.data
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching overview data:', error);
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, [token, username]); // Include username in dependency array

  return (
    <div className={style.container}>
      {loading ? (
        <p className={style.loading}>Loading...</p>
      ) : (
        <div className={style.userProfile}>
          <img src={userData.profilePicture} alt='User Avatar' className={style.avatar} />
          <h2>{userData.username}</h2>
          <p>{userData.about}</p>
          <div className={style.communities}>
            <h3>Communities Joined:</h3>
            <ul>
              {userData.communitiesJoined ? (
                userData.communitiesJoined.map((community, index) => (
                  <li key={index}>{community}</li>
                ))
              ) : (
                <li>No communities joined</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Overview;
