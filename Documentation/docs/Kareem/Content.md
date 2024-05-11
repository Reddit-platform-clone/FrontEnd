# Content
### The Content function is a React component that displays a list of posts. It fetches the posts from an API based on the sorting type and user authentication status. The component also handles user interactions such as voting, joining communities, saving posts, reporting posts, and hiding posts. It includes pagination to load more posts and has options to change the sorting type and view type. It also displays recent posts if the user is logged in.



1. **useState**: React hook functions to manage component state.
   - `posts`: Manages the array of posts fetched from the API.
   - `loading`: Manages the loading state of the component.
   - `hiddenPosts`: Manages the state of posts that are hidden by the user.
   - `joinStates`: Manages the state of whether the user has joined a community or not.
   - `saveStates`: Manages the state of whether the user has saved a post or not.
   - `viewType`: Manages the type of view for displaying posts (`card` or `compact`).
   - `showSortOptions`: Manages the state of whether to show sorting options or not.
   - `sortingType`: Manages the type of sorting applied to posts (`best`, `hot`, `top`, `new`).
   - `showViewOptions`: Manages the state of whether to show view options or not.
   - `selectedPostId`: Manages the ID of the currently selected post to navigate to the post page.
   - `selectedCommunityId`: Manages the ID of the currently selected community to navigate to the commmunity page.
   - `page`: Manages the current page number for pagination.
   - `token`: variable to save the user token by useAuth() .

```jsx
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hiddenPosts, setHiddenPosts] = useState({});
  const [joinStates, setJoinStates] = useState({});
  const [saveStates, setSaveStates] = useState({});
  const [viewType, setViewType] = useState("card");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [sortingType, setSortingType] = useState("best");
  const [showViewOptions, setShowViewOptions] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedCommunityId, setCommunityId] = useState(null);
  const [page, setPage] = useState(1);
  const { token } = useAuth(); //init
```
2. **useEffect**: React hook function to perform side effects in the component.
   - Fetches posts from the subreddit API based on the sorting type when the component mounts or when the sorting type changes.

   
```jsx
useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/subreddit/get${
            sortingType.charAt(0).toUpperCase() + sortingType.slice(1)
          }`
        );
        const responseData = await response.json();
        if (response.ok) {
          setPosts(responseData.data);
          setLoading(false);
        } else {
          throw new Error(
            responseData.message || "Failed to fetch posts"
          );
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cleanup tasks if needed
    };
  }, [sortingType]); // Refetch posts when sortingType changes

```

3. **handleSortTypes**: Toggles the display of sorting options dropdown.
```jsx
  const handleSortTypes = () => {
    setShowSortOptions(!showSortOptions);
    setShowViewOptions(false);
  };
```

4. **handleSortingOption**: Handles the selection of a sorting option.
```jsx
  const handleSortingOption = (option) => {
    setSortingType(option.toLowerCase());
    setShowSortOptions(false);
  };
```

5. **handleUpvoteClick**: Handles the upvoting of a post by the user.
```jsx
  const handleUpvoteClick = (postId) => {
    if (!token) {
      toast.error("You need to Login first");
      return;
    }
    console.log("upvote")
    console.log("post id : ",postId)
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === postId
          ? {
              ...post,
              upvoted: !post.upvoted,
              downvoted: false,
              likes: post.upvoted
                ? parseInt(post.likes) - 1
                : parseInt(post.likes) + 1,
            }
          : post
      )
    );
  };
```

6. **handleDownvoteClick**: Handles the downvoting of a post by the user.
```jsx
  const handleDownvoteClick = (postId) => {
    if (!token) {
      toast.error("You need to Login first");
      return;
    }
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === postId
          ? {
              ...post,
              upvoted: false,
              downvoted: !post.downvoted,
              likes: post.downvoted
                ? parseInt(post.likes) + 1
                : parseInt(post.likes) - 1,
            }
          : post
      )
    );
  };
```
7. **getPostInfo**: Retrieves information about a post based on its ID.
```jsx
  const getPostInfo = (postId) => {
    const post = posts.find((post) => post.postId === postId);
    return post ? { name: post.name, userId: post.userId } : null;
  };
```
8. **handleJoinClick**: Handles the joining or leaving of a community by the user.
```jsx
  const handleJoinClick = async (postId) => {
    if (!token) {
      toast.error("You need to Login first");
      return;
    }
    try {
      const { name, userId } = getPostInfo(postId);
      const isJoining = !joinStates[postId];
      const response = await fetch(
        `http://localhost:5000/api/community/${
          isJoining ? "join" : "leave"
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            communityName: name,
          }),
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData.message);
        setJoinStates((prevState) => ({
          ...prevState,
          [postId]: isJoining,
        }));
      } else {
        throw new Error(
          responseData.message || "Failed to join/leave community"
        );
      }
    } catch (error) {
      console.error("Error joining/leaving community:", error);
    }
  };
```
9. **handleSaveClick**: Handles the saving or unsaving of a post by the user.
```jsx
  const handleSaveClick = async (postId) => {

    if (!token) {
      toast.error("You need to Login first");
      return;
    }
    // Check if the post is already saved
    const isSaved = saveStates[postId];
  
    try {
      const response = await fetch(`http://localhost:5000/api/${isSaved ? 'unsave' : 'save'}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: "post",
          entityId: postId,
        }),
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData.message);
        // Toggle the save state for the post
        setSaveStates((prevState) => ({
          ...prevState,
          [postId]: !isSaved,
        }));
      } else {
        throw new Error(responseData.message || "Failed to save/unsave post");
      }
    } catch (error) {
      console.error("Error saving/unsaving post:", error);
    }
  };
```
10. **handleReportClick**: Handles the reporting of a post by the user.
```jsx
  const handleReportClick = async (postId, userId) => {
    if (!token) {
      toast.error("You need to Login first");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reason: "dummy",
          type: "post",
          entityId: postId,
          reportedUsername: userId,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log(responseData.message);
    } catch (error) {
      console.error("Error reporting post:", error);
    }
  };
```
11. **handleHideClick**: Handles the hiding of a post by the user.
```jsx
  const handleHideClick = (postId) => {
    console.log(posts)
    setHiddenPosts((prevHiddenPosts) => ({
      ...prevHiddenPosts,
      [postId]: true,
    }));
  };
```
12. **handleViewTypes**: Toggles the display of view options dropdown.
```jsx
  const handleViewTypes = () => {
    setShowViewOptions(!showViewOptions);
    setShowSortOptions(false); // Close the sort options dropdown
  };
```
13. **truncateText**: Truncates text content to a specified maximum length.
```jsx
  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + ".....";
    }
    return text;
  };
```
14. **renderMediaOrTruncateText**: Renders media content or truncates text based on the presence of media.
```jsx
  const renderMediaOrTruncateText = (media, content) => {
    const maxTextLength = 450;
    if (media) {
      return renderMedia(media, content);
    } else {
      return <p>{truncateText(content, maxTextLength)}</p>;
    }
  };
```
15. **renderMedia**: Renders media content (images or videos) based on its type.
```jsx
  const renderMedia = (media, text) => {
    if (Array.isArray(media)) {
      return <ImageSlider slides={media} viewType={viewType} />;
    } else if (typeof media === "string") {
      if (media.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        return <img src={media} alt={text} className="post-image" />;
      } else {
        return (
          <ReactPlayer url={media} width="540px" height="500px" controls />
        );
      }
    } else {
      return null;
    }
  };
```
16. **renderMediaWithCount**: Renders media content with a count indicator.
```jsx
  const renderMediaWithCount = (media, text) => {
    if (!media) {
      return <CiViewList className="compact-post-card-image-compensation" />;
    } else if (Array.isArray(media)) {
      if (media.length === 1) {
        return (
          <img src={media[0]} alt={text} className="compact-post-card-image" />
        );
      } else {
        return (
          <>
            <img
              src={media[0]}
              alt={text}
              className="compact-post-card-image"
            />
            <span className="compact-post-card-image-count">
              <AiOutlinePicture />
              {media.length}
            </span>
          </>
        );
      }
    } else if (typeof media === "string") {
      if (media.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        return (
          <img src={media} alt={text} className="compact-post-card-image" />
        );
      } else {
        return <RiVideoFill className="compact-post-card-image-compensation" />;
      }
    } else {
      return <CiViewList className="compact-post-card-image-compensation" />;
    }
  };
```
17. **fetchRecentPosts**: Fetches recent posts from the server API and updates the state with the fetched data.
```
useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        if (!token) {
          return; // No need to fetch if not logged in
        }

        const response = await fetch(
          "http://localhost:5000/api/recentlyViewedPosts",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Recent posts:", responseData);
        // Update state with recent posts data
        setRecentPosts(responseData.message.result);
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      }
    };

    fetchRecentPosts();
  }, [token]);
```
18. **deleteRecentPosts**: Deletes the recent posts data from the server API and clears the recent posts state.
```
const deleteRecentPosts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/deleteRecentlyViewedPosts",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData.message);
      setRecentPosts([]); // Clear recent posts
    } catch (error) {
      console.error("Error deleting recent posts:", error);
    }
  };
```
19. **scrollToTop**: Scrolls the window to the top smoothly.
```
const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
```

20. **calculateTimeSinceCreation**: Calculates the time elapsed since a post was created and returns a human-readable string representing the time.
```
const calculateTimeSinceCreation = (createdAt) => {
    const currentTime = new Date();
    const postTime = new Date(createdAt);
    const timeDifference = currentTime - postTime;

    // Convert milliseconds to seconds
    const seconds = Math.floor(timeDifference / 1000);

    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  };
```
21. **ToastContainer**: Component from "react-toastify" library to display notifications.
