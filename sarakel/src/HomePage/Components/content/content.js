import React, { useState, useEffect } from "react";
import jsonData from "../mock.json";
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
import { useAuth } from '../AuthContext.js';



const Content = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [communities, setCommunities] = useState([]);
  const [hiddenPosts, setHiddenPosts] = useState({});
  const [joinStates, setJoinStates] = useState({});
  const[saveStates, setSaveStates]= useState({});
  const [viewType, setViewType] = useState("card");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showViewOptions, setShowViewOptions] = useState(false);
  const { token } = useAuth();


  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setPosts(jsonData.posts);
        setCommunities(jsonData.communities);
        setLoading(false);
      }, 1000);
    };

    fetchData();

    return () => {
      // Cleanup tasks if needed
    };
  }, []);

  const getCommunityName = (communityId) => {
    const community = communities.find((c) => c.id === communityId);
    return community ? community.name : "Unknown";
  };

  const getCommunityImage = (communityId) => {
    const community = communities.find((c) => c.id === communityId);
    return community ? community.image : "default_community_image_url";
  };

  const handleUpvoteClick = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
            ...post,
            upvoted: !post.upvoted,
            downvoted: false,
            likes: post.upvoted
              ? parseInt(post.likes) - 1
              : parseInt(post.likes) + 1, // Parse likes to integer
          }
          : post
      )
    );
  };

  const handleDownvoteClick = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
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

  const handleJoinClick = (postId) => {
    setJoinStates((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const handleSaveClick = (postId) => {
    setSaveStates((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const handleHideClick = (postId) => {
    setHiddenPosts((prevHiddenPosts) => ({
      ...prevHiddenPosts,
      [postId]: true,
    }));
  };

  const handleSortTypes = () => {
    setShowSortOptions(!showSortOptions);
    setShowViewOptions(false);
  };

  const handleViewTypes = () => {
    setShowViewOptions(!showViewOptions);
    setShowSortOptions(false); // Close the sort options dropdown
  };


  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "....."; // Add ellipsis if text is truncated
    }
    return text;
  };

  const renderMediaOrTruncateText = (media, text) => {
    const maxTextLength = 450; // Define the maximum length for text display

    if (media) {
      // If media is present, call renderMedia function
      return renderMedia(media, text);
    } else {
      // If media is not present, call truncateText function
      return <p>{truncateText(text, maxTextLength)}</p>;
    }
  };

  const renderMedia = (media, text) => {
    if (Array.isArray(media)) {
      // If media is an array, assume it's a list of images and render the ImageSlider component
      return <ImageSlider slides={media} viewType={viewType} />;
    } else if (typeof media === "string") {
      // If media is a string, check if it's a direct link to an image and render it
      if (media.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        return <img src={media} alt={text} className="post-image" />;
      } else {
        // If it's not an image URL, assume it's a video and render using React Player
        return (
          <ReactPlayer url={media} width="540px" height="500px" controls />
        );
      }
    } else {
      // If media is neither an array nor a string, return null or handle it according to your requirements
      return null;
    }
  };
  

  const renderMediaWithCount = (media, text) => {
    if (!media) {
      // If media is not provided, return CiViewList component
      return <CiViewList className="compact-post-card-image-compensation" />;
    } else if (Array.isArray(media)) {
      // If media is an array
      if (media.length === 1) {
        // If it contains only one image, render the image
        return (
          <img src={media[0]} alt={text} className="compact-post-card-image" />
        );
      } else {
        // If it contains multiple images, render the first image and return the count
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
      // If media is a string
      if (media.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        // If it's a direct link to an image, render the image
        return (
          <img src={media} alt={text} className="compact-post-card-image" />
        );
      } else {
        // If it's not an image URL, assume it's a video and return CiViewList component
        return <RiVideoFill className="compact-post-card-image-compensation" />;
      }
    } else {
      // If media is neither an array nor a string, return CiViewList component
      return <CiViewList className="compact-post-card-image-compensation" />;
    }
  };

  

  return (
    <div className="container">
      <div className="choice-above-posts">
        <div className="content-sort-type">
          <button className="content-drop-down-list" onClick={handleSortTypes}>
            Best <MdKeyboardArrowDown />
          </button>
          {showSortOptions && (
            <div className="options-content-sort-drop-down-list">
              <button>Hot</button>
              <button>Rising</button>
              <button>Top</button>
              <button>New</button>
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
              <button onClick={() => { setViewType("card"); setShowViewOptions(false); }}>
                <BsViewStacked />
              </button>
              <button onClick={() => { setViewType("compact"); setShowViewOptions(false); }}>
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
            posts.map((post) =>
              !hiddenPosts[post.id] ? (
                // Conditionally render either PostCard or CompactPostCard based on viewType
                viewType === "card" ? (
                  <PostCard
                    key={post.id}
                    post={post}
                    joinStates={joinStates}
                    saveStates={saveStates}
                    handleJoinClick={handleJoinClick}
                    handleSaveClick={handleSaveClick}
                    handleHideClick={handleHideClick}
                    handleUpvoteClick={handleUpvoteClick}
                    handleDownvoteClick={handleDownvoteClick}
                    getCommunityName={getCommunityName}
                    getCommunityImage={getCommunityImage}
                    renderMediaOrTruncateText={renderMediaOrTruncateText}
                  />
                ) : (
                  <CompactPostCard
                    key={post.id}
                    post={post}
                    joinStates={joinStates}
                    saveStates={saveStates}
                    handleJoinClick={handleJoinClick}
                    handleSaveClick={handleSaveClick}
                    handleHideClick={handleHideClick}
                    handleUpvoteClick={handleUpvoteClick}
                    handleDownvoteClick={handleDownvoteClick}
                    getCommunityName={getCommunityName}
                    getCommunityImage={getCommunityImage}
                    renderMediaWithCount={renderMediaWithCount}
                    renderMedia={renderMedia}
                  />
                )
              ) : (
                <div key={post.id} className="hidden-post-card">
                  <p>Post hidden</p>
                  <button
                    onClick={() =>
                      setHiddenPosts((prevHiddenPosts) => ({
                        ...prevHiddenPosts,
                        [post.id]: false,
                      }))
                    }
                  >
                    Undo
                  </button>
                </div>
              )
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Content;
