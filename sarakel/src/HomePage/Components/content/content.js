import React, { useState, useEffect,useRef } from "react";
import styles from "./content.module.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsViewList, BsViewStacked } from "react-icons/bs";
import ReactPlayer from "react-player";
import PostCard from "./postCard.js";
import CompactPostCard from "./compactPostCard.js";
import { CiViewList } from "react-icons/ci";
import { AiOutlinePicture } from "react-icons/ai";
import ImageSlider from "./imageSlider";
import { RiVideoFill } from "react-icons/ri";
import { HiMiniUserGroup } from "react-icons/hi2";
import { useAuth } from "../AuthContext.js"; //import
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import SyncLoader from "react-spinners/SyncLoader";
import "react-toastify/dist/ReactToastify.css";
import { TbUserPentagon } from "react-icons/tb";
import { TbHandClick } from "react-icons/tb";

const Content = () => {
  const [posts, setPosts] = useState([]);
  const [recentPosts,setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hiddenPosts, setHiddenPosts] = useState({});
  const [joinStates, setJoinStates] = useState({});
  const [saveStates, setSaveStates] = useState({});
  const [viewType, setViewType] = useState("card");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [sortingType, setSortingType] = useState("new");
  const [showViewOptions, setShowViewOptions] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedCommunityId, setCommunityId] = useState(null);
  const [page, setPage] = useState(1);
  const [endOfPosts, setEndOfPosts] = useState(false); // New state to track the end of posts
  const contentRef = useRef(null);
  const { token } = useAuth(); //init

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url;
        if (token) {
          // If user is logged in (token exists)
          url = `http://localhost:5000/api/subreddit/get${
            sortingType.charAt(0).toUpperCase() + sortingType.slice(1)
          }?page=${page}`; // Include page number in the API endpoint
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
        console.log("before response data")
        const responseData = await response.json();
        console.log("Response data:", responseData.data.posts); // For debugging
        if (response.ok) {
          // If new posts are received
          if (Array.isArray(responseData.data.posts) && responseData.data.posts.length > 0) {
            // Append new posts to existing posts
            setPosts(prevPosts => [...prevPosts, ...responseData.data.posts]);
            setLoading(false);
          } else {
            // If no new posts are received, set endOfPosts to true
            setEndOfPosts(true);
          }
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
  }, [sortingType, token, page]); // Include 'page' as a dependency in useEffect
  

  // useEffect(() => {
  //   console.log("Inside useEffect");
  //   const handleScroll = () => {
  //     console.log("Inside handleScroll");
  //     console.log("Scroll position:", window.innerHeight + document.documentElement.scrollTop);
  //     console.log("Page height:", document.documentElement.offsetHeight);
  //     if (
  //       window.innerHeight - document.documentElement.scrollTop ===
  //       document.documentElement.offsetHeight
  //     ) {
  //       console.log("Reached bottom of page");
  //       setPage(prevPage => prevPage + 1);
  //       console.log("Page:", page);
  //     }
  //   };
  //   console.log("Adding scroll event listener");
  //   // Add event listener for scroll
  //   window.addEventListener("scroll", handleScroll);
  
  //   // Remove event listener when component unmounts
  //   return () => {
  //     console.log("Removing scroll event listener");
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [page]);
  

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        if (!token) {
          return; // No need to fetch if not logged in
        }

        const response = await fetch("http://localhost:5000/api/recentlyViewedPosts", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

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

  const handleJoinClick = async (_id, name) => {
    if (!token) {
      toast.error("You need to Login first");
      return;
    }
    try {
      // const { name, userId } = getPostInfo(_id);
      const isJoining = !joinStates[_id];
      const response = await fetch(
        `http://localhost:5000/api/community/${isJoining ? "join" : "leave"}`,
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
      console.log("response : ", response);
      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData.message);
        toast.success(responseData.message);
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
      const response = await fetch(
        `http://localhost:5000/api/${isSaved ? "unsave" : "save"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            type: "post",
            entityId: _id,
          }),
        }
      );
      const responseData = await response.json();
      console.log("catch");
      console.log(responseData.message);
      if (response.ok) {
        toast.success(responseData.message);
        console.log("catch");
        console.log(responseData.message);
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
      toast.success(responseData.message);
    } catch (error) {
      console.error("Error reporting post:", error);
      toast.error("Failed to report post");
    }
  };

  const checkUserVote = async (postId) => {
    try {
      // Extract username from session storage
      const username = sessionStorage.getItem("username");
      if (!username) {
        throw new Error("Username not found in session storage");
      }
  
      // Make request to API for upvoted posts
      const upvotedResponse = await fetch(`http://localhost:5000/api/user/${username}/upvoted`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
  
      if (!upvotedResponse.ok) {
        throw new Error(`HTTP error! Status: ${upvotedResponse.status}`);
      }
  
      const upvotedData = await upvotedResponse.json();
  
      // Check if the post exists in the list of upvoted posts
      const isUpvoted = upvotedData.upvotes.some(([type, posts]) => {
        return posts.some(post => post._id === postId);
      });
      if (isUpvoted) {
        return 1; // Post is upvoted
      }
  
      // Make request to API for downvoted posts
      const downvotedResponse = await fetch(`http://localhost:5000/api/user/${username}/downvoted`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
  
      if (!downvotedResponse.ok) {
        throw new Error(`HTTP error! Status: ${downvotedResponse.status}`);
      }
  
      const downvotedData = await downvotedResponse.json();
  
      // Check if the post exists in the list of downvoted posts
      const isDownvoted = downvotedData.upvotes.some(([type, posts]) => {
        return posts.some(post => post._id === postId);
      });
      if (isDownvoted) {
        return -1; // Post is downvoted
      }
  
      // Post is neither upvoted nor downvoted
      return 0;
    } catch (error) {
      console.error("Error checking voted posts:", error);
      return 0; // Default to not voted
    }
  };
  
  const addMorePosts = () =>{
    setPage(prevPage => prevPage + 1);
    console.log("page : "+page)
  }
  const handleHideClick = (_id) => {
    console.log(posts);
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

  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + ".....";
    }
    return text;
  };

  const renderMediaOrTruncateText = (media, content) => {
    const maxTextLength = 510;
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
        return <img src={media} alt={text} className={styles["post-image"]} />;
      } else {
        return (
          <ReactPlayer url={media} width="540px" height="500px" controls />
        );
      }
    } else {
      return null;
    }
  };

  const handleCommunityClick = (communityID) => {
    if (!communityID) {
      return;
    }
    setSelectedPostId(null);
    setCommunityId(communityID);
  };

  const handlePostClick = (passedId) => {
    if (!passedId) {
      return;
    }

    console.log("inside handle post click")
    fetch(`http://localhost:5000/api/viewPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postId: passedId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response from backend verifying done:", data);
        setSelectedPostId(passedId);
      })
      .catch((error) => {
        console.error("Error sending request to backend:", error);
      });
  };

  useEffect(() => {
    console.log("selectedPostId updated:", selectedPostId);
  }, [selectedPostId]);

  const handleBackButtonClick = () => {
    setSelectedPostId(null);
  };

  const renderMediaWithCount = (media, text) => {
    if (!media) {
      return (
        <CiViewList
          className={styles["compact-post-card-image-compensation"]}
        />
      );
    } else if (Array.isArray(media)) {
      if (media.length === 1) {
        return (
          <img
            src={media[0]}
            alt={text}
            className={styles["compact-post-card-image"]}
          />
        );
      } else {
        return (
          <>
            <img
              src={media[0]}
              alt={text}
              className={styles["compact-post-card-image"]}
            />
            <span className={styles["compact-post-card-image-count"]}>
              <AiOutlinePicture />
              {media.length}
            </span>
          </>
        );
      }
    } else if (typeof media === "string") {
      if (media.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        return (
          <img
            src={media}
            alt={text}
            className={styles["compact-post-card-image"]}
          />
        );
      } else {
        return (
          <RiVideoFill
            className={styles["compact-post-card-image-compensation"]}
          />
        );
      }
    } else {
      return (
        <CiViewList
          className={styles["compact-post-card-image-compensation"]}
        />
      );
    }
  };

  return (
    <div className={styles["container"]}>
      <ToastContainer />
      {!selectedPostId && (
        <div className={styles["choice-above-posts"]}>
          <div className={styles["content-sort-type"]}>
            <button
              className={styles["content-drop-down-list"]}
              onClick={handleSortTypes}
            >
              {sortingType.charAt(0).toUpperCase() + sortingType.slice(1)}{" "}
              <MdKeyboardArrowDown />
            </button>
            {showSortOptions && (
              <div className={styles["options-content-sort-drop-down-list"]}>
                { <button onClick={() => handleSortingOption("Best")}>
                  Best
                </button>
                /*
                <button onClick={() => handleSortingOption("Hot")}>Hot</button>
                <button onClick={() => handleSortingOption("Top")}>Top</button> */}
                <button onClick={() => handleSortingOption("New")}>New</button>
              </div>
            )}
          </div>

          <div className={styles["content-view-type"]}>
            <button
              className={styles["content-drop-down-list"]}
              onClick={handleViewTypes}
            >
              {viewType === "card" ? <BsViewStacked /> : <BsViewList />}{" "}
              <MdKeyboardArrowDown />
            </button>
            {showViewOptions && (
              <div className={styles["options-content-view-drop-down-list"]}>
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
      )}

      <div className={styles["post-list-container"]}>
        {selectedPostId && <Navigate to={`/post/${selectedPostId}`} />}
        {selectedCommunityId && (
          <Navigate to={`/community/${selectedCommunityId}`} />
        )}

        {!selectedPostId && (
          <div className={styles["post-list"]}>
            {loading ? (
              // Loading Indicator
              <div className={styles["loading-posts"]}>
                <p>Loading...</p>
                <SyncLoader color="black" />
              </div>
            ) : (
              <>
                {/* Render Posts */}
                {posts.length === 0 ? (
                  // No Posts Message
                  <p className={styles["loading-posts"]}>
                    No posts to display.
                  </p>
                ) : (
                  posts.map((post) => {
                    if (!hiddenPosts[post._id]) {
                      return (
                        // Conditional Rendering of Post Card or Compact Post Card
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
                            handleVoteClick={handleVoteClick}
                            renderMediaOrTruncateText={
                              renderMediaOrTruncateText
                            }
                            calculateTimeSinceCreation={
                              calculateTimeSinceCreation
                            }
                            handlePostClick={handlePostClick}
                            handleCommunityClick={handleCommunityClick}
                            checkUserVote={checkUserVote}
                          />
                        ) : (
                          <CompactPostCard
                            key={post._id}
                            post={post}
                            joinStates={joinStates}
                            saveStates={saveStates}
                            handleJoinClick={handleJoinClick}
                            handleSaveClick={handleSaveClick}
                            handleReportClick={handleReportClick}
                            handleHideClick={handleHideClick}
                            handleVoteClick={handleVoteClick}
                            renderMediaOrTruncateText={renderMediaOrTruncateText}
                            calculateTimeSinceCreation={
                              calculateTimeSinceCreation
                            }
                            renderMediaWithCount={renderMediaWithCount}
                            renderMedia={renderMedia}
                            handlePostClick={handlePostClick}
                            handleCommunityClick={handleCommunityClick}
                          />
                        )
                      );
                    } else {
                      return (
                        // Hidden Post Message
                        <div
                          key={post._id}
                          className={styles["hidden-post-card"]}
                        >
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
                      );
                    }
                  })
                )}
              </>
            )}
          {/* back to top */}
          <button onClick={() => addMorePosts()} className={styles["load-more-posts-button"]}><TbHandClick />More posts</button>
          </div>
        )}
{token && <div className={styles["content-recent-posts"]}>
          <div className={styles["content-recent-posts-header"]}>
            <h6>Recent posts</h6>
            <button>clear</button>
          </div>
          {recentPosts.map((recent)=>(
              <div key={recent._id}>
                <div className={styles["content-recent-posts-community"]}>
                  <TbUserPentagon className={styles['content-recent-posts-image']}/>
                <p>r/{recent.communityId}</p>
                </div>
                <p>{recent.title}</p>
                <div className={styles["content-recent-posts-last"]}>
                <p>{recent.upvotes - recent.downvotes} votes</p>
                <p>{calculateTimeSinceCreation(recent.createdAt)}</p>
                </div>
                <hr/>
              </div>
            ))}
        </div>}
      </div>
    </div>
  );
};

export default Content;
