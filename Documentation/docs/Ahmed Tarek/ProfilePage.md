# Profile Page
#### it's the page where if the logged in user want to view his profile page he go to it

### Toggle
```jsx
const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
        };

```
##### activeTab: Keeps track of the currently active tab index.
##### handleTabClick : It's used to appear the content only of the active tab

### Connecting with backend
```jsx
    const { token } = useAuth(); 
    useEffect(() => {
        if (token) {
            // Fetch user data from the backend API
            axios.get('http://127.0.0.1:5000/api/v1/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    // Set the userData state with the received user data
                    setUserData(response.data.user);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [token]);

```

#### we use this to get the token of the logged in user then from backend api we get the user personal prodile data to view on the profile page

### front end code
```jsx
 <div className={style.profileContainer}>

                <div className={style.usernameContainer}>
                    {userData && (
                        <>
                            <img src={userData.profilePicture} alt="Profile Picture" className={style.profilePicture} />
                            <h2 className={`${style.username} text-lg font-bold`}>{userData.username}</h2>

                        </>
                    )}
                </div>


                {/* Navigation links */}
                <div className={style.Contents1}>
                    <a className={`nav-link ${activeTab === 0 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(0)}>
                        <span>Overview</span>
                    </a>
                    <a className={`nav-link ${activeTab === 1 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(1)}>
                        <span>Posts</span>
                    </a>
                    <a className={`nav-link ${activeTab === 2 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(2)}>
                        <span>Comments</span>
                    </a>
                    <a className={`nav-link ${activeTab === 3 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(3)}>
                        <span>Saved</span>
                    </a>
                    <a className={`nav-link ${activeTab === 4 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(4)}>
                        <span>Hidden</span>
                    </a>
                    <a className={`nav-link ${activeTab === 5 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(5)}>
                        <span>Upvoted</span>
                    </a>
                    <a className={`nav-link ${activeTab === 6 ? 'active' : ''}`} href='#' onClick={() => handleTabClick(6)}>
                        <span>Downvoted</span>
                    </a>

                    <Link to="/CreatePost" className='nav-link'>
                        <span>+ Create Post</span>
                    </Link>

                </div>



                
                <div className={style.overviewPostComment1}>
                    {activeTab === 0 && (
                        /* Render content for Overview tab */
                        <div>
                            <Overview />
                        </div>
                    )}
                    {activeTab === 1 && (
                        /* Render content for Posts tab */
                        <div>
                            <Posts />

                        </div>
                    )}
                    {activeTab === 2 && (
                        /* Render content for Comments tab */
                        <div>
                            <Comments />
                        </div>
                    )}
                    {activeTab === 3 && (
                        /* Render content for Saved tab */
                        <div>
                            <Saved />
                        </div>
                    )}
                    {activeTab === 4 && (
                        /* Render content for Saved tab */
                        <div>
                            <Hidden />
                        </div>
                    )}
                    {activeTab === 5 && (
                        /* Render content for Saved tab */
                        <div>
                            <Upvoted />
                        </div>
                    )}
                    {activeTab === 6 && (
                        /* Render content for Saved tab */
                        <div>
                            <Downvoted />
                        </div>
                    )}
                </div>


```
##### Profile Header Section (top-section): This section contains content related to the user's profile header, such as their avatar, username, about, and other profile-specific information. However, the specific content is not provided in the code snippet.

##### content 1  section contains navigation links for different tabs representing various sections of the user's profile. Each link (nav-link) corresponds to a specific tab, such as "Overview," "Posts," "Comments," etc. The activeTab state variable is used to determine which tab is currently active, and the handleTabClick function is called when a tab is clicked to update the active tab. Additionally, there is a link for creating a new post (+ Create Post) then at the end the created post button is hooked with link so on the action of clicking on it it goes to the create post page


##### overviewPostComment1 in this div we render between differnet tabs of of profile page(overview,posts,comments,upvoted,downvoted,saved,hidden) and each on of them is connected to the personal user data 


```jsx
<div className={style.rightsidecontainer}>
                    {/* Other content */}
                    <div className={style.rightside}>
                        {/* Content of right side */}
                        <div className="flex items-center justify-between">
                            <div className={style.backgroundimage}>
                                {userData && (
                                    <>
                                        <img src={userData.profilePicture} alt="Profile Picture" className={style.backgroundimage} />
                                        {/* <h2 className={`${style.username} text-lg font-bold`}>{userData.username}</h2> */}
                                    </>
                                )}

                            </div>

                            <Link to="/Settings">
                                <button className={style.addbannerbtn}>
                                    <CgAddR className={style.usersettings} />
                                </button>
                            </Link>
                            <br />

                            <div className={style.usernamecontainer}>
                                {/* Background image */}

                                {/* Username */}
                                <h2 className="text-lg font-bold">{userData && userData.username}</h2><br />
                            </div>

                            <div className={style.aboutme}>
                                {
                                    userData && (
                                        <>
                                            <h4 className={style.aboutme}>{userData.about}</h4>

                                        </>
                                    )
                                }
                            </div>
                            <button className={style.sharebtn}>
                                <span className="flex mr-xs">
                                    <svg fill="currentColor" height="16" icon-name="share-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.942 7.058 12.8.912l-.883.883 5.079 5.08h-2.871A13.189 13.189 0 0 0 1.067 18h1.267a11.94 11.94 0 0 1 11.791-9.875h2.866l-5.079 5.08.883.883 6.147-6.146a.624.624 0 0 0 0-.884Z"></path>
                                    </svg>
                                </span>
                                Share
                            </button>

                        </div>
                        <hr />

                        <div className="mt-6">
                            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Settings</h3>
                            <div className={style.Settingsbutton}>
                                <div className={style.editprofile}>
                                    <img src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_2.png" alt="u/ahmet77mostafa avatar" width="24" height="24" loading="eager" />

                                    <div className={style.profileinfo}>
                                        <span className={style.boldtext}>Profile</span>
                                        <span className={style.description11}>Customize your profile</span>
                                    </div>
                                    <button className={style.editprofilebtn}>
                                        <Link to="/settings">
                                            <span className={style.editprofilew}>Edit Profile</span>
                                        </Link>
                                    </button>
                                </div>

                                <div className={style.modsettings}>
                                    <img src="data:image/svg+xml,%3Csvg%20fill%3D%22currentColor%22%20height%3D%2220%22%20icon-name%3D%22mod-outline%22%20viewBox%3D%220%200%2020%2020%22%20width%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M10%2020c-.101%200-.202-.014-.3-.04C8.249%2019.554%201%2017.277%201%2012V3.187A1.122%201.122%200%200%201%201.846%202.1L9.73.108c.177-.044.363-.044.54%200L18.154%202.1A1.122%201.122%200%200%201%2019%203.187V12c0%205.277-7.249%207.554-8.7%207.957A1.162%201.162%200%200%201%2010%2020ZM2.25%203.283V12c0%204.465%206.989%206.531%207.786%206.751.725-.22%207.714-2.286%207.714-6.751V3.283L10%201.33%202.25%203.283Z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E" alt="mod" width="20" height="20"></img>

                                    <div className={style.modinfo}>
                                        <span className={style.boldtext}>Moderation</span>
                                        <span className={style.description11}>Moderation Tools</span>
                                    </div>
                                    <button className={style.modsettingsbtn}>
                                        <Link to="/Moderation">
                                            <span className={style.modsettxt}>Mod settings</span>
                                        </Link>

                                    </button>

                                </div>

                            </div>
                        </div>
                        <hr />

                        <div className={style.Sociallink}>
                            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Links</h3>
                            <button className={style.Sociallink} style={{ display: 'flex', alignItems: 'center' }}>
                                <img src="data:image/svg+xml,%3Csvg%20fill='currentColor'%20height='12'%20icon-name='add-fill'%20viewBox='0%200%2020%2020'%20width='12'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20d='M19%209h-8V1H9v8H1v2h8v8h2v-8h8V9Z'%3E%3C/path%3E%3C/svg%3E" alt="Add Icon" width="12" height="12"></img>
                                <span style={{ marginLeft: '4px' }}>Add Social Link</span>
                            </button>
                        </div>



                    </div>
                </div>
```

##### Right Side Container (right-side-container): This container  holds various content related to the user's profile settings and options.

##### Within this content, there are sections for profile information, such as the user's background image, username, and buttons for adding banners and sharing content.



##### This section includes buttons for moderation settings and on click on it it goes to mod page
 
##### there is a button for adding social links. This button allows users to add additional links to their profile.



## Components of Profile Page

#### Overview
```jsx
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
          const response = await axios.get(`http://localhost:5000/api/user/${username}/submitted`, {
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

```
##### The component initializes several state variables using the useState hook: userPosts, loading, username, and userLogo. These states will be used to manage user data and loading state within the component.

##### The first useEffect hook runs when the token changes. It sends a GET request to fetch user data (username and profile picture) from the server using Axios. If successful, it updates the username and userLogo states with the received data. If there's an error, it logs the error and sets loading to false.

##### The second useEffect hook runs when token or username changes. It sends a GET request to fetch user-specific posts from the server using Axios. It includes the username in the request URL obtained from the state. If successful, it updates the userPosts state with the received data and sets loading to false. If there's an error, it logs the error and sets loading to false.

##### The return statement renders JSX based on the loading state. If loading is true, it displays a loading message. Otherwise, it maps through userPosts and renders each post's information. Each post is rendered within a div with the class style.post. It displays the user's logo, username, post title, content, media (if available), and post actions (upvotes, downvotes, and comment count). The media, if available, is displayed as an image. Post actions are displayed with icons (e.g., upvote, downvote, comment count), which are imported from external libraries (e.g., BiUpvote, BiDownvote, FaComment).

#### Posts
```jsx
function Posts() {
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
          const response = await axios.get(`http://localhost:5000/api/user/${username}/submitted`, {
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

```

##### The component initializes several state variables using the useState hook: userPosts, loading, username, and userLogo. These states will be used to manage user data and loading state within the component.

##### The first useEffect hook runs when the token changes. It sends a GET request to fetch user data (username and profile picture) from the server using Axios. If successful, it updates the username and userLogo states with the received data. If there's an error, it logs the error and sets loading to false.

##### The second useEffect hook runs when token or username changes. It sends a GET request to fetch user-specific posts from the server using Axios. It includes the username in the request URL obtained from the state. If successful, it updates the userPosts state with the received data and sets loading to false. If there's an error, it logs the error and sets loading to false.

##### The return statement renders JSX based on the loading state. If loading is true, it displays a loading message. Otherwise, it maps through userPosts and renders each post's information. Each post is rendered within a div with the class style.post. It displays the user's logo, username, post title, content, media (if available), and post actions (upvotes, downvotes, and comment count). The media, if available, is displayed as an image. Post actions are displayed with icons (e.g., upvote, downvote, comment count), which are imported from external libraries (e.g., BiUpvote, BiDownvote, FaComment).

#### Comments
```jsx
function Comments() {
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
                    const response = await axios.get(`http://localhost:5000/api/user/${username}/comments`, {
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

```
##### The component initializes state variables using the useState hook: username, userLogo, comments, and loading.

##### The first useEffect hook runs when the token changes. It sends a GET request to fetch user data (username and profile picture) from the server using Axios. If successful, it updates the username and userLogo states with the received data. If there's an error, it logs the error and sets loading to false.

##### The second useEffect hook runs when token or username changes. It sends a GET request to fetch user comments from the server using Axios. If successful, it updates the comments state with the received data and sets loading to false. If there's an error, it logs the error and sets loading to false.

##### The return statement renders JSX based on the loading state. If loading is true, it displays a loading message. Otherwise, it maps through comments and renders each comment's information. Each comment is rendered within a div with the class style.comment1233. It displays the user's logo, username, comment content, spoiler status (if it's a spoiler), and upvotes/downvotes. Spoiler status is displayed if comment.isSpoiler is true. Upvotes and downvotes are displayed with corresponding icons and counts.

#### Upvotes
```jsx
function Upvoted() {
  const { token } = useAuth();
  const [upvotedData, setUpvotedData] = useState([]);
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
      });
    }
  }, [token]);
  
  useEffect(() => {
    const fetchUpvotedData = async () => {
      try {
        if (username) {
          const response = await axios.get(`http://localhost:5000/api/user/${username}/upvoted`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          setUpvotedData(response.data.upvotes);
          setLoading(false);
          console.log('Upvoted data fetched successfully');
        }
      } catch (error) {
        console.error('Error fetching upvoted data:', error);
        setLoading(false);
      }
    };

    if (token && username) {
      fetchUpvotedData();
    }
  }, [token, username]); // Add username to the dependency array

  return (
    <div className={styles.upvotedcontainer}>
      {loading ? (
        <p className={styles.loadingtext}>Loading...</p>
      ) : (
        <ul className={styles.upvotedlist}>
          {upvotedData.map((item, index) => (
            <li className={styles.upvoteditem} key={index}>
              {item[0] === "post" ? (
                <div className={styles.postcontainer}>
                  {userLogo && <img src={userLogo} alt="User Logo" className={styles.userLogo} />}
                  <div className={styles.authorContainer}>
                    <div>
                      {/* Use username from state */}
                      <p className={styles.postauthor}>{username}</p>
                      <p className={styles.postcommunity}>Community: {item[1][0].communityId}</p>
                    </div>
                  </div>
                  <div className={styles.postContent}>
                    <p>Title:</p>
                    <p className={styles.postTitle}> {item[1][0].title}</p>
                    <p className={styles.postContentText}>{item[1][0].content}</p>
                    
                    {/* Add media if available */}
                    {item[1][0].media && (
                      <div className={styles.mediaContainer}>
                        <img src={item[1][0].media} alt="Post Media" className={styles.media} />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className={styles.commentcontainer}>
                  {/* Add comments */}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

```

##### The component initializes state variables using the useState hook: upvotedData, loading, username, and userLogo

##### The first useEffect hook runs when the token changes. It sends a GET request to fetch user data (username and profile picture) from the server using Axios. If successful, it updates the username and userLogo states with the received data. If there's an error, it logs the error.

##### The second useEffect hook runs when token or username changes. It sends a GET request to fetch data related to the posts or comments that the user has upvoted from the server using Axios. If successful, it updates the upvotedData state with the received data and sets loading to false. If there's an error, it logs the error and sets loading to false.

##### Each item is rendered based on whether it's a post or a comment. If it's a post that the user has upvoted , it displays information about the post including the user's logo, username, post title, content, and media (if available). 

#### Downvotes 
```jsx
function Downvoted() {
  const { token } = useAuth();
  const [downvotedData, setDownvotedData] = useState([]);
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
      });
    }
  }, [token]);
  
  useEffect(() => {
    const fetchDownvotedData = async () => {
      try {
        if (username) {
          const response = await axios.get(`http://localhost:5000/api/user/${username}/downvoted`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          setDownvotedData(response.data.upvotes);
          setLoading(false);
          console.log('Downvoted data fetched successfully');
        }
      } catch (error) {
        console.error('Error fetching downvoted data:', error);
        setLoading(false);
      }
    };

    if (token && username) {
      fetchDownvotedData();
    }
  }, [token, username]); // Add username to the dependency array

  return (
    <div className={styles.downvotedcontainer}>
      {loading ? (
        <p className={styles.loadingtext}>Loading...</p>
      ) : (
        <ul className={styles.downvotedlist}>
          {downvotedData.map((item, index) => (
            <li className={styles.downvoteditem} key={index}>
              {item[0] === "post" && (
                <div className={styles.postcontainer}>
                  {userLogo && <img src={userLogo} alt="User Logo" className={styles.userLogo} />}
                  <div className={styles.authorContainer}>
                    <div>
                      {/* Use username from state */}
                      <p className={styles.postauthor}>{username}</p>
                      <p className={styles.postcommunity}>Community: {item[1][0].communityId}</p>
                    </div>
                  </div>
                  <div className={styles.postContent}>
                    <p>Title:</p>
                    <p className={styles.postTitle}>{item[1][0].title}</p>
                    <p className={styles.postContentText}>{item[1][0].content}</p>
                    
                    {/* Add media if available */}
                    {item[1][0].media && (
                      <div className={styles.mediaContainer}>
                        <img src={item[1][0].media} alt="Post Media" className={styles.media} />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

```
##### The component initializes state variables using the useState hook: downvotedData, loading, username, and userLogo.

##### The first useEffect hook runs when the token changes. It sends a GET request to fetch user data (username and profile picture) from the server using Axios. If successful, it updates the username and userLogo states with the received data. If there's an error, it logs the error.

##### The second useEffect hook runs when token or username changes. It sends a GET request to fetch data related to the posts or comments that the user has downvoted from the server using Axios. If successful, it updates the downvotedData state with the received data and sets loading to false. If there's an error, it logs the error and sets loading to false.

##### The return statement renders JSX based on the loading state. If loading is true, it displays a loading message. Otherwise, it maps through downvotedData and renders each item.Each item is rendered based on whether it's a post or a comment that has been downvoted. it displays information about the post including the user's logo, username, post title, content, and media (if available). 


#### Saved 
```jsx
function Saved() {
  const { token } = useAuth();
  const [savedData, setSavedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await axios.get('http://localhost:5000/api/get_save', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data && response.data.message) {
            const posts = response.data.message
              .filter(([type]) => type === 'post') // Filter out only post data
              .flatMap(([, data]) => data) // Extract post data
              .flatMap(data => data); // Flatten the array

            setSavedData(posts);
            setLoading(false);
            console.log('Saved data fetched successfully:', posts);
          } else {
            setLoading(false);
            console.error('Error fetching saved data: Invalid response');
          }
        }
      } catch (error) {
        console.error('Error fetching saved data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const removeFromSaved = async (postId) => {
    try {
      
      const updatedSavedData = savedData.filter(post => post._id !== postId);
      setSavedData(updatedSavedData);
      alert('Post removed from saved successfully!');
    } catch (error) {
      console.error('Error removing post from saved:', error);
    }
  };

  return (
    <div className={styles.savedContainer}>
      {loading ? (
        <p className={styles.loadingText}>Loading...</p>
      ) : (
        <ul className={styles.savedList}>
          {savedData.length > 0 ? (
            savedData.map(post => (
              <li className={styles.savedItem} key={post._id}>
                <div className={styles.post}>
                  <button className={styles.removeButton} onClick={() => removeFromSaved(post._id)}><FaBookmark /></button>
                  <div className={styles.postUserInfo}>
                    {post.profilePicture ? (
                      <img src={post.profilePicture} alt='User Avatar' className={styles.userLogo} />
                    ) : (
                      <div className={styles.defaultUserLogo}></div>
                    )}
                    <p className={styles.username}>{post.username}</p>
                  </div>
                  <div className={styles.postContent}>
                    <p className={styles.postTitle}>{post.title}</p>
                    <p>{post.content}</p>
                    {/* Add media if available */}
                    {post.media && (
                      <div className={styles.mediaContainer}>
                        <img src={post.media} alt="Post Media" className={styles.media} />
                      </div>
                    )}
                    <p>Created at: {new Date(post.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className={styles.errorText1}>No saved posts found</p>
          )}
        </ul>
      )}
    </div>
  );
}

```

##### The useEffect hook runs once when the component mounts or when the token changes. It sends a GET request to fetch saved data from the server using Axios. If successful, it filters out and flattens the post data from the response, updates the savedData state, and sets loading to false. If there's an error or an invalid response, it logs the error and sets loading to false.

##### removeFromSaved is a function defined within the component to handle the removal of a post from the saved list. It filters out the post with the given postId from the savedData state and updates the state accordingly.

##### The return statement renders JSX based on the loading state. If loading is true, it displays a loading message. Otherwise, it maps through the savedData array and renders each saved post. Each saved post is rendered within a div with appropriate styling. It includes the post's title, content, creation date, and an option to remove it from saved. If media is available, it's displayed as well. If there are no saved posts it sdisplays amessage that it's no saved posts found

#### Hidden
```jsx
function Hidden() {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
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
    const fetchHiddenPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/get_hide', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data.message.filter(([type]) => type === 'post').flatMap(([, data]) => data[0]));
        setLoading(false);
        console.log('Hidden posts fetched successfully');
      } catch (error) {
        console.error('Error fetching hidden posts:', error);
        setLoading(false);
      }
    };

    if (username) {
      fetchHiddenPosts();
    }
  }, [token, username]);

  const removeFromHidden = async (postId) => {
    try {
      // Call API to remove the post from hidden
      // Here, you need to implement your API endpoint to remove the post from hidden
      // After successfully removing the post, update the state to reflect the change
      const updatedPosts = posts.filter(post => post._id !== postId);
      setPosts(updatedPosts);
      alert('Post removed from hidden successfully!');
    } catch (error) {
      console.error('Error removing post from hidden:', error);
    }
  };

  return (
    <div className={styles.hiddenContainer}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map(post => (
          <div className={styles.post} key={post._id}>
             <div className={styles.bookmarkContainer}>
              <FaBookmark className={styles.bookmarkIcon} onClick={() => removeFromHidden(post._id)} />
            </div>
            <div className={styles.postUserInfo}>
              <img className={styles.userLogo} src={userLogo} alt="User Logo" />
              <p className={styles.username}>{username}</p>
            </div>
            <h3 className={styles.postTitle}>{post.title}</h3>
            <p className={styles.postContent}>{post.content}</p>

            {/* Check if media exists */}
            {post.media && (
              <div className={styles.mediaContainer}>
                <img src={post.media} alt="Post Media" className={styles.media} />
              </div>
            )}

            {/* Bookmark icon */}
           
          </div>
        ))
      )}
    </div>
  );
}

```
##### The component initializes state variables using the useState hook: posts to store the fetched hidden posts, loading to manage the loading state, username to store the username of the authenticated user, and userLogo to store the user's profile picture.

##### The first useEffect hook runs when the token changes. It sends a GET request to fetch user data (username and profile picture) from the server using Axios. If successful, it updates the username and userLogo states with the received data. If there's an error, it logs the error and sets loading to false.

##### The second useEffect hook runs when username changes. It sends a GET request to fetch hidden posts associated with the user from the server using Axios. If successful, it filters out and flattens the post data from the response, updates the posts state, and sets loading to false. If there's an error, it logs the error and sets loading to false.

##### The return statement renders JSX based on the loading state. If loading is true, it displays a loading message. Otherwise, it maps through the posts array and renders each hidden post.Each hidden post is rendered within a div with appropriate styling. It includes the post's title, content, media (if available) . if no hidden posts found it displays a message that no hidden posts found
