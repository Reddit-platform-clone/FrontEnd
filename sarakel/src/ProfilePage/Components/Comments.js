import { useEffect, useState } from 'react';
import axios from 'axios';
import style from './Comments2.module.css';
import { useAuth } from '../../HomePage/Components/AuthContext.js';
import { BiUpvote, BiDownvote } from "react-icons/bi";

export default function Comments() {
    const { token } = useAuth();
    const [username, setUsername] = useState(null);
    const [userLogo, setUserLogo] = useState(null);
    const [comments, setComments] = useState([]);
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
                setUserLogo(response.data.user.profilePicture);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                setLoading(false);
            });
        }
    }, [token]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                if (username) {
                    const response = await axios.get(`http://57.151.116.81:5000/api/user/${username}/comments`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (!response.data.userComments) {
                        throw new Error('Failed to fetch comments data');
                    }
                    setComments(response.data.userComments);
                    setLoading(false);
                    console.log('Comments data fetched successfully');
                }
            } catch (error) {
                console.error('Error fetching comments data:', error);
                setLoading(false);
            }
        };

        if (token && username) {
            fetchComments();
        }
    }, [token, username]);

    return (
        <div className={style.commentscontainer1}>
            {/* Display comments */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                comments.map(comment => (
                    <div className={style.comment1233} key={comment._id}>
                        {/* Render each comment */}
                        <div className={style.commentheader11}>
                            {/* Display user logo and username */}
                            <div className={style.userinfo}>
                                <img className={style.userLogo} src={userLogo} alt="User Logo" />
                                <span className={style.username}>{username}</span>
                            </div>
                            {/* Display spoiler status */}
                            {comment.isSpoiler && (
                                <span className={style.spoiler}>Spoiler</span>
                            )}
                        </div>
                        <div className={style.commentcontent12}>
                            <p>{comment.content}</p>
                        </div>
                        {/* Display upvotes */}
                        <div className={style.votes}>
                            <span className={style.upvotes}>
                                <BiUpvote />
                                {comment.upvote}
                            </span>
                            {/* Display downvotes */}
                            <span className={style.downvotes}>
                                <BiDownvote />
                                {comment.downVote}
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
