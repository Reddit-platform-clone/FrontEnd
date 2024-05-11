# Post Card
### useEffect Hook:
```jsx

useEffect(() => {
  // Function to fetch community info based on _id
  const fetchCommunityInfo = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/community/${post._id}/getCommunityInfo`);
      const data = await response.json();
      setCommunityInfo(data); // Set community info state
      console.log("Community info response:", communityInfo);
      console.log("Community info:", data);
    } catch (error) {
      console.error("Error fetching community info:", error);
    }
  };

  if (post.communityId) {
    fetchCommunityInfo(); // Fetch community info when post.communityId changes
  }
}, [post.communityId]);


```
#### Purpose: This useEffect hook is used to fetch community information whenever post.communityId changes.
#### Functionality:
#### Defines an async function fetchCommunityInfo that sends a GET request to fetch community information based on the post._id.
#### When post.communityId changes (triggered by dependencies in the dependency array [post.communityId]), the fetchCommunityInfo function is invoked to retrieve the updated community information.
#### Upon successfully fetching the data, it updates the communityInfo state using setCommunityInfo(data).
#### Logs the community info response and data to the console for debugging purposes.
#### Catches and logs any errors that occur during the fetch process.


### handleMouseOver and handleMouseOut Functions:
```jsx
const handleMouseOver = () => {
  setIsHovering(true);
};

const handleMouseOut = () => {
  setIsHovering(false);
};


```
#### Purpose: These functions are event handlers used to update the isHovering state based on mouse hover events.
#### Functionality:
#### handleMouseOver: Sets isHovering to true when the mouse enters the component.
#### handleMouseOut: Sets isHovering to false when the mouse leaves the component.

### toggleVote Function:
```jsx

const toggleVote = (rank) => {
  if (!token) {
    toast.error("You need to Login first");
    return;
  }

  // If the user is canceling their vote
  if (voteStatus === rank) {
    setVoteStatus(null); // Clear the vote
    handleVoteClick(post._id, 0); // Send rank 0 to clear the vote
  } else {
    setVoteStatus(rank); // Set the vote status
    handleVoteClick(post._id, rank); // Send the selected rank
  }
};

```

#### Purpose: This function handles toggling (setting or clearing) a user's vote on a post.
#### Functionality:
#### Checks if a token (authentication token) is present. If not, it displays an error message using toast.error and returns early.
#### If rank (vote status) matches the current voteStatus, it clears the vote by setting voteStatus to null and sending a 0 rank to handleVoteClick function to clear the vote.
#### If rank is different from the current voteStatus, it sets the voteStatus to the selected rank and calls handleVoteClick function with the post._id and the selected rank.