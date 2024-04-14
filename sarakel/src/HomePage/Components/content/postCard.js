import React from "react";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";
import { BiHide } from "react-icons/bi";
import { CiBookmark, CiFlag1 } from "react-icons/ci";

const postCard = ({
  post,
  joinStates,
  saveStates,
  handleJoinClick,
  handleSaveClick,
  handleHideClick,
  handleUpvoteClick,
  handleDownvoteClick,
  getCommunityName,
  getCommunityImage,
  renderMediaOrTruncateText,
}) => (
  <div className={`post-card ${!post.media ? "no-media" : ""}`}>
    <div className="post-info">
      <div className="post-header">
        <div className="post-header-left">
          <img
            src={getCommunityImage(post.community_id)}
            className="profile-photo"
            alt={post.text}
          />
          <p>
            <b>r/{getCommunityName(post.community_id)}</b>
          </p>
          <p>.</p>
          <p>{post.time} ago</p>
          <p>.</p>
          <p>{post.reason}</p>
        </div>
        <div className="post-header-right">
          <button
            className="join-btn-post"
            onClick={() => handleJoinClick(post.id)}
          >
            {joinStates[post.id] ? "Leave" : "Join"}
          </button>
          <div className="dropdown-post">
            <button className="dropbtn-post">&#8226;&#8226;&#8226;</button>
            <div className="dropdown-content-post">
              <a href="#">
                <BiHide /> show fewer posts like this
              </a>
              <a href="#" onClick={() => handleSaveClick(post.id)}>
                <CiBookmark /> {saveStates[post.id] ? "Unsave" : "save"}
              </a>
              <a href="#">
                <CiFlag1 /> report
              </a>
              <a href="#" onClick={() => handleHideClick(post.id)}>
                <BiHide /> hide
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className="post-title">
        <b>{post.title}</b>
      </p>
      {renderMediaOrTruncateText(post.media, post.text, false)}
    </div>
    <div className="interaction-container">
      <div className="interaction">
        <div className="left-post">
          <button
            onClick={() => handleUpvoteClick(post.id)}
            className={post.upvoted ? "upvoted" : ""}
          >
            <BiUpvote />
          </button>
          <p>{post.likes}</p>
          <button
            onClick={() => handleDownvoteClick(post.id)}
            className={post.downvoted ? "downvoted" : ""}
          >
            <BiDownvote />
          </button>
        </div>
        <div className="middle-post">
          <button>
            <FaRegCommentAlt />
          </button>
          <p>{post.comments}</p>
        </div>
        <div className="right-post">
          <button>
            <IoShareOutline />
          </button>
          <p>Share</p>
        </div>
      </div>
    </div>
  </div>
);

export default postCard;
