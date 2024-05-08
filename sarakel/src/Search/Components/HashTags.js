import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './HashTags.module.css'; // Import CSS file
import { useAuth } from "../../HomePage/Components/AuthContext.js";

export default function HashTags() {
    const [hashtags, setHashtags] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:5000/searchBy/hashtags',
                    { keyword: searchTerm },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setHashtags(response.data.hashtagsResults);
                setError(null); // Clear any previous errors if successful
            } catch (error) {
                console.error('Error fetching hashtags:', error);
                setError('Error fetching hashtags');
            }
        };

        fetchData();
    }, [searchTerm, token]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value); // Update the search term state
    };

    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder="Search hashtags..."
                value={searchTerm}
                onChange={handleInputChange}
                className={styles.SearchInput}
            />
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.hashtagContainer}>
                {hashtags.map(hashtag => (
                    <div key={hashtag._id} className={styles.hashtag}>{hashtag.hashtagString}</div>
                ))}
            </div>
        </div>
    );
}
