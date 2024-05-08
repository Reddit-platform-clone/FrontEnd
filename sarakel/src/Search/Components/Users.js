// Users.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Users.module.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const keyword = 'z'; // Replace 'z' with the actual keyword or get it from props

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.post('http://57.151.116.81:5000/searchBy/users', { keyword });
                console.log('Response:', response.data); // Log the response data
                const userData = response.data;
                setUsers(userData.userSuggestions); // Update to userSuggestions
                setError(null); // Clear any previous errors
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Error fetching users. Please try again.'); // Set the error state
            }
        }

        fetchUsers();
    }, [keyword]);

    return (
        <div className={styles.UserSearchDataContainer}>
            {users.map((user, index) => (
                <Link key={index} to={`/user/${user.username}/overview`} className={styles.UserSearchData}> {/* Link to user profile with username as parameter */}
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
