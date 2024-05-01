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
  renderMedia
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

  return (
    <div
      className={`${styles["compact-post-card"]} ${expanded ? styles["expanded"] : ""}`}
      ref={postRef}
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
          <div className={styles["compact-post-card-right-header"]}>
            {post.image ? (
              <img src={post.image} className={styles["compact-post-card-profile-photo"]} alt={post.title} />
            ) : (
              <HiMiniUserGroup className={styles["compact-post-card-profile-photo"]} />
            )}
            <p>r/{post.communityId}</p>
            <button
              className={styles["compact-post-card-join-btn"]}
              onClick={() => handleJoinClick(post._id,post.communityId)}
            >
              {joinStates[post._id] ? "Leave" : "Join"}
            </button>
            <p>{calculateTimeSinceCreation(post.createdAt)}</p>
          </div>
          <p>
            <b>{post.title}</b>
          </p>

          {expanded && (!post.content ? renderMedia(post.media) : <p>{post.content}</p>)}

          <div className={styles["compact-post-card-interaction"]}>
            <button
              className={styles["compact-post-card-interaction-expand"]}
              onClick={handleExpandClick}
            >
              <FaExpandAlt />
            </button>

            <div className={styles["compact-post-card-interaction-voting"]}>
              {/* <button
                onClick={() => handleVoteClick(post.id, 1)}
                className={post.upvoted ? styles["upvoted"] : ""}
              >
                <BiUpvote />
              </button> */}
              <button
              onClick={() => toggleVote(1)}
              className={styles["upvote-button"]}
              style={{ backgroundColor: voteStatus === 1 ? "rgba(128, 128, 128, 0.3)" : "transparent" }}
            >
              {voteStatus === 1 ? <BiSolidUpvote color="red" /> : <BiUpvote />}
            </button>
              <p>{post.upvotes - post.downvotes + (voteStatus ? voteStatus : 0)}</p>
            <button
              onClick={() => toggleVote(-1)}
              className={styles["downvote-button"]}
              style={{ backgroundColor: voteStatus === -1 ? "rgba(128, 128, 128, 0.3)" : "transparent" }}
            >
              {voteStatus === -1 ? <BiSolidDownvote color="blue" /> : <BiDownvote />}
            </button>
              {/* <button
                onClick={() => handleVoteClick(post.id, -1)}
                className={post.downvoted ? styles["downvoted"] : ""}
              >
                <BiDownvote />
              </button> */}
            </div>

            <div className={styles["compact-post-card-interaction-text-buttons"]}>
              <button className={styles["compact-post-card-interaction-comments-button"]}>
                {post.comments} comments
              </button>
              <button>Share</button>
              <button
                onClick={() => handleSaveClick(post._id)}
              >
                {saveStates[post._id] ? "Unsave" : "Save"}
              </button>
              <button onClick={() => handleHideClick(post._id)}>Hide</button>
              <button>Report</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactPostCard;
