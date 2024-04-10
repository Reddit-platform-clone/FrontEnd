// import React, { useState, useEffect } from 'react';
// import { BiUpvote, BiDownvote } from 'react-icons/bi';
// import { FaRegCommentAlt } from 'react-icons/fa';
// import { IoShareOutline } from 'react-icons/io5';
// import { BiHide } from 'react-icons/bi';
// import { CiBookmark, CiFlag1 } from 'react-icons/ci';
// import ReactPlayer from "react-player";
// import jsonData from "../mock.json"2

// const PostCard = () => {
//     const [post, setPosts] = useState([]);
//   const [communities, setCommunities] = useState([]);
//   const [joinStates, setJoinStates] = useState({});
//   const [Loading,setLoading] = useState(true);
//   const [hiddenPosts,setHiddenPosts] = useState({});


//   useEffect(() => {
//     const fetchData = () => {
//       setTimeout(() => {
//         setPosts(jsonData.posts);
//         setCommunities(jsonData.communities);
//         setLoading(false);
//       }, 1000);
//     };

//     fetchData();

//     return () => {
//       // Cleanup tasks if needed
//     };
//   }, []);

//   const getCommunityName = (communityId) => {
//     const community = communities.find((c) => c.id === communityId);
//     return community ? community.name : 'Unknown';
//   };

//   const getCommunityImage = (communityId) => {
//     const community = communities.find((c) => c.id === communityId);
//     return community ? community.image : 'default_community_image_url';
//   };

//   const handleUpvoteClick = (postId) => {
//     setPosts((prevPosts) =>
//       prevPosts.map((post) =>
//         post.id === postId
//           ? {
//               ...post,
//               upvoted: !post.upvoted,
//               downvoted: false,
//               likes: post.upvoted ? parseInt(post.likes) - 1 : parseInt(post.likes) + 1,
//             }
//           : post
//       )
//     );
//   };

//   const handleDownvoteClick = (postId) => {
//     setPosts((prevPosts) =>
//       prevPosts.map((post) =>
//         post.id === postId
//           ? {
//               ...post,
//               upvoted: false,
//               downvoted: !post.downvoted,
//               likes: post.downvoted ? parseInt(post.likes) + 1 : parseInt(post.likes) - 1,
//             }
//           : post
//       )
//     );
//   };

//   const handleJoinClick = (postId) => {
//     setJoinStates((prevState) => ({
//       ...prevState,
//       [postId]: !prevState[postId],
//     }));
//   };

//   const handleHideClick = (postId) => {
//     setHiddenPosts((prevHiddenPosts) => ({
//       ...prevHiddenPosts,
//       [postId]: true,
//     }));
//   };

// //   const truncateText = (text, maxLength) => {
// //     if (text.length > maxLength) {
// //       return text.substring(0, maxLength) + '...';
// //     }
// //     return text;
// //   };

//   const renderMediaOrTruncateText = (media, text) => {
//     const maxTextLength = 400;

//     if (media) {
//       return renderMedia(media, text);}
//     // } else {
//     //   return <p>{truncateText(text, maxTextLength)}</p>;
//     // }
//   };

//   const renderMedia = (media, text) => {
//     if (Array.isArray(media)) {
//       return <img src={media[0]} alt={text} className="post-image" />;
//     } else if (typeof media === 'string') {
//       if (media.match(/\.(jpeg|jpg|gif|png)$/) != null) {
//         return <img src={media} alt={text} className="post-image" />;
//       } else {
//         return <ReactPlayer url={media} width="540px" height="500px" controls />;
//       }
//     } else {
//       return null;
//     }
//   };

//   return (
//     <div className={`post-card ${!post.media ? 'no-media' : ''}`}>
//       <div className="post-info">
//         <div className="post-header">
//           <div className="post-header-left">
//             <img src={getCommunityImage(post.community_id)} className="profile-photo" alt={post.text} />
//             <p>
//               <b>r/{getCommunityName(post.community_id)}</b>
//             </p>
//             <p>.</p>
//             <p>{post.time} ago</p>
//             <p>.</p>
//             <p>{post.reason}</p>
//           </div>
//           <div className="post-header-right">
//             <button className="join-btn-post" onClick={() => handleJoinClick(post.id)}>
//               {joinStates[post.id] ? 'Leave' : 'Join'}
//             </button>
//             <div className="dropdown-post">
//               <button className="dropbtn-post">&#8226;&#8226;&#8226;</button>
//               <div className="dropdown-content-post">
//                 <a href="#">
//                   <BiHide onClick={() => handleHideClick(post.id)} /> show fewer posts like this
//                 </a>
//                 <a href="#">
//                   <CiBookmark /> save
//                 </a>
//                 <a href="#">
//                   <CiFlag1 /> report
//                 </a>
//                 <a href="#" onClick={() => handleHideClick(post.id)}>
//                   <BiHide /> hide
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//         <p className="post-title">
//           <b>{post.title}</b>
//         </p>
//         <p>
//           {post.text}
//         </p>
//         {renderMediaOrTruncateText(post.media, post.text)}
//       </div>
//       <div className="interaction-container">
//         <div className="interaction">
//           <div className="left-post">
//             <button onClick={() => handleUpvoteClick(post.id)} className={post.upvoted ? 'upvoted' : ''}>
//               <BiUpvote />
//             </button>
//             <p>{post.likes}</p>
//             <button
//               onClick={() => handleDownvoteClick(post.id)}
//               className={post.downvoted ? 'downvoted' : ''}
//             >
//               <BiDownvote />
//             </button>
//           </div>
//           <div className="middle-post">
//             <button>
//               <FaRegCommentAlt />
//             </button>
//             <p>{post.comments}</p>
//           </div>
//           <div className="right-post">
//             <button>
//               <IoShareOutline />
//             </button>
//             <p>Share</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostCard;



import React from 'react';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { FaRegCommentAlt } from 'react-icons/fa';
import { IoShareOutline } from 'react-icons/io5';
import { BiHide } from 'react-icons/bi';
import { CiBookmark, CiFlag1 } from 'react-icons/ci';

const postCard = ({ post, joinStates, handleJoinClick, handleHideClick, handleUpvoteClick, handleDownvoteClick, getCommunityName, getCommunityImage,renderMediaOrTruncateText }) => (
  <div className={`post-card ${!post.media ? 'no-media' : ''}`}>
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
                <BiHide /> show fewer posts like this
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
);

export default postCard;
