import React, { useState, useEffect, useRef } from "react";
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
  checkUserVote
}) => {
  const [voteStatus, setVoteStatus] = useState(null);
  const [communityInfo, setCommunityInfo] = useState(null); // State to hold community info
  const { token } = useAuth(); //init
  const [isHovering, setIsHovering] = useState(false);
  const [hoverTimeoutId, setHoverTimeoutId] = useState(null);

  useEffect(() => {
    const fetchVoteStatus = async () => {
      if (token) {
        try {
          const response = await checkUserVote(post._id);
          // Check if the post is upvoted or downvoted by the user
          if (response === 1) {
            setVoteStatus(1);
          } else if (response === -1) {
            setVoteStatus(-1);
          }
        } catch (error) {
          console.error("Error checking user vote:", error);
        }
      }
    };

    fetchVoteStatus();
  }, [post._id]);
  // useEffect(() => {
  //   const fetchCommunityInfo = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://57.151.116.81:5000/api/community/${post._id}/getCommunityInfo`
  //       );
  //       const data = await response.json();
  //       setCommunityInfo(data);
  //     } catch (error) {
  //       console.error("Error fetching community info:", error);
  //     }
  //   };

  //   if (post.communityId) {
  //     fetchCommunityInfo();
  //   }
  // }, [post._id]);

  // useEffect(() => {
  // }, [communityInfo]);

  const handleMouseOver = () => {
    const timeoutId = setTimeout(() => {
      setIsHovering(true);
    }, 500);
    setHoverTimeoutId(timeoutId);
  };

  const handleMouseOut = () => {
    clearTimeout(hoverTimeoutId);
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
    console.log("i will never fail you")
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
    navigator.clipboard.writeText(`http://57.151.116.81:3000/post/${post._id}`);
    toast.success("Link copied");
  };

  return (
    <div
      onClick={() => handlePostClick(post._id)}
      className={`${classes["post-card"]} ${!post.media ? classes["no-media"] : ""}`}
    >
      <div className={classes["post-info"]}>
        <div className={classes["post-header"]}>
          <div className={classes["post-header-left"]}>
            <div
              className={classes["post-header-left-community-wrapper"]}
              // onMouseEnter={() =>
              //   setTimeout(() => {
              //     setIsHovering(true);
              //   }, 500)
              //   }
              // onMouseLeave={() => setIsHovering(false)}
            >
              <div
                className={classes["post-header-left-community"]}
                // onMouseOver={handleMouseOver}
                // onMouseOut={handleMouseOut}
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
              {/* {isHovering && (
                <div
                  className={classes["post-card-hovered-community"]}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div>
                    {communityInfo?.data?.data?.backgroundPicUrl ? (
                      <img
                        src={communityInfo.data.data.backgroundPicUrl}
                        className={
                          classes[
                            "post-card-hovered-community-background-photo"
                          ]
                        }
                        alt={post.communityId}
                      />
                    ) : (
                      <HiMiniUserGroup
                        className={
                          classes[
                            "post-card-hovered-community-background-photo"
                          ]
                        }
                      />
                    )}
                  </div>
                  <div
                    className={classes["post-card-hovered-community-header"]}
                  >
                    {communityInfo?.data?.data?.displayPic ? (
                      <img
                        src={communityInfo.data.data.displayPic}
                        className={classes["post-card-hovered-community-photo"]}
                        alt={post.communityId}
                      />
                    ) : (
                      <HiMiniUserGroup
                        className={classes["post-card-hovered-community-photo"]}
                      />
                    )}
                    <b onClick={() => handleCommunityClick(post.communityId)}>r/{post.communityId}</b>
                    <button
                      className={classes["hover-card-join-btn-post"]}
                      onClick={(event) =>
                        handleJoinButtonClick(event, post._id, post.communityId)
                      }
                    >
                      {joinStates[post._id] ? "Leave" : "Join"}
                    </button>
                  </div>
                  <p
                    className={
                      classes["post-card-hovered-community-description"]
                    }
                  >
                    {post.communityDesc}
                  </p>
                  <b>members</b>
                  {communityInfo.data.data.members.length}
                </div>
              )} */}
            </div>
            <p>.</p>
            <p>{calculateTimeSinceCreation(post.createdAt)}</p>
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
          <div
            className={classes["right-post"]}
            onClick={(event) => handleCopyToClipboard(event, post._id)}
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
