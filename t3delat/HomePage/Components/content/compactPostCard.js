import React, { useState, useRef, useEffect } from "react";
import "./compactPostCard.css";
import { BiHide } from "react-icons/bi";
import { CiViewList } from "react-icons/ci";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { FaExpandAlt } from "react-icons/fa";

const CompactPostCard = ({
  post,
  joinStates,
  saveStates,
  handleJoinClick,
  handleSaveClick,
  handleHideClick,
  handleUpvoteClick,
  handleDownvoteClick,
  renderMediaWithCount,
  renderMedia
}) => {
  const [expanded, setExpanded] = useState(false);
  const postRef = useRef(null);

  useEffect(() => {
    if (expanded) {
      adjustPostHeight();
    } else {
      resetPostHeight();
    }
  }, [expanded, post.text]);

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
      className={`compact-post-card ${expanded ? "expanded" : ""}`}
      ref={postRef}
    >
      <div className="compact-post-card-header">
        <p>{post.reason}</p>
        <div className="compact-post-card-dropdown">
          <button className="compact-post-card-dropbtn">
            &#8226;&#8226;&#8226;
          </button>
          <div className="compact-post-card-dropdown-content">
            <a href="#">
              <BiHide /> show fewer posts like this
            </a>
          </div>
        </div>
      </div>

      <div className="compact-post-card-body">
        <div className="compact-post-card-left">
          {post.media === 0 ? (
            <CiViewList />
          ) : (
            renderMediaWithCount(post.media, post.text)
          )}
        </div>

        <div className="compact-post-card-right">
  <div className="compact-post-card-right-header">
    <img
      src={post.image}
      className="compact-post-card-profile-photo"
      alt={post.content}
    />
    <p>r/{post.name}</p>
    <button
      className="compact-post-card-join-btn"
      onClick={() => handleJoinClick(post.postId)}
    >
      {joinStates[post.postId] ? "Leave" : "Join"}
    </button>
    <p>{post.time} ago</p>
  </div>
  <p>
    <b>{post.title}</b>
  </p>

  {expanded && (!post.content ? renderMedia(post.media) : <p>{post.content}</p>)}

  <div className="compact-post-card-interaction">
    <button
      className="compact-post-card-interaction-expand"
      onClick={handleExpandClick}
    >
      <FaExpandAlt />
    </button>

    <div className="compact-post-card-interaction-voting">
      <button
        onClick={() => handleUpvoteClick(post.id,1)}
        className={post.upvoted ? "upvoted" : ""}
      >
        <BiUpvote />
      </button>
      <p>{post.likes}</p>
      <button
        onClick={() => handleDownvoteClick(post.id,-1)}
        className={post.downvoted ? "downvoted" : ""}
      >
        <BiDownvote />
      </button>
    </div>

    <div className="compact-post-card-interaction-text-buttons">
      <button className="compact-post-card-interaction-comments-button">
        {post.comments} comments
      </button>
      <button>Share</button>
      <button
      onClick={() => handleSaveClick(post.postId)}
    >
      {saveStates[post.postId] ? "Unsave" : "Save"}
    </button>
      <button onClick={() => handleHideClick(post.postId)}>Hide</button>
      <button>Report</button>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default CompactPostCard;
