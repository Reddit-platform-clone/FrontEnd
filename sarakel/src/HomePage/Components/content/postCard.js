import React from "react";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";
import { BiHide } from "react-icons/bi";
import { CiBookmark, CiFlag1 } from "react-icons/ci";
import { HiMiniUserGroup } from "react-icons/hi2";
import classes from "./postCard.module.css"

const PostCard = ({
  post,
  joinStates,
  saveStates,
  handleJoinClick,
  handleSaveClick,
  handleReportClick,
  handleHideClick,
  handleVoteClick,
  handleUpvoteClick,
  handleDownvoteClick,
  renderMediaOrTruncateText,
  calculateTimeSinceCreation,
}) => (
  <div className={`${classes["post-card"]} ${!post.media ? classes["no-media"] : ""}`}>
    <div className={classes["post-info"]}>
      <div className={classes["post-header"]}>
        <div className={classes["post-header-left"]}>
          {post.image ? (
            <img
              src={post.image}
              className={classes["profile-photo"]}
              alt={post.title}
            />
          ) : (
            <HiMiniUserGroup className={classes["profile-photo"]} />
          )}
          <p>
            <b>r/{post.username}</b>
          </p>
          <p>.</p>
          <p>{calculateTimeSinceCreation(post.createdAt)}</p>
          {/* <p>.</p> */}
          <p>{post.reason}</p>
        </div>
        <div className={classes["post-header-right"]}>
          <button
            className={classes["join-btn-post"]}
            onClick={() => handleJoinClick(post._id)}
          >
            {joinStates[post._id] ? "Leave" : "Join"}
          </button>
          <div className={classes["dropdown-post"]}>
            <button className={classes["dropbtn-post"]}>&#8226;&#8226;&#8226;</button>
            <div className={classes["dropdown-content-post"]}>
              <a href="#">
                <BiHide /> show fewer posts like this
              </a>
              <a href="#" onClick={() => handleSaveClick(post._id)}>
                <CiBookmark /> {saveStates[post._id] ? "Unsave" : "save"}
              </a>
              <a href="#" onClick={()=>handleReportClick(post._id,post.username)}>
                <CiFlag1 /> report
              </a>
              <a href="#" onClick={() => handleHideClick(post._id)}>
                <BiHide /> hide
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className={classes["post-title"]}>
        <b>{post.title}</b>
      </p>
      {renderMediaOrTruncateText(post.media, post.content, false)}
    </div>
    <div className={classes["interaction-container"]}>
      <div className={classes["interaction"]}>
        <div className={classes["left-post"]}>
          <button
            onClick={() => handleVoteClick(post._id,1)}
            className={post.upvoted ? classes["upvoted"] : ""}
          >
            <BiUpvote />
          </button>
          <p>{post.upvotes - post.downvotes}</p>
          <button
            onClick={() => handleVoteClick(post._id,-1)}
            className={post.downvoted ? classes["downvoted"] : ""}
          >
            <BiDownvote />
          </button>
        </div>
        <div className={classes["middle-post"]}>
          <button>
            <FaRegCommentAlt />
          </button>
          <p>{post.comments}</p>
        </div>
        <div className={classes["right-post"]}>
          <button>
            <IoShareOutline />
          </button>
          <p>Share</p>
        </div>
      </div>
    </div>
  </div>
);

export default PostCard;
