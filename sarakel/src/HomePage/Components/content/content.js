import React, { useState, useEffect } from "react";
import "./content.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsViewList, BsViewStacked } from "react-icons/bs";
import ReactPlayer from "react-player";
import PostCard from "./postCard.js";
import CompactPostCard from "./compactPostCard.js";
import { CiViewList } from "react-icons/ci";
import { AiOutlinePicture } from "react-icons/ai";
import ImageSlider from "./imageSlider";
import { RiVideoFill } from "react-icons/ri";
import { useAuth } from "../AuthContext.js"; //import
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Content = () => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url;
        if (token) {
          // If user is logged in (token exists)
          url = `http://localhost:5000/api/subreddit/get${
            sortingType.charAt(0).toUpperCase() + sortingType.slice(1)
          }`;
        } else {
          // If user is not logged in (token is null)
          url = `http://localhost:5000/api/subreddit/getRandom`;
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
  
    return () => {
      // Cleanup tasks if needed
    };
  }, [sortingType, token]);
    
  

  const handleSortTypes = () => {
    setShowSortOptions(!showSortOptions);
    setShowViewOptions(false);
  };

  const handleSortingOption = (option) => {
    setSortingType(option.toLowerCase());
    setShowSortOptions(false);
  };


  // const handleVoteClick = async (postId, rank) => {
  //   if (!token) {
  //     toast.error("You need to Login first");
  //     return;
  //   }
  //   try {
  //     const response = await fetch("http://localhost:5000/api/vote", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         rank: rank, // Rank can be 1 for upvote, 0 to clear vote, or -1 for downvote
  //         type: "post",
  //         entityId: "661d88eff83edb1b16c0c394",
  //       }),
  //     });
  //     console.log("post id is :",postId)
  //     console.log("response : ",response)
  
  //     // Check for the status code
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  
  //     const responseData = await response.json();
  //     console.log(responseData.message);
  //   } catch (error) {
  //     console.error("Error voting:", error);
  //   }
  // };
  
  
  
  const handleUpvoteClick = (_id) => {
    if (!token) {
      toast.error("You need to Login first");
      return;
    }
    console.log("upvote")
    console.log("post id : ",_id)
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === _id
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

  const handleDownvoteClick = (_id) => {
    if (!token) {
      toast.error("You need to Login first");
      return;
    }
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === _id
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

  const getPostInfo = (_id) => {
    const post = posts.find((post) => post._id === _id);
    return post ? { name: post.name, userId: post.userId } : null;
  };

  const handleJoinClick = async (_id) => {
    if (!token) {
      toast.error("You need to Login first");
      return;
    }
    try {
      const { name, userId } = getPostInfo(_id);
      const isJoining = !joinStates[_id];
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
      console.log("response : ",response)
      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData.message);
        setJoinStates((prevState) => ({
          ...prevState,
          [_id]: isJoining,
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

  const handleSaveClick = async (_id) => {

    if (!token) {
      toast.error("You need to Login first");
      return;
    }
    // Check if the post is already saved
    const isSaved = saveStates[_id];
  
    try {
      const response = await fetch(`http://localhost:5000/api/${isSaved ? 'unsave' : 'save'}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: "post",
          entityId: _id,
        }),
      });
      const responseData = await response.json();
      console.log('catch')
        console.log(responseData.message);
      if (response.ok) {
        console.log('catch')
        console.log(responseData.message);
        // Toggle the save state for the post
        setSaveStates((prevState) => ({
          ...prevState,
          [_id]: !isSaved,
        }));
      } else {
        throw new Error(responseData.message || "Failed to save/unsave post");
      }
    } catch (error) {
      console.error("Error saving/unsaving post:", error);
    }
  };
  
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
    } catch (error) {
      console.error("Error reporting post:", error);
    }
  };
  

  const handleHideClick = (_id) => {
    console.log(posts)
    setHiddenPosts((prevHiddenPosts) => ({
      ...prevHiddenPosts,
      [_id]: true,
    }));
  };

  const handleViewTypes = () => {
    setShowViewOptions(!showViewOptions);
    setShowSortOptions(false); // Close the sort options dropdown
  };

  const calculateTimeSinceCreation = (createdAt) => {
    const currentTime = new Date();
    const postTime = new Date(createdAt);
    const timeDifference = currentTime - postTime;
  
    // Convert milliseconds to seconds
    const seconds = Math.floor(timeDifference / 1000);
  
    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  }

  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + ".....";
    }
    return text;
  };

  const renderMediaOrTruncateText = (media, content) => {
    const maxTextLength = 450;
    if (media) {
      return renderMedia(media, content);
    } else {
      return <p>{truncateText(content, maxTextLength)}</p>;
    }
  };

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

  return (
    <div className="container">
      <ToastContainer />

      <div className="choice-above-posts">
        <div className="content-sort-type">
          <button className="content-drop-down-list" onClick={handleSortTypes}>
            {sortingType.charAt(0).toUpperCase() + sortingType.slice(1)}{" "}
            <MdKeyboardArrowDown />
          </button>
          {showSortOptions && (
            <div className="options-content-sort-drop-down-list">
              <button onClick={() => handleSortingOption("Best")}>Best</button>
              <button onClick={() => handleSortingOption("Hot")}>Hot</button>
              <button onClick={() => handleSortingOption("Top")}>Top</button>
              <button onClick={() => handleSortingOption("New")}>New</button>
            </div>
          )}
        </div>

        <div className="content-view-type">
          <button className="content-drop-down-list" onClick={handleViewTypes}>
            {viewType === "card" ? <BsViewStacked /> : <BsViewList />}{" "}
            <MdKeyboardArrowDown />
          </button>
          {showViewOptions && (
            <div className="options-content-view-drop-down-list">
              <button
                onClick={() => {
                  setViewType("card");
                  setShowViewOptions(false);
                }}
              >
                <BsViewStacked />
              </button>
              <button
                onClick={() => {
                  setViewType("compact");
                  setShowViewOptions(false);
                }}
              >
                <BsViewList />
              </button>
            </div>
          )}
        </div>
      </div>

      {loading ? (
  <p>Loading...</p>
) : (
  <div className="post-list">
    {posts.length === 0 ? (
      <p>No posts to display.</p>
    ) : (
      posts.map((post) => (
        !hiddenPosts[post._id] ? (
          viewType === "card" ? (
            <PostCard
              key={post._id}
              post={post}
              joinStates={joinStates}
              saveStates={saveStates}
              handleJoinClick={handleJoinClick}
              handleSaveClick={handleSaveClick}
              handleReportClick={handleReportClick}
              handleHideClick={handleHideClick}
              handleUpvoteClick={handleUpvoteClick}
              handleDownvoteClick={handleDownvoteClick}
              renderMediaOrTruncateText={renderMediaOrTruncateText}
              calculateTimeSinceCreation={calculateTimeSinceCreation}
            />
          ) : (
            <CompactPostCard
              key={post.id}
              post={post}
              joinStates={joinStates}
              saveStates={saveStates}
              handleJoinClick={handleJoinClick}
              handleSaveClick={handleSaveClick}
              handleReportClick={handleReportClick}
              handleHideClick={handleHideClick}
              handleUpvoteClick={handleUpvoteClick}
              handleDownvoteClick={handleDownvoteClick}
              renderMediaWithCount={renderMediaWithCount}
              renderMedia={renderMedia}
            />
          )
        ) : (
          <div key={post._id} className="hidden-post-card">
            <p>Post hidden</p>
            <button
              onClick={() =>
                setHiddenPosts((prevHiddenPosts) => ({
                  ...prevHiddenPosts,
                  [post._id]: false,
                }))
              }
            >
              Undo
            </button>
          </div>
        )
      ))
    )}
  </div>
)}

    </div>
  );
};

export default Content;
