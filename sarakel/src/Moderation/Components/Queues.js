
import '../../bootstrap.min.css'
import classes from '../Moderation.module.css'
import jsonData from '../../mock.json';
import mock from '../../mock.json'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import {useParams, useNavigate} from "react-router-dom"
import 'bootstrap/dist/js/bootstrap.min.js'
import React, { useState, useEffect } from 'react';
import ReactPlayer from "react-player";
import { list } from '@chakra-ui/react';
import {useAuth} from "../../HomePage/Components/AuthContext"



export default function Queues(){
    const navigate = useNavigate();
    const {token} = useAuth()
    const {communityId} = useParams();
    const actArray = []
    const buttArray = []
    const [value, setValue] = React.useState(0)
    for(let i=0;i<5;i++){
        if(i === value){
            actArray.push(`${classes.actMenu} ${classes.QueueButtons}`)
        }else{
            actArray.push(`${classes.QueueButtons}`)
        }
    }
    let img

    
    const [ModQueue, setModQueue] = React.useState([])
    const [Reported, setReported] = React.useState([])
    const [Edited, setEdited] = React.useState([])
    const [Removed, setRemoved] = React.useState([])
    const [UnMod, setUnMod] = React.useState([])


    async function ApprovePost(postID){
        const promise = await axios.post(`http://57.151.116.81:5000/r/${communityId}/api/approve`,{postId: postID},{headers:{Authorization: `Bearer ${token}`}})
        GetQueues()
        return console.log(promise)
    }
    async function RemovePost(postID){
        const promise = await axios.post(`http://57.151.116.81:5000/r/${communityId}/api/remove`,{postId: postID},{headers:{Authorization: `Bearer ${token}`}})
        GetQueues()
        return console.log(promise)
    }
    async function GetModQueue (){
        const promise = await axios.get(`http://57.151.116.81:5000/api/r/${communityId}/about/modqueue`,{headers:{Authorization: `Bearer ${token}`}})
        return promise.data
    }
    async function GetRemoved (){
        const promise = await axios.get(`http://57.151.116.81:5000/api/r/${communityId}/about/removed`,{headers:{Authorization: `Bearer ${token}`}})
        return promise.data
    }
    async function GetReported (){
        const promise = await axios.get(`http://57.151.116.81:5000/api/r/${communityId}/about/reports`,{headers:{Authorization: `Bearer ${token}`}})
        return promise.data
    }
    async function GetEdited (){
        const promise = await axios.get(`http://57.151.116.81:5000/api/r/${communityId}/about/edited`,{headers:{Authorization: `Bearer ${token}`}})
        return promise.data
    }
    async function GetUnMod (){
        const promise = await axios.get(`http://57.151.116.81:5000/api/r/${communityId}/about/unmoderated`,{headers:{Authorization: `Bearer ${token}`}})
        return promise.data
    }
    async function GetQueues(){
        const modData = await GetModQueue()
        const removedData = await GetRemoved()
        const reportedData = await GetReported()
        const editedData = await GetEdited()
        const unmodData = await GetUnMod()
        if(modData && removedData && reportedData && editedData && unmodData){
            setModQueue(modData.posts)
            setReported(reportedData.posts)
            setRemoved(removedData.posts)
            setEdited(editedData.posts)
            setUnMod(unmodData.posts)
        }
    }
    React.useEffect(()=>{
        async function GetQueues(){
            const modData = await GetModQueue()
            const removedData = await GetRemoved()
            const reportedData = await GetReported()
            const editedData = await GetEdited()
            const unmodData = await GetUnMod()
            if(modData && removedData && reportedData && editedData && unmodData){
                setModQueue(modData.posts)
                setReported(reportedData.posts)
                setRemoved(removedData.posts)
                setEdited(editedData.posts)
                setUnMod(unmodData.posts)
            }
        }

        GetQueues()
    },[])

    return(

            <div className='container-md '>
            <div className='row m-3  justify-content-center'>
                <div className='col-8  '>
                    <div className='container-md'>
                        <div className='row'>
                            <div className='col  d-flex'>
                                <span className={`  ${classes.QueuesHeader}`}>Queues</span>
                            </div>
                        </div>
                        <div className='row mt-3 '>
                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                <button className={actArray[0]} onClick={()=>{setValue(0)}}><span>Mod Queue</span></button>
                            </div>
                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                <button className={actArray[1]} onClick={()=>{setValue(1)}}><span>Reported</span></button>
                            </div>
                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                <button className={actArray[2]} onClick={()=>{setValue(2)}}><span>Removed</span></button>
                            </div>
                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                <button className={actArray[3]} onClick={()=>{setValue(3)}}><span>Edited</span></button>
                            </div>
                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                <button className={actArray[4]} onClick={()=>{setValue(4)}}><span>Unmoderated</span></button>
                            </div>
                        </div>
                        
                        <div className={`row justify-content mt-3 ${classes.ActionBar}`}>
                            <div className={`col-auto ${classes.ActionBarDrpdwn}`}>
                                <div class="btn-group">
                                    <button type="button" class="btn"><input type='checkbox'></input></button>
                                    <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">Spam Filtered</a></li>
                                        <li><a class="dropdown-item" href="#">Has Reports</a></li>
                                        <li><a class="dropdown-item" href="#">Self Reports</a></li>
                                        <li><a class="dropdown-item" href="#">Posts With Flair</a></li>
                                        <li><a class="dropdown-item" href="#">Posts</a></li>
                                        <li><a class="dropdown-item" href="#">Comments</a></li>
                                        <li><a class="dropdown-item" href="#">Chat Posts</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {value == 0 ? (
                            <>
                                {ModQueue.length == 0 ? <span>no posts</span> : ModQueue.map((item) => (
                                    <div className={`row  mt-1 ${classes.ModListBox}`}>
                                    <div className='row '>
                                    <div className='col-1'>
                                        <button type="button" class={`btn`}><input className={`${classes.checkBox}`} type='checkbox'></input></button>
                                    </div>
                                    <div className='col '>
                                        <div className='row mt-2 '>
                                            <div className='col-1'>
                                                <span className={`align-items-center w-100 `}>r/{item.communityId}</span>
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col'>
                                                <span className={`${classes.content}`}>{item.title}</span>
                                            </div>
                                        </div>
                                        <div className='row mt-1'>
                                            <span className={`${classes.color}`}>{item.text}</span>
                                        </div>
                                        <div className='row  mt-2'>
                                            <img src={item.media} className='col-7'></img>
                                        </div>
                                        <div className='row mt-1'>
                                            <p className={`${classes.color}`}>{item.comments} comments</p>
                                        </div>
                                        <div className={`row ${classes.ModBanner} align-items-center col-11 rounded mt-2`}>
                                            <div className='col-1 '>
                                                <img  src={img} className={`${classes.ModImg} w-100 col-12`} ></img>
                                            </div>
                                            <div className='col'>
                                                <div className='row'><a>Removed</a></div>
                                                <div className='row '><a>u/MemoNar</a></div>
                                            </div>
                                        </div>
                                        <div className='row mt-3 '>
                                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                                <button className={`${classes.QueueButtons}`}><span>Add Removal Reasons</span></button>
                                            </div>
                                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                                <button className={`${classes.QueueButtons}`}><span>Approve</span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                ))}
                            </>
                        ):<></>}
                        {value == 1 ? (
                            <>
                                {Reported.length == 0 ? <span>no posts</span> : Reported.map((item) => (
                                    <div className={`row  mt-1 ${classes.ModListBox}`}>
                                    <div className='row '>
                                    <div className='col-1'>
                                        <button type="button" class={`btn`}><input className={`${classes.checkBox}`} type='checkbox'></input></button>
                                    </div>
                                    <div className='col '>
                                        <div className='row mt-2 '>
                                            <div className='col-3'>
                                                <span className={` col-2 `}>r/{item.communityId}</span>
                                            </div>
                                            
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col'>
                                                <span className={`${classes.content}`}>{item.title}</span>
                                            </div>
                                        </div>
                                        <div className='row mt-1'>
                                            <span className={`${classes.color}`}>{item.content}</span>
                                        </div>
                                        <div className='row  mt-2'>
                                            <img src={item.media} className='col-7'></img>
                                        </div>
                                        
                                        
                                        <div className='row mt-3  mb-2'>
                                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                                <button onClick={() =>{ApprovePost(item._id)}} className={`btn btn-primary`}><span>Approve</span></button>
                                            </div>
                                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                                <button onClick={()=>{RemovePost(item._id)}} className={`btn btn-danger`}><span>Remove</span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                ))}
                            </>
                        ):<></>}
                        {value == 2 ? (
                            <>
                                {Removed.length == 0 ? <span>no posts</span> : Removed.map((item) => (
                                    <div className={`row  mt-1 ${classes.ModListBox}`}>
                                    <div className='row '>
                                    <div className='col-1'>
                                        <button type="button" class={`btn`}><input className={`${classes.checkBox}`} type='checkbox'></input></button>
                                    </div>
                                    <div className='col '>
                                        <div className='row mt-2 '>
                                            <div className='col-3'>
                                                <span className={` col-2 `}>r/{item.communityId}</span>
                                            </div>
                                            
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col'>
                                                <span className={`${classes.content}`}>{item.title}</span>
                                            </div>
                                        </div>
                                        <div className='row mt-1'>
                                            <span className={`${classes.color}`}>{item.content}</span>
                                        </div>
                                        <div className='row  mt-2'>
                                            <img src={item.media} className='col-7'></img>
                                        </div>
                                        
                                        
                                        <div className='row mt-3  mb-2'>
                                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                                <button onClick={() =>{ApprovePost(item._id)}} className={`btn btn-primary`}><span>Approve</span></button>
                                            </div>
                                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                                <button onClick={()=>{RemovePost(item._id)}} className={`btn btn-danger`}><span>Remove</span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                ))}
                            </>
                        ):<></>}
                        {value == 3 ? (
                            <>
                                {Edited.length == 0 ? <span>no posts</span> : Edited.map((item) => (
                                    <div className={`row  mt-1 ${classes.ModListBox}`}>
                                    <div className='row '>
                                    <div className='col-1'>
                                        <button type="button" class={`btn`}><input className={`${classes.checkBox}`} type='checkbox'></input></button>
                                    </div>
                                    <div className='col '>
                                        <div className='row mt-2 '>
                                            <div className='col-1'>
                                                <span className={`align-items-center w-100 `}>r/{item.communityId}</span>
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col'>
                                                <span className={`${classes.content}`}>{item.title}</span>
                                            </div>
                                        </div>
                                        <div className='row mt-1'>
                                            <span className={`${classes.color}`}>{item.text}</span>
                                        </div>
                                        <div className='row  mt-2'>
                                            <img src={item.media} className='col-7'></img>
                                        </div>
                                        <div className='row mt-1'>
                                            <p className={`${classes.color}`}>{item.comments} comments</p>
                                        </div>
                                        <div className={`row ${classes.ModBanner} align-items-center col-11 rounded mt-2`}>
                                            <div className='col-1 '>
                                                <img  src={img} className={`${classes.ModImg} w-100 col-12`} ></img>
                                            </div>
                                            <div className='col'>
                                                <div className='row'><a>Removed</a></div>
                                                <div className='row '><a>u/MemoNar</a></div>
                                            </div>
                                        </div>
                                        <div className='row mt-3 '>
                                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                                <button className={`${classes.QueueButtons}`}><span>Add Removal Reasons</span></button>
                                            </div>
                                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                                <button className={`${classes.QueueButtons}`}><span>Approve</span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                ))}
                            </>
                        ):<></>}
                        {value == 4 ? (
                            <>
                                {UnMod.length == 0 ? <span>no posts</span> : UnMod.map((item) => (
                                    <div className={`row  mt-1 ${classes.ModListBox}`}>
                                    <div className='row '>
                                    <div className='col-1'>
                                        <button type="button" class={`btn`}><input className={`${classes.checkBox}`} type='checkbox'></input></button>
                                    </div>
                                    <div className='col '>
                                        <div className='row mt-2 '>
                                            <div className='col-3'>
                                                <span className={` col-2 `}>r/{item.communityId}</span>
                                            </div>
                                            
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col'>
                                                <span className={`${classes.content}`}>{item.title}</span>
                                            </div>
                                        </div>
                                        <div className='row mt-1'>
                                            <span className={`${classes.color}`}>{item.content}</span>
                                        </div>
                                        <div className='row  mt-2'>
                                            <img src={item.media} className='col-7'></img>
                                        </div>
                                        
                                        
                                        <div className='row mt-3  mb-2'>
                                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                                <button onClick={() =>{ApprovePost(item._id)}} className={`btn btn-primary`}><span>Approve</span></button>
                                            </div>
                                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                                <button onClick={()=>{RemovePost(item._id)}} className={`btn btn-danger`}><span>Remove</span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                ))}
                            </>
                        ):<></>}
                        
                    </div>
                </div>
                <div className='col-3 '>

                </div>
            </div>
            </div>
    )
}