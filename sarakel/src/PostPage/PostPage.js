import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import classes from './PostPage.module.css'
import SideBar from '../HomePage/Components/SideBar/SideBar'
import {useParams, useNavigate} from "react-router-dom"
import { BiSolidUpvote, BiSolidDownvote, BiUpvote, BiDownvote } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";
import axios from 'axios';
import { toast } from "react-toastify";
import NavBar from "../HomePage/Components/NavBar/NavBar";
import NavBarUnlogged from "../HomePage/Components/NavBar Unlogged/NavBarUnlogged";
import {useAuth} from "../HomePage/Components/AuthContext"
import { post } from "jquery";
import { PiClipboard } from "react-icons/pi";
export default function PostPage(){
    let info;

    const navigate = useNavigate();
    const {postId} = useParams();
    const [voteStatus, setVoteStatus] = React.useState(null);
    const [Post, setPost] = React.useState()
    const [CommunityId, setCommunity] = React.useState()
    const [comment, setComment] = React.useState('')
    const [commPic, setCommPic] = React.useState()
    const [username, setUsername] = React.useState()
    const [title, setTitle] = React.useState()
    const [content, setContent] = React.useState()
    const [upvotes, setUpvotes] = React.useState()
    const [downvotes, setDownvotes] = React.useState()
    const [replies, setReplies] = React.useState([])
    const [numberOfComments, setNumbOfComments] = React.useState()
    const [media, setMedia] = React.useState(null);
    const {token} = useAuth()

    const changeComment = event =>{
      setComment(event.target.value)

  }

    async function SendComment(){
      if(comment == ''){
          alert("please enter a comment first")
          return
      }
        const promise = await axios.post(`http://57.151.116.81:5000/api/comment`,{postID:postId,content:comment},{headers:{Authorization: `Bearer ${token}`}});
        setComment('');
        getRepliesAndApply();
    }


    async function GetPostInfo(){
        const promise = await axios.post(`http://57.151.116.81:5000/api/getAPost`,{postID: postId});
        return promise.data;
    }
    async function GetCommInfo(){
      const promise = await axios.get(`http://57.151.116.81:5000/api/community/${postId}/getCommunityInfo`);
      return promise.data;
  }
  async function getreplies(){
      const promise = await axios.post(`http://57.151.116.81:5000/api/get_post_replies`,{postID: postId})
      return promise.data
  }
    React.useEffect(()=>{
        async function GetPost(){
            const data = await GetPostInfo()
            if(data){
                setCommunity(data.post[0].communityId)
                setUsername(data.post[0].username)
                setTitle(data.post[0].title)
                setContent(data.post[0].content)
                setMedia(data.post[0].media)
                setUpvotes(data.post[0].upvotes)
                setDownvotes(data.post[0].downvotes)
                setNumbOfComments(data.post[0].numberOfComments)
            }
            
        }

        GetPost()
    },[])

    React.useEffect(() => {
      async function getCommAndApply(){
        const data = await GetCommInfo()
        if(data){
          if(data.data.data.displayPicUrl){
            setCommPic(data.data.data.displayPicUrl)   
            
        }else if(data.data.data.displayPic){
            setCommPic(data.data.data.displayPic)   
            
        }
        }
      }

      getCommAndApply()
    },[])

    async function getRepliesAndApply(){
      const data = await getreplies()
      if(data){
        
          setReplies(data.message)
          
      }
    }

    React.useEffect(() => {
      async function getRepliesAndApply(){
        const data = await getreplies()
        if(data){
          
            setReplies(data.message)
            
        }
      }

      getRepliesAndApply()
    },[])
    const handleVoteClick = async (_id, rank) => {
      
        try {
          const response = await fetch("http://57.151.116.81:5000/api/vote", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              rank: rank, // Rank can be 1 for upvote, 0 to clear vote, or -1 for downvote
              type: "post",
              entityId: _id,
            }),
          });
          console.log("post id is :", _id);
          console.log("response : ", response);
          // Check for the status code
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const responseData = await response.json();
        } catch (error) {
          console.error("Error voting:", error);
        }
      };
    const toggleVote = (id,rank) => {
        if (!token) {
          toast.error("You need to Login first");
          return;
        }
        // If the user is canceling their vote
        if (voteStatus === rank) {
          setVoteStatus(null); // Clear the vote
          handleVoteClick(id, 0); // Send rank 0 to clear the vote
        } else {
          setVoteStatus(rank); // Set the vote status
          handleVoteClick(id, rank); // Send the selected rank
        }
      };
      const handleVoteButtonClick = (event,id, rank) => {
        event.stopPropagation(); // Stop event propagation to parent container
        toggleVote(id,rank);
      };
    return(
        <div className="container-fluid w-100">
            {token ? <NavBar/> : <NavBarUnlogged /> }
           <div className="row mt-2">
                <div className="col-12 d-flex">
                    <div className="col-2">
                        <SideBar></SideBar>
                    </div>
                    <div className="col-7 ms-1 ">
                        <div className="row ">
                            <div className={`col-auto`}>
                                <button onClick={() => navigate(-1)} className={`${classes.BackButton}`}><svg rpl="" fill="currentColor" height="20" icon-name="back-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"> <path d="M19 9.375H2.51l7.932-7.933-.884-.884-9 9a.625.625 0 0 0 0 .884l9 9 .884-.884-7.933-7.933H19v-1.25Z"></path></svg></button>
                            </div>
                            <div className="col-3 d-flex">
                                <img className={`${classes.UserImage}`} src={commPic}></img>
                                <div className="col-5 row ms-1 mt-1  ">
                                    <a className={`col-12 ${classes.CommunityName}`}>{CommunityId}</a>
                                    <a className={` ${classes.UserName}`}>{username}</a>
                                </div>
                            </div>
                        </div>
                        <div className="row ms-4">
                            <h1 className="">{title}</h1>
                        </div>
                        <div className="row ms-4 mt-2">
                            <a>{content}</a>
                        </div>
                        <div className="row mt-2 justify-content-center">
                            <div className="col-11">
                            {media &&(
                                <img  className={` w-100 rounded ${classes.PostImg}`} src={media}></img>
                            )}
                            </div>
                        </div>
                        <div className="row mt-3 ms-4">
                            <div className={classes["interaction-container"]}>
                              <div className={classes["interaction"]}>
                                <div className={classes["left-post"]}>
                                    <button
                                    onClick={(event) => handleVoteButtonClick(event,postId, 1)}
                                    className={classes["upvote-button"]}
                                    style={{ backgroundColor: voteStatus === 1 ? "rgba(128, 128, 128, 0.3)" : "transparent" }}
                                    >
                                    {voteStatus === 1 ? <BiSolidUpvote color="red" /> : <BiUpvote />}
                                    </button>
                                    <p>{ upvotes - downvotes + (voteStatus ? voteStatus : 0)}</p>
                                    <button
                                    onClick={(event) => handleVoteButtonClick(event,postId, -1)}
                                    className={classes["downvote-button"]}
                                    style={{ backgroundColor: voteStatus === -1 ? "rgba(128, 128, 128, 0.3)" : "transparent" }}
                                    >
                                    {voteStatus === -1 ? <BiSolidDownvote color="blue" /> : <BiDownvote />}
                                    </button>
                                </div>
                                <div className={classes["middle-post"]}>
                                    <button><FaRegCommentAlt /></button>
                                    <p>{replies.length}</p>
                                </div>
                                <div className={classes["right-post"]}>
                                    <button><IoShareOutline /></button>
                                    <p>Share</p>
                                </div>
                              </div>
                            </div>
                            <hr></hr>
                        </div>
                        <div className="row align-items-center ms-4">
                            <div className="col-10">
                              <input className={`w-100 rounded`} onChange={changeComment} type="text" placeholder="  Add a comment . . ."  />
                            </div>
                            <div className="col-2">
                            <button type="button" onClick={() => {SendComment();}} class={`${classes.CommunityButtons} btn me-2  col-auto bg-primary`}>send</button>
                            </div>
                        </div>
                        <div className="row mt-2 mb-2 ms-4">
                            {!replies ? <span>no comment</span> : (replies.map((list)=>(
                              <div className="row mt-2">
                                  <div className="row ">
                                    <img className={`${classes.CommentImage} `} src={commPic}></img>
                                    <span className={`${classes.UserId} col-2 align-items-center ms-0`}>{list.userID}</span>
                                  </div>
                                  <div className="row  col-12 mt-2 ">
                                      <p className=" ms-5 col-auto  ">{list.content}</p>
                                  </div>
                                  <div className="row mt-3 ms-4">
                                        <div className={classes["interaction-container"]}>
                                          <div className={classes["interaction"]}>
                                            <div className={classes["left-post"]}>
                                                <button
                                                onClick={(event) => handleVoteButtonClick(event,list._id, 1)}
                                                className={classes["upvote-button"]}
                                                style={{ backgroundColor: voteStatus === 1 ? "rgba(128, 128, 128, 0.3)" : "transparent" }}
                                                >
                                                {voteStatus === 1 ? <BiSolidUpvote color="red" /> : <BiUpvote />}
                                                </button>
                                                <p>{ list.upvote - list.downVote + (voteStatus ? voteStatus : 0)}</p>
                                                <button
                                                onClick={(event) => handleVoteButtonClick(event,list._id, -1)}
                                                className={classes["downvote-button"]}
                                                style={{ backgroundColor: voteStatus === -1 ? "rgba(128, 128, 128, 0.3)" : "transparent" }}
                                                >
                                                {voteStatus === -1 ? <BiSolidDownvote color="blue" /> : <BiDownvote />}
                                                </button>
                                            </div>
                                            <div className={classes["middle-post"]}>
                                                <button><FaRegCommentAlt /></button>
                                                <p>{numberOfComments}</p>
                                            </div>
                                            <div className={classes["right-post"]}>
                                                <button><IoShareOutline /></button>
                                                <p>Share</p>
                                            </div>
                                        </div>
                                      </div>
                                      <hr></hr>
                                  </div>
                              </div>
                            )))}
                        </div>
                    </div>
                    
                </div>
           </div>
        </div>
    )
}