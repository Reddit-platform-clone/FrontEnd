# Content
### State Management:
```jsx

const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hiddenPosts, setHiddenPosts] = useState({});

```
#### posts: Manages the array of posts fetched from the server.
#### loading: Tracks the loading state of the component.
#### hiddenPosts: Keeps track of posts that are hidden from view.

### Fetching Data (useEffect with fetchData):
```jsx

 useEffect(() => {
    const fetchData = async () => {
      try {
        let url;
        if (token){
          // If user is not logged in (token is null)
          url = `http://localhost:5000/api/community/${communityId}/getPosts`;
        }

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        });
        const responseData = await response.json();
        console.log("Response data:", responseData.data); // For debugging
        if (response.ok) {
          if (Array.isArray(responseData.data)) {
            // If responseData.data is an array, set posts directly
            setPosts(responseData.data);
          } else {
            // If responseData.data is a single post object, wrap it in an array
            setPosts([responseData.data]);
          }
          setLoading(false);
        } else {
          throw new Error(responseData.message || "Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]); // Set posts to empty array if fetching fails
        setLoading(false);
      }
    };

    fetchData();
 }

```
#### The useEffect hook is used to execute a function (fetchData) when certain dependencies (sortingType and token) change.
#### Inside fetchData, an asynchronous function is defined to fetch posts from the server (http://localhost:5000/api/community/${communityId}/getPosts).
#### The fetch function is used to send a request to the server with appropriate headers (including the authorization token if available).
#### Upon receiving a response, the data is parsed using response.json().
#### If the response is successful (response.ok), the retrieved posts are stored in the posts state.
#### If an error occurs during fetching, appropriate error handling is implemented by logging the error and setting posts to an empty array.

### Sorting and View Options:
```jsx

const handleSortTypes = () => {
    setShowSortOptions(!showSortOptions);
    setShowViewOptions(false);
  };

  const handleSortingOption = (option) => {
    if (!token) {
      toast.error("You need to Login first");
      return;
    }
    setSortingType(option.toLowerCase());
    setShowSortOptions(false);
  };

```
#### handleSortTypes: Toggles the display of sorting options (showSortOptions) and hides view options.
#### handleSortingOption: Handles user selection of sorting options by setting the sortingType state.
#### handleViewTypes: Toggles the display of view options (showViewOptions) and hides sort options.


### Utility Functions:
```jsx

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
#### calculateTimeSinceCreation: Calculates the time elapsed since a post was created and returns a human-readable string (e.g., "3 hours ago").
#### truncateText: Truncates text content to a specified maximum length and appends ellipsis if necessary.
#### renderMediaOrTruncateText and renderMedia: Conditional rendering functions that render media content (images or videos) or truncated text based on the provided data.



### handlePostClick
```jsx

const handlePostClick = (passedId) => {
    if (!passedId) {
      return;
    }
    console.log("Post clicked with ID:", passedId);
    setSelectedPostId(passedId);
  };

  useEffect(() => {
    console.log("selectedPostId updated:", selectedPostId);
  }, [selectedPostId]);

  const handleBackButtonClick = () => {
    setSelectedPostId(null);
  };

```
#### handlePostClick: Handles the click event on a post by updating the selected post ID (selectedPostId).
#### useEffect (for selectedPostId): Monitors changes to the selectedPostId state for debugging purposes.


### handleReportClick
```jsx

  const handleReportClick = async (_id, userId) => {
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
          entityId: _id,
          reportedUsername: userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData.message);
      toast.success(responseData.message);
    } catch (error) {
      console.error("Error reporting post:", error);
      toast.error("Failed to report post");
    }
  };

```
#### This function is triggered when a user clicks to report a specific post.
#### It checks if the user is authenticated (token is present). If not, it displays an error message using a toast notification and exits the function.

###