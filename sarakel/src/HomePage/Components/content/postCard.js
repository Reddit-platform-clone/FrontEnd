import React, { useState, useEffect } from "react";
import {
  BiSolidUpvote,
  BiSolidDownvote,
  BiUpvote,
  BiDownvote,
} from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";
import { BiHide } from "react-icons/bi";
import { CiBookmark, CiFlag1 } from "react-icons/ci";
import { HiMiniUserGroup } from "react-icons/hi2";
import { useAuth } from "../AuthContext.js"; //import
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./postCard.module.css";

const PostCard = ({
  post,
  joinStates,
  saveStates,
  handleJoinClick,
  handleSaveClick,
  handleReportClick,
  handleHideClick,
  handleVoteClick,
  renderMediaOrTruncateText,
  calculateTimeSinceCreation,
  handlePostClick,
  handleCommunityClick,
}) => {
  const [voteStatus, setVoteStatus] = useState(null);
  const [communityInfo, setCommunityInfo] = useState(null); // State to hold community info
  const { token } = useAuth(); //init
  const [isHovering, setIsHovering] = useState(false);
  const [copied, setCopied] = useState(false);
  const [communityClick, setCommunityClick] = useState(false);

  useEffect(() => {
    // Function to fetch community info based on _id
    const fetchCommunityInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/community/${post._id}/getCommunityInfo`
        );
        const data = await response.json();
        setCommunityInfo(data); // Set community info state
        // console.log("Community info with data:", data);
      } catch (error) {
        console.error("Error fetching community info:", error);
      }
    };

    // Fetch community info if post.communityId exists
    if (post.communityId) {
      fetchCommunityInfo();
    }
  }, [post._id]); // Use post._id as the dependency

  useEffect(() => {
    // console.log("Community info with community info:", communityInfo);
  }, [communityInfo]);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

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

  const handleJoinButtonClick = (event, postId, communityId) => {
    event.stopPropagation(); // Stop event propagation to parent container
    handleJoinClick(postId, communityId);
  };

  const handleVoteButtonClick = (event, rank) => {
    event.stopPropagation(); // Stop event propagation to parent container
    toggleVote(rank);
  };

  const handleSaveButtonClick = (event, postId) => {
    event.stopPropagation();
    handleSaveClick(postId);
  };
  const handleReportButtonClick = (event, postId, Username) => {
    event.stopPropagation();
    handleReportClick(postId, Username);
  };
  const handleHideButtonClick = (event, postId) => {
    event.stopPropagation();
    handleHideClick(postId);
  };
  const handleCopyToClipboard = (event) => {
    event.stopPropagation();
    navigator.clipboard.writeText(`http://localhost:3000/post/${post._id}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      })
      .catch((error) => {
        console.error('Failed to copy:', error);
      });
      toast.success("Link copied")
  };

  return (
    <div
      onClick={() => handlePostClick(post._id, post.username)}
      className={`${classes["post-card"]} ${!post.media ? classes["no-media"] : ""}`}
    >
      <div className={classes["post-info"]}>
        <div className={classes["post-header"]}>
          <div className={classes["post-header-left"]}>
            <div
              className={classes["post-header-left-community"]}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              onClick={() => handleCommunityClick(post.communityId)}
            >
              {communityInfo?.data?.data?.displayPic ? (
                <img
                  src={communityInfo.data.data.displayPic}
                  className={classes["profile-photo"]}
                  alt={post.title}
                />
              ) : (
                <HiMiniUserGroup className={classes["profile-photo"]} />
              )}

              <p>
                <b>r/{post.communityId}</b>
              </p>
            </div>
            <p>.</p>
            <p>{calculateTimeSinceCreation(post.createdAt)}</p>
            {isHovering && (
              <div className={classes["post-card-hovered-community"]}>
                <img
                  src={communityInfo.data.data.displayPic}
                  className={
                    classes["post-card-hovered-community-background-photo"]
                  }
                />
                <h2>Card Title</h2>
                <p>Some card details here...</p>
                {post.communityDesc}
              </div>
            )}
          </div>
          <div className={classes["post-header-right"]}>
            <button
              className={classes["join-btn-post"]}
              onClick={(event) =>
                handleJoinButtonClick(event, post._id, post.communityId)
              }
            >
              {joinStates[post._id] ? "Leave" : "Join"}
            </button>
            <div className={classes["dropdown-post"]}>
              <button className={classes["dropbtn-post"]}>
                &#8226;&#8226;&#8226;
              </button>
              <div className={classes["dropdown-content-post"]}>
                <a href="#">
                  <BiHide /> show fewer posts like this
                </a>
                <a
                  href="#"
                  onClick={(event) => handleSaveButtonClick(event, post._id)}
                >
                  <CiBookmark /> {saveStates[post._id] ? "Unsave" : "save"}
                </a>
                <a
                  href="#"
                  onClick={(event) =>
                    handleReportButtonClick(event, post._id, post.username)
                  }
                >
                  <CiFlag1 /> report
                </a>
                <a
                  href="#"
                  onClick={(event) => handleHideButtonClick(event, post._id)}
                >
                  <BiHide /> hide
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className={classes["post-title"]}>
          <b>{post.title}</b>
        </p>
        {/* <p>{communityInfo?.data?.data?.description || "No description"}</p> */}
        {renderMediaOrTruncateText(post.media, post.content, false)}
      </div>
      <div className={classes["interaction-container"]}>
        <div className={classes["interaction"]}>
          <div className={classes["left-post"]}>
            <button
              onClick={(event) => handleVoteButtonClick(event, 1)}
              className={classes["upvote-button"]}
              style={{
                backgroundColor:
                  voteStatus === 1 ? "rgba(128, 128, 128, 0.3)" : "transparent",
              }}
            >
              {voteStatus === 1 ? <BiSolidUpvote color="red" /> : <BiUpvote />}
            </button>
            <p>
              {post.upvotes - post.downvotes + (voteStatus ? voteStatus : 0)}
            </p>
            <button
              onClick={(event) => handleVoteButtonClick(event, -1)}
              className={classes["downvote-button"]}
              style={{
                backgroundColor:
                  voteStatus === -1
                    ? "rgba(128, 128, 128, 0.3)"
                    : "transparent",
              }}
            >
              {voteStatus === -1 ? (
                <BiSolidDownvote color="blue" />
              ) : (
                <BiDownvote />
              )}
            </button>
          </div>
          <div className={classes["middle-post"]}>
            <button>
              <FaRegCommentAlt />
            </button>
            <p>{post.numberOfComments}</p>
          </div>
          <div className={classes["right-post"]} onClick={(event) => handleCopyToClipboard(event,post._id)}
>
            <button>
              <IoShareOutline />
            </button>
            <p>Share</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
