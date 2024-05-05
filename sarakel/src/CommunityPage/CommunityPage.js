import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import classes from './CommunityPage.module.css'
import axios from 'axios';
import SideBar from "../HomePage/Components/SideBar/SideBar";
import Content from "./content/content";
import NavBar from "../HomePage/Components/NavBar/NavBar";
import {useAuth} from "../HomePage/Components/AuthContext"

export default function CommunityPage(){
    const [CommunityName, setCommName] = React.useState()
    const [NumOfMembers, setNumOfMembers] = React.useState()
    const [Rules, setRules] = React.useState([])
    const [Commpic, setCommPic] = React.useState()
    const [Banner, setBanner] = React.useState()
    const [Mods, setMods] = React.useState([])
    const [userRule, setUserRole] = React.useState()
    const [member, setMember] = React.useState()
    const [ModBool, steModbool] = React.useState()
    const {token} = useAuth()
    async function GetRole(){
        if(token){
            const promise = await axios.get('http://localhost:5000/api/r/friedChicken', {
                headers:{Authorization: `Bearer ${token}`}
        });
            return promise.data
        } else{
            return "not"
        }
    }
    async function GetCommInfo(){
        const promise = await axios.get('http://localhost:5000/api/community/khalledAshrafNargasi/getCommunityInfoByName');
        return promise.data;
    }
    React.useEffect(() =>{
        async function GetandApply(){
            const data = await GetCommInfo()
            if(data){
                setCommName(data.data.data.communityName)
                setNumOfMembers(data.data.data.members.length)
                setRules(data.data.data.rules)
                setMods(data.data.data.moderatorsUsernames)
                setCommPic(data.data.data.displayPicUrl)
                setBanner(data.data.data.backgroundPicUrl)
            }
        }
        
        GetandApply()
    },[])
    return(
        <div className="container-fluid w-100 vh-100 ">
            <div className="row sticky-top">
                
                    <NavBar></NavBar>
            </div>
            <div className="row ">
                <div className="col-2 vh-100">
                    <SideBar></SideBar>
                </div>
                <div className="col-10 mt-1 ">
                    <div className="row">
                        <div className={`col-12`}>
                            <div className={`  ${classes.Banner}`}>
                                    <img src={Banner} className={`${classes.bannerimg}`}></img>
                            </div>
                        </div>
                    </div>
                    <div className="row ">
                        <div className=" row align-items-center col-12">
                            <div className="col-5 d-flex align-items-center">
                            <img className={`ms-5 col-2 ${classes.CommunityImage}`} src={Commpic}></img>
                            <span className={`${classes.CommunityName} col-10 mt-3 ms-2`}>r/{CommunityName}</span>
                            </div>
                            <div className="col-7 row mt-3 justify-content-end">
                                 <button type="button" class={`${classes.CommunityButtons} btn me-2  col-auto btn-light`}><svg rpl="" fill="currentColor" height="20" icon-name="add-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 9.375h-8.375V1h-1.25v8.375H1v1.25h8.375V19h1.25v-8.375H19v-1.25Z"></path>
                                </svg> Create a post</button>
                                 <button type="button" class={`${classes.CommunityButtons} btn me-2  col-auto btn-primary`}>join</button>
                                 <button type="button" class={`${classes.CommunityButtons} btn me-2  col-auto btn-primary`}>Mod Tools</button>
                                 <button type="button" class={`${classes.CommunityButtons} btn me-2  col-auto btn-light`}><svg rpl="" fill="currentColor" height="20" icon-name="notification-fill" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M11 18h1a2 2 0 0 1-4 0h3Zm6.263-7.07a2.699 2.699 0 0 1-1.189-2.23l-.005-1.61a6.069 6.069 0 1 0-12.138 0v1.613a2.7 2.7 0 0 1-1.193 2.227A3.949 3.949 0 0 0 1 14.208v.672A1.119 1.119 0 0 0 2.117 16h15.766A1.119 1.119 0 0 0 19 14.88v-.672a3.952 3.952 0 0 0-1.737-3.278Z"></path> </svg></button>
                                 <button type="button" class={`${classes.CommunityButtons} btn me-2 align-items-center col-auto btn-light`}><svg rpl="" fill="currentColor" height="20" icon-name="overflow-horizontal-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM10 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm6 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"></path> </svg></button>
                            </div>
                        </div>
                    </div>
                    <div className="row col-12 mt-3">
                        <div className={`col-9  ${classes.Content}`}>
                            <Content ></Content>
                        </div>
                        <div className="col-3 ">
                            <div className={`${classes.RightSide}`}>
                                <div className="row justify-content-center align-items-center">
                                    <span className={`${classes.sidebarname} col-6 ms-3 mt-3`}>{CommunityName}</span>
                                    <span className="col-5 mt-3">members: <span className={`${classes.sidebarname} ms-1`}> {NumOfMembers}</span></span>
                                </div>
                                <hr></hr>
                                <div className="row">
                                    <span className="ms-2">RULES</span>
                                    <ul className={`${classes.list} ms-2`}>
                                        {Rules.map((list, index) => (

                                            <li  >             
                                            <span className=' mt-2'>{index+1} <span className="ms-3">{list}</span></span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <hr></hr>
                                <div className="row">
                                    <span className="ms-2">MODS</span>
                                        <ul className={`${classes.list} ms-2`}>
                                            {Mods.map((list, index) => (

                                                <li  >             
                                                <span className=' mt-2'>{index+1} <span className="ms-3">{list}</span></span>
                                                </li>
                                            ))}
                                        </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}