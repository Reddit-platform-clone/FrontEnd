import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Users.module.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1bmlvciIsImlhdCI6MTcxMzg1MzAxOX0.x3EN0N2FMiRvLZen6Ro1nuVc4JJYcU88XCYtI2N510g'; // Replace 'YOUR_AUTH_TOKEN' with your actual auth token
    const keyword = 'z'; // Replace 'z' with the actual keyword or get it from props

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.post('http://localhost:5000/searchBy/users', { keyword }, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                console.log('Response:', response.data); // Log the response data
                const userData = response.data;
                setUsers(userData.usersResults);
                setError(null); // Clear any previous errors
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Error fetching users. Please try again.'); // Set the error state
            }
        }

        fetchUsers();
    }, [authToken, keyword]);

    return (
        <div className={styles.UserSearchDataContainer}>
            {users.map((user, index) => (
                <Link key={index} to={`/user/${user.id}`} className={styles.UserSearchData}> {/* Link to user profile with user ID as parameter */}
                    <img src={user.profilePicture} alt='Profile' className={styles.UserAvatar} />
                    <div className={styles.UserDetails}>
                        <h3 className={styles.Username}>{user.username}</h3>
                        <h6 className={styles.Sarakelid}>{user.sarakelid}</h6>
                        <span className={styles.AboutMe}>{user.about}</span>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Users;
