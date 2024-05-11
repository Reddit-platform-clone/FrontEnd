### Users Profile Page

```jsx
function UsersProfile() {
    const { username } = useParams(); // Access the username from URL params
    const [userData, setUserData] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [showList, setShowList] = useState(false);
    const [activeTab, setActiveTab] = useState(0);


    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/${username}/overview`);
                console.log('User Data:', response.data);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUserData();
    }, [username]);

    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
        if (!isFollowing) {
            alert(`You have followed ${username}`);
        } else {
            alert(`You have unfollowed ${username}`);
        }
    };

    const handleReport = () => {
        alert(`You have reported ${username}`);
    };
    const handleBlock = () => {
        alert(`You have blocked ${username}`);
    };

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

   

    return (
        <>
            <NavBar />
            <SideBar />
            <div className='user-data'>
                <img src={userData.profilePicture} alt='User Avatar' className={styles.logoup} />
                <span className={styles.username}>{username}</span>
            </div>

            <div className={styles.Contents}>
            
                    <a className={`nav-link ${activeTab === 0 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(0)}>
                        <span>Overview</span>
                    </a>
                    <a className={`nav-link ${activeTab === 1 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(1)}>
                        <span>Posts</span>
                    </a>
                    <a className={`nav-link ${activeTab === 2 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(2)}>
                        <span>Comments</span>
                    </a>
                
            </div>

            <div className={styles.overviewPostComment1}>
                    {activeTab === 0 && (
                        /* Render content for Overview tab */
                        <div>
                            <Overview username={username} />
                        </div>
                    )}
                    {activeTab === 1 && (
                        /* Render content for Posts tab */
                        <div>
                            <Posts username={username} />

                        </div>
                    )}
                    {activeTab === 2 && (
                        /* Render content for Comments tab */
                        <div>
                            <Comments username={username}/>
                        </div>
                    )}

                    </div>

            <div className={styles.containerUP}>
                <h6 className=''>{username}</h6>
                <div className={styles.buttoncontainer}>
                    <button className={`${styles.button123456} ${isFollowing ? styles.following : ''}`} onClick={toggleFollow}>
                        {isFollowing ? '- Unfollow' : '→ Follow'}
                    </button>
                    <Link to="/MessagesPage">
                        <button className={styles.button123456}>
                            Chat
                        </button>
                     </Link>
                    <div>
                        <button className={styles.button123456} onClick={() => setShowList(!showList)}>
                            {showList ? 'Close' : 'Options'}
                        </button>
                        {showList && (
                            <div>
                                <ul>
                                    <button className={styles.button123456}>Share</button><br/>
                                    <Link to="/MessagesPage">
                                            <button className={styles.button123456}>Send a message</button>

                                    </Link>
                                    <button className={styles.button123456} onClick={handleBlock}>Block account</button>
                                    <button className={styles.button123456} onClick={handleReport}>Report account</button>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <br/>
                
            </div>
        </>
    );
}


```

##### The component uses the useState hook to manage several state variables, including userData, isFollowing, showList, and activeTab.
##### userData stores information about the user being viewed.
##### isFollowing tracks whether the current user is following the viewed user.
##### showList controls the visibility of options for the viewed user.
##### activeTab keeps track of the active tab in the user's profile page.

##### The useEffect hook is utilized to fetch user data from the server when the component mounts or when the username (obtained from URL params) changes.
##### It sends a GET request to http://localhost:5000/api/user/${username}/overview to fetch user data.
##### Upon successful response, it updates the userData state with the retrieved user data.
##### If an error occurs during the fetch operation, it logs the error to the console.

##### The component renders various UI elements, including user avatar, username, navigation links for different tabs (Overview, Posts, Comments), and content based on the selected tab.
##### It conditionally renders different components (Overview, Posts, Comments) based on the active tab.
##### It includes buttons for actions like following/unfollowing, chatting, and displaying additional options (like sharing, sending a message, blocking, reporting).


### Users Profile Components 

#### 1-OverView
```jsx
function Overview({ username }) {
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/${username}/overview`);
                console.log('User Data:', response.data);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUserData();
    }, [username]);

    useEffect(() => {
        async function fetchUserPosts() {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/${username}/submitted`);
                console.log('User Posts Data:', response.data);
                setPosts(response.data.posts);
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
        }

        fetchUserPosts();
    }, [username]); // Fetch user posts whenever the username changes

    const handleUpvote = (postId) => {
        // Implement upvote functionality here
        console.log(`Upvoting post with ID ${postId}`);
    };

    const handleDownvote = (postId) => {
        // Implement downvote functionality here
        console.log(`Downvoting post with ID ${postId}`);
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={style.overviewPostComment1}>
            {posts.map(post => (
                <div className={style.post} key={post._id}>
                    <div className={style.postheader}>
                        <img src={userData.profilePicture} alt='User Avatar' className={style.logoup1} />
                        <span className={style.username2}>{userData.username}</span>
                        {post.scheduled && (
                            <div className={style.posttime}>
                                <span className={style.posttime}>{formatTime(post.scheduled.time)}</span>
                            </div>
                        )}
                    </div>
                    <div className={style.postcontent}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        {post.media && ( 
                            <div className={style.postMedia}>
                                <img src={post.media} alt="Media" />
                            </div>
                        )}
                    </div>
                    <div className={style.postactions}>
                        <button onClick={() => handleUpvote(post._id)}><BiUpvote /> {post.upvotes}</button>
                        <button onClick={() => handleDownvote(post._id)}><BiDownvote /> {post.downvotes}</button>
                        <button><GoReply /> Reply</button>
                        <button><LuShare /> Share</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

```

##### It uses the useState hook to manage two state variables: posts and userData.
##### posts state holds an array of post data submitted by the user.
##### userData state holds information about the user whose posts are being displayed.

##### Two useEffect hooks are utilized to fetch user data and user posts when the component mounts or when the username (passed as a prop) changes.
##### The first useEffect fetches user data from the server by sending a GET request to http://localhost:5000/api/user/${username}/overview.
##### The second useEffect fetches user posts from the server by sending a GET request to http://localhost:5000/api/user/${username}/submitted.
##### Both hooks update the respective state variables (userData and posts) with the retrieved 

##### The component maps through the posts array and renders individual post components.
##### Each post is displayed with its title, content, media (if available), and action buttons for upvoting, downvoting, replying, and sharing.


#### 2-Posts

```jsx
function Posts({ username }) {
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/${username}/overview`);
                console.log('User Data:', response.data);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUserData();
    }, [username]);

    useEffect(() => {
        async function fetchUserPosts() {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/${username}/submitted`);
                console.log('User Posts Data:', response.data);
                setPosts(response.data.posts);
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
        }

        fetchUserPosts();
    }, [username]); // Fetch user posts whenever the username changes

    const handleUpvote = (postId) => {
        // Implement upvote functionality here
        console.log(`Upvoting post with ID ${postId}`);
    };

    const handleDownvote = (postId) => {
        // Implement downvote functionality here
        console.log(`Downvoting post with ID ${postId}`);
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={style.overviewPostComment1}>
            {posts.map(post => (
                <div className={style.post} key={post._id}>
                    <div className={style.postheader}>
                        <img src={userData.profilePicture} alt='User Avatar' className={style.logoup1} />
                        <span className={style.username2}>{userData.username}</span>
                        {post.scheduled && (
                            <div className={style.posttime}>
                                <span className={style.posttime}>{formatTime(post.scheduled.time)}</span>
                            </div>
                        )}
                    </div>
                    <div className={style.postcontent}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        {post.media && ( // Check if media exists and render it
                            <div className={style.postMedia}>
                                <img src={post.media} alt="Media" />
                            </div>
                        )}
                    </div>
                    <div className={style.postactions}>
                        <button onClick={() => handleUpvote(post._id)}><BiUpvote /> {post.upvotes}</button>
                        <button onClick={() => handleDownvote(post._id)}><BiDownvote /> {post.downvotes}</button>
                        <button><GoReply /> Reply</button>
                        <button><LuShare /> Share</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

```

##### It uses the useState hook to manage two state variables: posts and userData.
##### posts state holds an array of post data submitted by the user.
##### userData state holds information about the user whose posts are being displayed.

##### Two useEffect hooks are utilized to fetch user data and user posts when the component mounts or when the username (passed as a prop) changes.
##### The first useEffect fetches user data from the server by sending a GET request to http://localhost:5000/api/user/${username}/overview.
##### The second useEffect fetches user posts from the server by sending a GET request to http://localhost:5000/api/user/${username}/submitted.
##### Both hooks update the respective state variables (userData and posts) with the retrieved 

##### The component maps through the posts array and renders individual post components.
##### Each post is displayed with its title, content, media (if available), and action buttons for upvoting, downvoting, replying, and sharing.

#### 3-Comments

```jsx
function Comments({ username }) {
    const [comments, setComments] = useState([]);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/${username}/overview`);
                console.log('User Data:', response.data);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUserData();
    }, [username]);

    useEffect(() => {
        async function fetchUserComments() {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/${username}/comments`);
                console.log('User Comments Data:', response.data);
                setComments(response.data.userComments);
            } catch (error) {
                console.error('Error fetching user comments:', error);
            }
        }

        fetchUserComments();
    }, [username]); // Fetch user comments whenever the username changes

    const handleUpvote = (commentId) => {
        // Implement upvote functionality here
        console.log(`Upvoting comment with ID ${commentId}`);
    };

    const handleDownvote = (commentId) => {
        // Implement downvote functionality here
        console.log(`Downvoting comment with ID ${commentId}`);
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={style.commentsContainer}>
            {comments.map(comment => (
                <div className={style.comment} key={comment._id}>
                    <div className={style.commentHeader}>
                        <img src={userData.profilePicture} alt='User Avatar' className={style.commentUserAvatar} />
                        <span className={style.commentUsername}>{userData.username}</span>
                        <div className={style.commentDateTime}>
                            <span className={style.commentDateTimeText}>{formatTime(comment.dateTime)}</span>
                        </div>
                    </div>
                    <div className={style.commentContent}>
                        <p>{comment.content}</p>
                    </div>
                    <div className={style.commentActions}>
                        <button onClick={() => handleUpvote(comment._id)}><BiUpvote /> {comment.upvote}</button>
                        <button onClick={() => handleDownvote(comment._id)}><BiDownvote /> {comment.downvote}</button>
                        <button><GoReply /> Reply</button>
                        <button><LuShare /> Share</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

```
##### It uses the useState hook to manage two state variables: comments and userData.
##### comments state holds an array of comment data made by the user.
##### userData state holds information about the user whose comments are being displayed.

##### Two useEffect hooks are utilized to fetch user data and user comments when the component mounts or when the username (passed as a prop) changes.
##### The first useEffect fetches user data from the server by sending a GET request to http://localhost:5000/api/user/${username}/overview.
##### The second useEffect fetches user comments from the server by sending a GET request to http://localhost:5000/api/user/${username}/comments.
##### Both hooks update the respective state variables (userData and comments) with the retrieved data.

##### The component maps through the comments array and renders individual comment components.
##### Each comment is displayed with its content, the username of the commenter, the comment's timestamp, and action buttons for upvoting, downvoting, replying, and sharing.

##### If userData is null (indicating that user data is being fetched), it renders a "Loading..." message.
##### Once userData is available, it renders the user's comments.

