# postPage
### SendComment Function
```jsx
async function SendComment() {
  if (comment === '') {
    alert("Please enter a comment first");
    return;
  }
  try {
    const response = await axios.post(
      `http://localhost:5000/api/comment`,
      { postID: postId, content: comment },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setComment(''); // Clear comment input after sending
    getRepliesAndApply(); // Refresh replies after adding new comment
  } catch (error) {
    console.error('Failed to send comment:', error);
  }
}

```
#### Asynchronous function responsible for sending a comment (content) for a specific post (postId) to the API endpoint (http://localhost:5000/api/comment).
#### Validates the comment input; if empty, displays an alert.
#### Uses axios to make a POST request with the comment data and authorization token (Bearer ${token}).
#### Upon successful comment submission, clears the comment state and refreshes replies by calling getRepliesAndApply function.


### GetPostInfo, GetCommInfo, getRepliesAndApply Functions:
```jsx
async function GetPostInfo() {
  const promise = await axios.post(`http://localhost:5000/api/getAPost`, { postID: postId });
  return promise.data;
}

async function GetCommInfo() {
  const promise = await axios.get(`http://localhost:5000/api/community/${postId}/getCommunityInfo`);
  return promise.data;
}

async function getRepliesAndApply() {
  const data = await axios.post(`http://localhost:5000/api/get_post_replies`, { postID: postId });
  return data.message;
}


```
#### functions responsible for fetching post information (GetPostInfo), community information (GetCommInfo), and post replies (getRepliesAndApply) from respective API endpoints using axios.
#### Each function returns the extracted data from the API response.

### handleVoteClick Function
```jsx

const handleVoteClick = async (_id, rank) => {
  try {
    const response = await fetch("http://localhost:5000/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        rank: rank, // Rank can be 1 for upvote, 0 to clear vote, or -1 for downvote
        type: "post",
        entityId: _id,
      }),
    });

    console.log("post id is :", _id);
    console.log("response : ", response);

    // Check for the status code
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
  } catch (error) {
    console.error("Error voting:", error);
  }
};

```
#### handleVoteClick is an asynchronous function responsible for sending a vote (upvote, downvote, or clear vote) for a specific entity (post) to the server.
#### It constructs a fetch request to the http://localhost:5000/api/vote endpoint with appropriate headers and body parameters.
#### The rank parameter determines the type of vote:
##### 1 for upvote.
##### 0 to clear the vote.
##### -1 for downvote.
#### It logs the entity ID (_id) and the response from the server to the console.
#### If the HTTP response is not successful (!response.ok), it throws an error.

### toggleVote Function
```jsx

const toggleVote = (id, rank) => {
  if (!token) {
    toast.error("You need to Login first");
    return;
  }

  // If the user is canceling their vote
  if (voteStatus === rank) {
    setVoteStatus(null); // Clear the vote
    handleVoteClick(id, 0); // Send rank 0 to clear the vote
  } else {
    setVoteStatus(rank); // Set the vote status
    handleVoteClick(id, rank); // Send the selected rank
  }
};

```
#### Purpose:
#### toggleVote is a function that toggles the vote status for a given entity (id) based on the specified rank.
#### It first checks if the user is authenticated (token exists). If not, it displays an error message using toast.error and returns early.
#### If the current vote status (voteStatus) matches the provided rank, it means the user wants to cancel their vote. In this case:
#### It sets the voteStatus to null to clear the vote display.
#### Calls handleVoteClick with rank set to 0 to clear the vote on the server.
#### If the user is voting for the first time or changing their vote:
#### Sets the voteStatus to the selected rank.
#### Calls handleVoteClick with the specified rank to submit the vote to the server.

### handleVoteButtonClick Function
```jsx

const handleVoteButtonClick = (event, id, rank) => {
  event.stopPropagation(); // Stop event propagation to parent container
  toggleVote(id, rank); // Toggle the vote based on the button click
};

```
#### handleVoteButtonClick is a callback function triggered when a vote button is clicked.
#### It prevents the click event from propagating to the parent container using event.stopPropagation().
#### Calls toggleVote function to handle the vote based on the provided id and rank.
