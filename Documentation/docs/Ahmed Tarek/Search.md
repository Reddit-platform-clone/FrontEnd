### Search

```jsx
function Search() {
    const [activeTab, setActiveTab] = useState(0);
    const [relevanceOpen, setRelevanceOpen] = useState(false);
    const [timeOpen, setTimeOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState({ text: "Relevance", icon: <AiOutlineRocket /> });
    const [selectedTimeOption, setSelectedTimeOption] = useState("All Time");

    const tabLabels = ["Users", "Posts", "Comments", "Communities" , "HashTags"];

    const handleTabClick = (index) => {
        setRelevanceOpen(false);
        setTimeOpen(false);
        setActiveTab(index);
    };

    const toggleRelevanceDropdown = () => {
        setRelevanceOpen(!relevanceOpen);
        setTimeOpen(false);
    };

    const toggleTimeDropdown = () => {
        setTimeOpen(!timeOpen);
        setRelevanceOpen(false);
    }

    const handleOptionSelect = (optionText, icon) => {
        setSelectedOption({ text: optionText, icon: icon });
        setRelevanceOpen(false); 
    };
    const handleTimeOptionSelect = (option) => {
        setSelectedTimeOption(option);
        setTimeOpen(false); 
    };

    return (
        <div>
            <NavBar />
            <SideBar />
            <div className={styles.SearchTitle}>
                <span>Search-results</span>
            </div>
            <div className={styles.SearchContents}>
                {tabLabels.map((label, index) => (
                    <button
                        key={index}
                        className={`${styles.TabButton} ${activeTab === index ? styles.Active : ''}`}
                        onClick={() => handleTabClick(index)}
                    >
                        {label}
                    </button>
                ))}
            </div>


            <div className={styles.SortByTitle}>
                <span className={styles.SortBy}>Sort by:</span>
            </div>


            <div className={styles.SortByDropdown}>
            <button className={styles.RelevanceButton} onClick={toggleRelevanceDropdown}>
                {selectedOption.icon}
                {selectedOption.text}
            </button>
            {relevanceOpen && (
                <div className={styles.RelevanceContent}>
                    <button onClick={() => handleOptionSelect("Relevance", <AiOutlineRocket />)}>
                        <AiOutlineRocket />
                        Relevance
                    </button>
                    <button onClick={() => handleOptionSelect("Hot", <PiFireSimple />)}>
                        <PiFireSimple />
                        Hot
                    </button>
                    <button onClick={() => handleOptionSelect("Top", <LuArrowUpFromLine />)}>
                        <LuArrowUpFromLine />
                        Top
                    </button>
                    <button onClick={() => handleOptionSelect("New", <MdOutlineFiberNew />)}>
                        <MdOutlineFiberNew />
                        New
                    </button>
                    <button onClick={() => handleOptionSelect("Most Comments", <FaComment />)}>
                        <FaComment />
                        Most Comments
                    </button>
                </div>
            )}
                    
                    <button className={styles.AllTimeButton} onClick={toggleTimeDropdown}>
                <FaCalendarWeek />
                {selectedTimeOption}
            </button>
            {timeOpen && (
                <div className={styles.AllTimeContent}>
                    <label>
                        <input type="radio" name="allTimeOption" value="All Time" onChange={() => handleTimeOptionSelect("All Time")} checked={selectedTimeOption === "All Time"} />
                        All Time
                    </label>
                    <label>
                        <input type="radio" name="allTimeOption" value="Past Year" onChange={() => handleTimeOptionSelect("Past Year")} checked={selectedTimeOption === "Past Year"} />
                        Past Year
                    </label>
                    <label>
                        <input type="radio" name="allTimeOption" value="Past Month" onChange={() => handleTimeOptionSelect("Past Month")} checked={selectedTimeOption === "Past Month"} />
                        Past Month
                    </label>
                    <label>
                        <input type="radio" name="allTimeOption" value="Past Week" onChange={() => handleTimeOptionSelect("Past Week")} checked={selectedTimeOption === "Past Week"} />
                        Past Week
                    </label>
                    <label>
                        <input type="radio" name="allTimeOption" value="Past 24 hrs" onChange={() => handleTimeOptionSelect("Past 24 hrs")} checked={selectedTimeOption === "Past 24 hrs"} />
                        Past 24 hrs
                    </label>
                    <label>
                        <input type="radio" name="allTimeOption" value="Past Hour" onChange={() => handleTimeOptionSelect("Past Hour")} checked={selectedTimeOption === "Past Hour"} />
                        Past Hour
                    </label>
                </div>
            )}
            </div>
            <div className={styles.TabContent}>
                {activeTab === 0 && (
                    <div className={styles.UserContent}>
                        <Users/>
                    </div>
                )}
                {activeTab === 1 && (
                    <div className={styles.PostContent}>
                        <Post/>

                    </div>
                )}
                {activeTab === 2 && (
                    <div className={styles.CommentContent}>
                        <Comment/>

                    </div>
                )}
                {activeTab === 3 && (
                    <div className={styles.CommunityContent}>
                        <Community/>
                        
                    </div>
                )}
                {activeTab === 4 && (
                    <div className={styles.CommunityContent}>
                        <HashTags/>
                        
                    </div>
                )}
            </div>
            </div>
        
    );
}

```

##### The component uses the useState hook from React to manage its state. It maintains state variables for activeTab, relevanceOpen, timeOpen, selectedOption, and selectedTimeOption.

##### The tabLabels array holds the labels for different tabs like "Users", "Posts", "Comments", "Communities", and "HashTags".  The handleTabClick function is called when a tab is clicked, updating the activeTab state to the index of the clicked tab.

##### he component manages two dropdowns for sorting: one for relevance and one for time. toggleRelevanceDropdown and toggleTimeDropdown functions toggle the visibility of the relevance and time dropdowns, respectively. handleOptionSelect and handleTimeOptionSelect functions update the selected options when an option is clicked within the dropdowns.

##### The component renders various UI elements including a navigation bar (NavBar), a sidebar (SideBar), a title for search results, tab buttons for different search categories, a "Sort by" label, and dropdowns for relevance and time sorting.

##### Depending on the active tab, different components (Users, Post, Comment, Community, HashTags) are rendered to display search results related to that category.

### Search Components

#### 1-Users

```jsx
function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.post('http://localhost:5000/searchBy/users', { keyword: searchTerm });
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
    }, [searchTerm]);

    // Function to handle input change
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value); // Update the search term state
    };

    return (
        <div className={styles.UserSearchContainer}>
            <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleInputChange}
                className={styles.SearchInput}
            />
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
        </div>
    );
}

```

##### The component uses the useState hook to manage three state variables: users, error, and searchTerm. users state holds an array of user data.
##### error state is used to handle errors that might occur during the user data fetching process.
##### searchTerm state holds the current search term entered by the user.

##### The useEffect hook is utilized to fetch user data from the server when the component mounts or when the searchTerm changes.It sends a POST request to http://localhost:5000/searchBy/users with the search term (keyword) in the request body. Upon successful response, it updates the users state with the retrieved user data (userSuggestions). If an error occurs during the fetch operation, it sets the error state to display an error message.

##### The handleInputChange function updates the searchTerm state based on the user's input in the search input field.

##### The component renders a search input field (input) for users to input their search queries.It maps through the users array to render user data. Each user entry is displayed as a clickable link (Link from React Router) containing user information like username, profile picture, sarakelid, and a brief about section.

##### on the click on any user it goes to the profile page of the user and display content of user if available


#### 2-Post
```jsx
function Post() {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await axios.post('http://localhost:5000/searchBy/posts', { keyword: searchTerm }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const postsData = response.data.postsResults;
                setPosts(postsData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }
        
        fetchPosts();
    }, [searchTerm, token]);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        // Format the time as desired, for example: 23:38
        return `${hours}:${minutes}`;
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value); // Update the search term state
    };

    return (
        <div className={styles.PostsContainer}>
            <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={handleInputChange}
                className={styles.SearchInput}
            />
            {posts.map(post => (
                <div className={`${styles.Post} ${post.isLocked ? styles.LockedPost : ''}`} key={post._id}>
                    <div className={styles.PostHeader}>
                        {post.user && (
                            <>
                                <img src={post.user?.image} alt='User Avatar' className={styles.LogoUp1} />
                                <span className={styles.Username1}>{post.user.name}</span>
                            </>
                        )}
                        <div className={styles.PostTime}>
                            <span className={styles.PostTime}>{formatTime(post.createdAt)}</span>
                        </div>
                    </div>
                    <div className={styles.PostContent}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        {post.media && ( // Check if media exists and render it
                            <div className={styles.PostMedia}>
                                {Array.isArray(post.media) ? (
                                    post.media.map((media, index) => (
                                        <img src={media} key={index} alt={`Media ${index}`} />
                                    ))
                                ) : (
                                    <img src={post.media} alt='Media' />
                                )}
                            </div>
                        )}
                    </div>
                    <div className={styles.PostFooter}>
                        <span className={styles.Votes}><BiUpvote/> {post.upvotes}</span>
                        <span className={styles.Votes}><BiDownvote/> {post.downvotes}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
```

##### The component uses the useState hook to manage two state variables: posts and searchTerm. posts state holds an array of post data. searchTerm state holds the current search term entered by the user.

##### The useEffect hook is utilized to fetch post data from the server when the component mounts or when the searchTerm changes.It sends a POST request to http://localhost:5000/searchBy/posts with the search term (keyword) in the request body.
##### The request includes an Authorization header with a bearer token obtained from the useAuth custom hook.
##### Upon successful response, it updates the posts state with the retrieved post data.
##### If an error occurs during the fetch operation, it logs the error to the console.

##### The component renders a search input field (input) for users to input their search queries.It maps through the posts array to render individual post components. Each post is displayed with its title, content, creation time, user information (name and avatar), media content (if available), and voting buttons (upvote and downvote) Voting buttons (upvote and downvote) are included in the post footer, allowing users to interact with posts by voting on them.

#### 3-Comments
```jsx
function Comments() {
    const [comments, setComments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        async function fetchComments() {
            try {
                const response = await axios.post('http://localhost:5000/searchBy/comments', { keyword: searchTerm }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const commentsData = response.data.commentsResults;
                setComments(commentsData);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        }
        
        fetchComments();
    }, [searchTerm, token]);

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value); // Update the search term state
    };

    return (
        <div className={styles.CommentsContainer}>
            <input
                type="text"
                placeholder="Search comments..."
                value={searchTerm}
                onChange={handleInputChange}
                className={styles.SearchInput}
            />
            {comments.map(comment => (
                <div className={styles.Comment} key={comment._id}>
                    <div className={styles.CommentHeader}>
                        <span className={styles.userID}>{comment.userID}</span>
                        {/* Render each comment header here if needed */}
                    </div>
                    <div className={styles.CommentContent}>
                        <p>{comment.content}</p>
                    </div>
                    <div className={styles.CommentTime}>
                        <span>{formatTime(comment.dateTime)}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

```

##### The component uses the useState hook to manage two state variables: comments and searchTerm. comments state holds an array of comment data. searchTerm state holds the current search term entered by the user.

##### The useEffect hook is utilized to fetch comment data from the server when the component mounts or when the searchTerm changes.
##### It sends a POST request to http://localhost:5000/searchBy/comments with the search term (keyword) in the request body.
##### The request includes an Authorization header with a bearer token obtained from the useAuth custom hook.
##### Upon successful response, it updates the comments state with the retrieved comment data.
##### If an error occurs during the fetch operation, it logs the error to the console.

##### The component renders a search input field (input) for users to input their search queries. It maps through the comments array to render individual comment components.Each comment is displayed with its content, user ID, and timestamp.

#### 4- Communities 
```jsx
function Community() {
    const [communities, setCommunities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        async function fetchCommunities() {
            try {
                const response = await axios.post('http://localhost:5000/searchBy/communities', { keyword: searchTerm }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const communitiesData = response.data.communitiesResults; // Set communities to communitiesResults array
                setCommunities(communitiesData);
            } catch (error) {
                console.error('Error fetching communities:', error);
            }
        }
        
        fetchCommunities();
    }, [searchTerm, token]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value); // Update the search term state
    };

    return (
        <div className={styles.CommunitySearchContainer}>
            <input
                type="text"
                placeholder="Search communities..."
                value={searchTerm}
                onChange={handleInputChange}
                className={styles.SearchInput}
            />
            <div className={styles.CommunitySearchDataContainer}>
                {Array.isArray(communities) && communities.map((community, index) => (
                    <div key={index} className={styles.CommunitySearchData}>
                        <img src={community.displayPic} alt='Profile' className={styles.CommunityAvatar} />
                        <div>
                            <h3 className={styles.CommunityName}>{community.communityName}</h3>
                            <span className={styles.Description}>{community.description}</span>
                        </div>
                        <span className={styles.CommunityType}>{community.type}</span>
                        {community.isNSFW && <span className={styles.NSFWIndicator}>NSFW</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}
```
##### The component uses the useState hook to manage two state variables: communities and searchTerm.
##### communities state holds an array of community data.
##### searchTerm state holds the current search term entered by the user.

##### The useEffect hook is utilized to fetch community data from the server when the component mounts or when the searchTerm changes.
##### It sends a POST request to http://localhost:5000/searchBy/communities with the search term (keyword) in the request body.
##### The request includes an Authorization header with a bearer token obtained from the useAuth custom hook.
##### Upon successful response, it updates the communities state with the retrieved community data.
##### If an error occurs during the fetch operation, it logs the error to the console.

##### The component renders a search input field (input) for users to input their search queries.
##### It maps through the communities array to render individual community components.
##### Each community is displayed with its name, description, type, and an indicator for NSFW (Not Safe For Work) communities if applicable.

#### 5-Hashtags
```jsx
function HashTags() {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await axios.post('http://localhost:5000/searchBy/posts', { keyword: searchTerm }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const postsData = response.data.postsResults;
                setPosts(postsData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }
        
        fetchPosts();
    }, [searchTerm, token]);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        
        return `${hours}:${minutes}`;
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value); // Update the search term state
    };

    return (
        <div className={styles.PostsContainer}>
            <input
                type="text"
                placeholder="Search For Hashtag..."
                value={searchTerm}
                onChange={handleInputChange}
                className={styles.SearchInput}
            />
            {posts.map(post => (
                <div className={`${styles.Post} ${post.isLocked ? styles.LockedPost : ''}`} key={post._id}>
                    <div className={styles.PostHeader}>
                        {post.user && (
                            <>
                                <img src={post.user?.image} alt='User Avatar' className={styles.LogoUp1} />
                                <span className={styles.Username1}>{post.user.name}</span>
                            </>
                        )}
                        <div className={styles.PostTime}>
                            <span className={styles.PostTime}>{formatTime(post.createdAt)}</span>
                        </div>
                    </div>
                    <div className={styles.PostContent}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        {post.hashtags && post.hashtags.length > 0 && (
                            <div className={styles.Hashtags}>
                                {post.hashtags.map((hashtag, index) => (
                                    <span key={index} className={styles.Hashtag}>{hashtag}</span>
                                ))}
                            </div>
                        )}
                        {post.media && ( // Check if media exists and render it
                            <div className={styles.PostMedia}>
                                {Array.isArray(post.media) ? (
                                    post.media.map((media, index) => (
                                        <img src={media} key={index} alt={`Media ${index}`} />
                                    ))
                                ) : (
                                    <img src={post.media} alt='Media' />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

```

##### The component uses the useState hook to manage two state variables: posts and searchTerm. posts state holds an array of post data.
##### searchTerm state holds the current search term entered by the user.

##### The useEffect hook is utilized to fetch post data from the server when the component mounts or when the searchTerm changes.
##### It sends a POST request to http://localhost:5000/searchBy/posts with the search term (keyword) in the request body.
##### The request includes an Authorization header with a bearer token obtained from the useAuth custom hook.
##### Upon successful response, it updates the posts state with the retrieved post data including the hashtag searched for.
##### If an error occurs during the fetch operation, it logs the error to the console.

