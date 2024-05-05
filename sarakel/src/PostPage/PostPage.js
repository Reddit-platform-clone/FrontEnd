import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import classes from './PostPage.module.css'
import NavBar from '../HomePage/Components/NavBar/NavBar'
import SideBar from '../HomePage/Components/SideBar/SideBar'
import {useParams} from "react-router-dom"
export default function PostPage(){
    const {postId} = useParams();
    console.log(postId)
    return(
        <div className="container-fluid  w-100">
           <div className="row">
                <div className="col-12 d-flex">
                    <div className="col-2">
                        <SideBar></SideBar>
                    </div>
                    <div className="col-7 ms-1 ">
                        <div className="row bg-info">
                            <div className={`col-auto`}>
                                <button className={`${classes.BackButton}`}><svg rpl="" fill="currentColor" height="20" icon-name="back-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"> <path d="M19 9.375H2.51l7.932-7.933-.884-.884-9 9a.625.625 0 0 0 0 .884l9 9 .884-.884-7.933-7.933H19v-1.25Z"></path></svg></button>
                            </div>
                            <div className="col-3 d-flex">
                                <img className={`${classes.UserImage}`} src={"https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png"}></img>
                                <div className="col-5 row  ">
                                    <a className={`col-12 ${classes.CommunityName}`}>vndjlvndfl</a>
                                    <a className={` ${classes.UserName}`}>onvdfjvn</a>
                                </div>
                            </div>
                        </div>
                        <div className="row ">
                            <h1 className="">Big title of post is displayed here with big font</h1>
                        </div>
                        <div className="row mt-3">
                            <a>Happened to pass by as this carrier pulled in! VIN for the Performance was made in Austin (I think we all knew that though). They look awesome! Please make the new M3 Performance in Austin please so we can get it in quicksilver!</a>
                        </div>
                        <div className="row mt-2 justify-content-center">
                            <div className="col-11">
                            <img className={` w-100 rounded ${classes.PostImg}`} src={"https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png"}></img>
                            </div>
                        </div>
                        <div className="row">
                            
                        </div>
                    </div>
                    {/* <div className={`col-3  ms-1  ${classes.RightSide}`}>
                        <div className="row mt-3 align-items-center justify-content-between">
                            <div className="col-auto ms-2 ">
                                <h4>Community name</h4>
                            </div>
                            <div className="col-auto me-2 ">
                                    <button className={`${classes.QueueButtons}`}>join</button>
                            </div>
                        </div>
                    </div> */}
                </div>
           </div>
        </div>
    )
}