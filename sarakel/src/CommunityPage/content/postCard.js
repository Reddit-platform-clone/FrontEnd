import React, { useState, useEffect } from "react";
import { BiSolidUpvote, BiSolidDownvote, BiUpvote, BiDownvote } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";
import { BiHide } from "react-icons/bi";
import { CiBookmark, CiFlag1 } from "react-icons/ci";
import { HiMiniUserGroup } from "react-icons/hi2";
import { useAuth } from "../../HomePage/Components/AuthContext"; //import
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
}) => {
  const [voteStatus, setVoteStatus] = useState(null);
  const [communityInfo, setCommunityInfo] = useState(null); // State to hold community info
  const { token } = useAuth(); //init
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Function to fetch community info based on _id
    const fetchCommunityInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/community/${post._id}/getCommunityInfo`);
        const data = await response.json();
        setCommunityInfo(data); // Set community info state
        console.log("Community info response:", communityInfo);
        console.log("Community info:", data);
      } catch (error) {
        console.error("Error fetching community info:", error);
      }
    };

    if (post.communityId) {
      fetchCommunityInfo(); // Fetch community info when post.communityId changes
    }
  }, [post.communityId]);

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


  return (
    <div onClick={() => handlePostClick(post)} className={`${classes["post-card"]} ${!post.media ? classes["no-media"] : ""}`}>
      <div className={classes["post-info"]}>
        <div className={classes["post-header"]}>
          <div className={classes["post-header-left"]} onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}>
            {post.image ? (
              <img src={post.image} className={classes["profile-photo"]} alt={post.title} />
            ) : (
              <HiMiniUserGroup className={classes["profile-photo"]} />
            )}
            <p><b>r/{post.communityId}</b></p>
            <p>.</p>
            <p>{calculateTimeSinceCreation(post.createdAt)}</p>
            {isHovering && (
        <div className={classes["post-card-hovered-community"]}>
          <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/1200px-Logo_of_AC_Milan.svg.png'}  className={classes["post-card-hovered-community-background-photo"]}/>
          <h2>Card Title</h2>
          <p>Some card details here...</p>
        {post.communityDesc}
        </div>
      )}
          </div>
          <div className={classes["post-header-right"]}>
            <button
              className={classes["join-btn-post"]}
              onClick={() => handleJoinClick(post._id, post.communityId)}
            >
              {joinStates[post._id] ? "Leave" : "Join"}
            </button>
            <div className={classes["dropdown-post"]}>
              <button className={classes["dropbtn-post"]}>&#8226;&#8226;&#8226;</button>
              <div className={classes["dropdown-content-post"]}>
                <a href="#"><BiHide /> show fewer posts like this</a>
                <a href="#" onClick={() => handleSaveClick(post._id)}>
                  <CiBookmark /> {saveStates[post._id] ? "Unsave" : "save"}
                </a>
                <a href="#" onClick={() => handleReportClick(post._id, post.username)}>
                  <CiFlag1 /> report
                </a>
                <a href="#" onClick={() => handleHideClick(post._id)}><BiHide /> hide</a>
              </div>
            </div>
          </div>
        </div>
        <p className={classes["post-title"]}><b>{post.title}</b></p>
        {/* <p>{communityInfo?.data?.data?.description || "No description"}</p> */}
        {renderMediaOrTruncateText(post.media, post.content, false)}
      </div>
      <div className={classes["interaction-container"]}>
        <div className={classes["interaction"]}>
          <div className={classes["left-post"]}>
            <button
              onClick={() => toggleVote(1)}
              className={classes["upvote-button"]}
              style={{ backgroundColor: voteStatus === 1 ? "rgba(128, 128, 128, 0.3)" : "transparent" }}
            >
              {voteStatus === 1 ? <BiSolidUpvote color="red" /> : <BiUpvote />}
            </button>
            <p>{post.upvotes - post.downvotes + (voteStatus ? voteStatus : 0)}</p>
            <button
              onClick={() => toggleVote(-1)}
              className={classes["downvote-button"]}
              style={{ backgroundColor: voteStatus === -1 ? "rgba(128, 128, 128, 0.3)" : "transparent" }}
            >
              {voteStatus === -1 ? <BiSolidDownvote color="blue" /> : <BiDownvote />}
            </button>
          </div>
          <div className={classes["middle-post"]}>
            <button><FaRegCommentAlt /></button>
            <p>{post.numberOfComments}</p>
          </div>
          <div className={classes["right-post"]}>
            <button><IoShareOutline /></button>
            <p>Share</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
