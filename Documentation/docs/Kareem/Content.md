# Content
### The 'Content' component is responsible for displaying a list of posts fetched from a server API. It provides options for sorting and viewing posts and allows users to interact with individual posts, such as upvoting, saving, and joining communities.

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
17. **ToastContainer**: Component from "react-toastify" library to display notifications.

