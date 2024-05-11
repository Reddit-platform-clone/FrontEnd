# Compact Post Card
### State Initialization:
```jsx

const [expanded, setExpanded] = useState(false);
const [voteStatus, setVoteStatus] = useState(null);
const { token } = useAuth(); // Assuming this hook provides authentication token
const postRef = useRef(null);


```
#### expanded: This state variable tracks whether the post is expanded (true) or collapsed (false).
#### voteStatus: This state variable manages the current vote status (null for no vote, 1 for upvote, -1 for downvote).
#### token: This is retrieved from the useAuth custom hook and represents the authentication token of the logged-in user.
#### postRef: This useRef hook is used to reference the DOM element (post container) to adjust its height dynamically.

### useEffect Hook:
```jsx

useEffect(() => {
  if (expanded) {
    adjustPostHeight();
  } else {
    resetPostHeight();
  }
}, [expanded, post.text]);


```
#### This useEffect hook runs whenever the expanded state or the post.text property changes.
#### If expanded is true, it calls adjustPostHeight() to set the post container's height to its scroll height (making it fully expanded).
#### If expanded is false, it calls resetPostHeight() to reset the post container's height to auto (collapsing it).

### toggleVote Function:
```jsx

const toggleVote = (rank) => {
  if (!token) {
    toast.error("You need to Login first");
    return;
  }
  if (voteStatus === rank) {
    setVoteStatus(null); // Clear the vote
    handleVoteClick(post._id, 0); // Clear the vote on the server
  } else {
    setVoteStatus(rank); // Set the vote status
    handleVoteClick(post._id, rank); // Send the selected rank to the server
  }
};


```
#### This function toggles the vote status of the post based on the provided rank (1 for upvote, 0 to clear vote, -1 for downvote).
#### It checks if a user is authenticated (token exists). If not, it displays an error message using a toast notification and exits the function.
#### If the current voteStatus matches the rank, it clears the vote by setting voteStatus to null and sends a 0 rank to the server to clear the vote.
#### If the voteStatus does not match the rank, it sets voteStatus to the provided rank and sends the rank value to the server using handleVoteClick.


### handleExpandClick() ,adjustPostHeight() and resetPostHeight()
```jsx

const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const adjustPostHeight = () => {
    if (postRef.current) {
      const postHeight = postRef.current.scrollHeight;
      postRef.current.style.height = `${postHeight}px`;
    }
  };

  const resetPostHeight = () => {
    if (postRef.current) {
      postRef.current.style.height = ""; // Resetting to auto height
    }
  };

```
#### handleExpandClick: This function toggles the expanded state (expands or collapses the post).
#### adjustPostHeight: This function adjusts the post container's height to match its scroll height, effectively expanding it.
#### resetPostHeight: This function resets the post container's height to auto, collapsing it.