import React, { useState, useEffect } from 'react';
import jsonData from '../mock.json';
import './content.css';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { FaRegCommentAlt } from 'react-icons/fa';
import { IoShareOutline } from 'react-icons/io5';
import { BiHide } from 'react-icons/bi';
import { CiBookmark, CiFlag1 } from 'react-icons/ci';
import ReactPlayer from "react-player";

const Content = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [communities, setCommunities] = useState([]);
  const [joinStates, setJoinStates] = useState({});
  const [hiddenPosts, setHiddenPosts] = useState({});

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
    return community ? community.name : 'Unknown';
  };

  const getCommunityImage = (communityId) => {
    const community = communities.find((c) => c.id === communityId);
    return community ? community.image : 'default_community_image_url';
  };

  const handleUpvoteClick = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              upvoted: !post.upvoted,
              downvoted: false,
              likes: post.upvoted ? parseInt(post.likes) - 1 : parseInt(post.likes) + 1, // Parse likes to integer
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
              likes: post.downvoted ? parseInt(post.likes) + 1 : parseInt(post.likes) - 1,
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

  const handleHideClick = (postId) => {
    setHiddenPosts((prevHiddenPosts) => ({
      ...prevHiddenPosts,
      [postId]: true,
    }));
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...'; // Add ellipsis if text is truncated
    }
    return text;
  };

  const renderMediaOrTruncateText = (media, text) => {
    const maxTextLength = 400; // Define the maximum length for text display

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
      // If media is an array, assume it's a list of images and render the first one
      return <img src={media[0]} alt={text} className="post-image" />;
    } else if (typeof media === 'string') {
      // If media is a string, check if it's a direct link to an image and render it
      if (media.match(/\.(jpeg|jpg|gif|png|webp)$/) != null) {
        return <img src={media} alt={text} className="post-image" />;
      } else {
        // If it's not an image URL, assume it's a video and render using React Player
        return <ReactPlayer url={media} style={{ width: "540px", height: "500px" }} controls />;
      }
    } else {
      // If media is neither an array nor a string, return null or handle it according to your requirements
      return null;
    }
  };

  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="post-list">
          {posts.length === 0 ? (
            <p>No posts to display.</p>
          ) : (
            posts.map((post) => (
              !hiddenPosts[post.id] ? (
                <div key={post.id} className={`post-card ${!post.media ? 'no-media' : ''}`}>
                  <div className="post-info">
                    <div className="post-header">
                      <div className="post-header-left">
                        <img src={getCommunityImage(post.community_id)} className="profile-photo" alt={post.text} />
                        <p>
                          <b>r/{getCommunityName(post.community_id)}</b>
                        </p>
                        <p>.</p>
                        <p>{post.time} ago</p>
                        <p>.</p>
                        <p>{post.reason}</p>
                      </div>
                      <div className="post-header-right">
                        <button className="join-btn-post" onClick={() => handleJoinClick(post.id)}>
                          {joinStates[post.id] ? 'Leave' : 'Join'}
                        </button>
                        <div className="dropdown-post">
                          <button className="dropbtn-post">&#8226;&#8226;&#8226;</button>
                          <div className="dropdown-content-post">
                            <a href="#">
                              <BiHide onClick={() => handleHideClick(post.id)} /> show fewer posts like this
                            </a>
                            <a href="#">
                              <CiBookmark /> save
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
                    <p>
                      {post.text}
                    </p>
                    {renderMediaOrTruncateText(post.media, post.text)}
                  </div>
                  <div className="interaction-container">
                    <div className="interaction">
                      <div className="left-post">
                        <button onClick={() => handleUpvoteClick(post.id)} className={post.upvoted ? 'upvoted' : ''}>
                          <BiUpvote />
                        </button>
                        <p>{post.likes}</p>
                        <button
                          onClick={() => handleDownvoteClick(post.id)}
                          className={post.downvoted ? 'downvoted' : ''}
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
              ) : (
                <div key={post.id} className="hidden-post-card">
                  <p>Post hidden</p>
                  <button onClick={() => setHiddenPosts((prevHiddenPosts) => ({ ...prevHiddenPosts, [post.id]: false }))}>
                    Undo
                  </button>
                </div>
              )
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Content;
