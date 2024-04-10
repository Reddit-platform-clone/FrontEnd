import React from 'react';
import "./compactPostCard.css"
import { BiHide } from 'react-icons/bi';
import { CiViewList } from "react-icons/ci";
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { FaRegCommentAlt } from 'react-icons/fa';
import { IoShareOutline } from 'react-icons/io5';
import { FaExpandAlt } from "react-icons/fa";



const compactPostCard = ({ post, joinStates, handleJoinClick, handleHideClick, handleUpvoteClick, handleDownvoteClick, getCommunityName, getCommunityImage}) => (
    <div className='compact-post-card'>

        <div className='compact-post-card-header'>
        <p>{post.reason}</p>
        <div className="compact-post-card-dropdown">
            <button className="compact-post-card-dropbtn">&#8226;&#8226;&#8226;</button>
            <div className="compact-post-card-dropdown-content">
            <a href="#">
                <BiHide /> show fewer posts like this
            </a>
            </div>
        </div>
        </div>


        <div className='compact-post-card-body'>
            <div className='compact-post-card-left'><CiViewList /></div>

            <div className='compact-post-card-right'>

                <div className='compact-post-card-right-header'>
            <img src={getCommunityImage(post.community_id)} className="compact-post-card-profile-photo" alt={post.text} />
            <p>
            r/{getCommunityName(post.community_id)}
            </p>
            <button className="compact-post-card-join-btn" onClick={() => handleJoinClick(post.id)}>
            {joinStates[post.id] ? 'Leave' : 'Join'}
            </button>
            <p>{post.time} ago</p>
            </div>

            <p> <b>{post.title}</b></p>

            <div className='compact-post-card-interaction'>

                <button className='compact-post-card-interaction-expand'>  <FaExpandAlt /> </button>

                <div className='compact-post-card-interaction-voting'>
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

          <div className='compact-post-card-interaction-text-buttons'>
            <button className='compact-post-card-interaction-comments-button'>{post.comments} comments</button>
            <button>Share</button>
            <button>Save</button>
            <button onClick={() => handleHideClick(post.id)}>Hide</button>
            <button>Report</button>
          </div>


            </div>
            </div>
        </div>

    </div>
    
);

export default compactPostCard;
