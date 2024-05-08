import React, { useState, useRef, useEffect } from "react";
import { BiHide } from "react-icons/bi";
import { CiViewList } from "react-icons/ci";
import {BiSolidUpvote, BiSolidDownvote, BiUpvote, BiDownvote } from "react-icons/bi";
import { FaExpandAlt } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import styles from "./compactPostCard.module.css";
import { useAuth } from "../AuthContext.js"; //import
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 


const CompactPostCard = ({
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
  renderMediaWithCount,
  renderMedia,
  handlePostClick,
  handleCommunityClick
}) => {
  const [expanded, setExpanded] = useState(false);
  const [voteStatus, setVoteStatus] = useState(null);
  const { token } = useAuth(); //ini
  const postRef = useRef(null);

  useEffect(() => {
    if (expanded) {
      adjustPostHeight();
    } else {
      resetPostHeight();
    }
  }, [expanded, post.text]);

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
  const handleExpandClick = (event) => {
    event.stopPropagation();
    setExpanded(!expanded);
  };

  const handleVoteButtonClick= (event,rank) => {
    event.stopPropagation();
    toggleVote(rank);
  };
  const handleShareButton = (event) => {
    event.stopPropagation();
    navigator.clipboard.writeText(`http://57.151.116.81:3000/post/${post._id}`);
    toast.success("Link copied");
  }
  const handleSaveButtonClick = (event,postId)=>{
    event.stopPropagation();
    handleSaveClick(postId);
  }
  const handleReportButtonClick = (event, postId, Username) => {
    event.stopPropagation();
    handleReportClick(postId, Username);
  };
  const handleHideButtonClick = (event,postId)=>{
    event.stopPropagation();
    handleHideClick(postId);
  };
  const handleJoinButtonClick = (event,postId,communityId)=>{
    event.stopPropagation();
    handleJoinClick(postId,communityId);
  }
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

  return (
    <div
      className={`${styles["compact-post-card"]} ${expanded ? styles["expanded"] : ""}`}
      ref={postRef}
      onClick={() => handlePostClick(post._id)}
    >
      <div className={styles["compact-post-card-header"]}>
        <p>{post.reason}</p>
        <div className={styles["compact-post-card-dropdown"]}>
          <button className={styles["compact-post-card-dropbtn"]}>
            &#8226;&#8226;&#8226;
          </button>
          <div className={styles["compact-post-card-dropdown-content"]}>
            <a href="#">
              <BiHide /> show fewer posts like this
            </a>
          </div>
        </div>
      </div>

      <div className={styles["compact-post-card-body"]}>
        <div className={styles["compact-post-card-left"]}>
          {post.media === 0 ? (
            <CiViewList />
          ) : (
            renderMediaWithCount(post.media, post.text)
          )}
        </div>

        <div className={styles["compact-post-card-right"]}>
          <div className={styles["compact-post-card-right-header"]} >
            {post.image ? (
              <img src={post.image} className={styles["compact-post-card-profile-photo"]} alt={post.title} />
            ) : (
              <HiMiniUserGroup className={styles["compact-post-card-profile-photo"]} />
            )}
            <p>r/{post.communityId}</p>
            <button
              className={styles["compact-post-card-join-btn"]}
              onClick={(event) => handleJoinButtonClick(event,post._id,post.communityId)}
            >
              {joinStates[post._id] ? "Leave" : "Join"}
            </button>
            <p>{calculateTimeSinceCreation(post.createdAt)}</p>
          </div>
          <p>
            <b>{post.title}</b>
          </p>

          {expanded && (post.media ? renderMedia(post.media) : <p>{post.content}</p>)}

          <div className={styles["compact-post-card-interaction"]}>
            <button
              className={styles["compact-post-card-interaction-expand"]}
              onClick={(event) => handleExpandClick(event)}
            >
              <FaExpandAlt />
            </button>

            <div className={styles["compact-post-card-interaction-voting"]}>
              <button
              onClick={(event)=>handleVoteButtonClick(event,1)}
              className={styles["upvote-button"]}
              style={{ backgroundColor: voteStatus === 1 ? "rgba(128, 128, 128, 0.3)" : "transparent" }}
            >
              {voteStatus === 1 ? <BiSolidUpvote color="red" /> : <BiUpvote />}
            </button>
              <p>{post.upvotes - post.downvotes + (voteStatus ? voteStatus : 0)}</p>
            <button
              onClick={(event)=>handleVoteButtonClick(event,-1)}
              className={styles["downvote-button"]}
              style={{ backgroundColor: voteStatus === -1 ? "rgba(128, 128, 128, 0.3)" : "transparent" }}
            >
              {voteStatus === -1 ? <BiSolidDownvote color="blue" /> : <BiDownvote />}
            </button>
            </div>

            <div className={styles["compact-post-card-interaction-text-buttons"]}>
              <button className={styles["compact-post-card-interaction-comments-button"]}>
                {post.comments} comments
              </button>
              <button onClick={(event) => handleShareButton(event)}>Share</button>
              <button
                onClick={(event) => handleSaveButtonClick(event,post._id)}
              >
                {saveStates[post._id] ? "Unsave" : "Save"}
              </button>
              <button onClick={(event) => handleHideButtonClick(event,post._id)}>Hide</button>
              <button onClick={(event) =>handleReportButtonClick(event,post._id,post.username)}>Report</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactPostCard;
