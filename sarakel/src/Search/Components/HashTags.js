import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './HashTags.module.css'; // Import CSS file

export default function HashTags() {
    const [hashtags, setHashtags] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1bmlvciIsImlhdCI6MTcxMzE5NDM2NH0.plXgIm8oPx5va2VtE1EuQHmHxjAA7G9Uxo0h5_inQoY";

            try {
                const response = await axios.post(
                    'http://57.151.116.81:5000/searchBy/hashtags',
                    { keyword: '!' }, // Replace '!' with your desired keyword
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    }
                );
                setHashtags(response.data.hashtagsResults);
            } catch (error) {
                console.error('Error fetching hashtags:', error);
                setError('Error fetching hashtags');
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Hashtags</h1>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.hashtagContainer}>
                {hashtags.map(hashtag => (
                    <div key={hashtag._id} className={styles.hashtag}>{hashtag.hashtagString}</div>
                ))}
            </div>
        </div>
    );
}
