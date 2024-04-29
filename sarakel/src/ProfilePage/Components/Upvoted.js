import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Upvoted() {
    const [upvotedPosts, setUpvotedPosts] = useState([]);
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1bmlvciIsImlhdCI6MTcxMzE5NDM2NH0.plXgIm8oPx5va2VtE1EuQHmHxjAA7G9Uxo0h5_inQoY";

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/v1/me', {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then(response => {
            const upvotedPostsData = response.data.user.upVotes;
            setUpvotedPosts(upvotedPostsData);
        })
        .catch(error => {
            console.error('Error fetching upvoted posts data:', error);
        });
    }, []); // Empty dependency array means this effect runs once after the component mounts

    return (
        <div>
            
            <ul>
                {upvotedPosts.map(post => (
                    <li key={post._id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}
