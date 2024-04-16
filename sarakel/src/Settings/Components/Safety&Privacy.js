import React from 'react';
import axios from 'axios';
import { Switch, Flex, Spacer, Box, use } from '@chakra-ui/react'
import './bootstrap.min.css';
import classes from './Tabs.module.css' 
import mock from '../../mock.json'
import {useAuth} from '../../HomePage/AuthContext.js';
import { getToken } from '../../HomePage/token.js';




export default function SafetyPrivacy() {
    
    const [search, setSearch] = React.useState()
    const [personal1, setPersonal1] = React.useState()
    const [alcohol, setAlcohol] = React.useState()
    const[date, setDate] = React.useState()
    const [gamble, setGambling] = React.useState()
    const[pregnancy, setPregnancy] = React.useState()
    const[weight,setWeight ] = React.useState()
    const[twofactor, setTwoFactor] = React.useState()
    const [block, setBlock] = React.useState(null)
    const [mute, setMute] = React.useState(null)
    let token = getToken()
    function handleSearch(){
        setSearch(!search);
        sendInfo({showInSearch: !search});
       
    }
    function handlePersonalied(){
        setPersonal1(!personal1);
        sendInfo({personalizeAds: !personal1});
 
    }
    function handleAlcohol(){
        setAlcohol(!alcohol);
        sendInfo({alcohol: !alcohol});
    }
    function handleDating(){
        setDate(!date);
        sendInfo({dating: !date});

    }
    function handleGambling(){
        setGambling(!gamble);
        sendInfo({gambling: !gamble});
       
    }
    function handlePregnancy(){
        setPregnancy(!pregnancy);
        sendInfo({pregnancyAndParenting: !pregnancy});
       
    }
    function handleWeight(){
        setWeight(!weight);
        sendInfo({weightLoss: !weight});
       
    }
    function handleTwoFactor(){
        setTwoFactor(!twofactor);
        sendInfo({twoFactorAuthentication: !twofactor});
    }
    async function sendInfo(data){
            const promise = await axios.patch('http://localhost:5000/api/v1/me/prefs',data,{
                headers:{Authorization: `Bearer ${token} `}
            });
            return promise;
    }
    async function GetInfo(){
        const promise = await axios.get('http://localhost:5000/api/v1/me/prefs',{
            headers:{Authorization: `Bearer ${token}`}
        });
        return promise.data;
    }
    React.useEffect(() =>{
        async function GetandApply(){
            const data = await GetInfo()
            if(data){
                
                setSearch(data.settings.showInSearch)
                setPersonal1(data.settings.personalizeAds)
                setAlcohol(data.settings.alcohol)
                setDate(data.settings.dating)
                setGambling(data.settings.gambling)
                setPregnancy(data.settings.pregnancyAndParenting)
                setWeight(data.settings.weightLoss)
                setTwoFactor(data.settings.twoFactorAuthentication)
            }
        }
        
        GetandApply()
    },[])
    const addBlocked = () =>{
        if(block === null){
            alert("Please enter a user first")
            return
        }
        mock.users.map((user)=>
        {   
            if(user.name === block){
                console.log("mama shebshebha da3")
                mock.users.map((item) =>{
                    if(item.LoggedIn === 1){
                        if(item.BlockedList.find(person => person === block)){
                            alert("Use already blocked")
                        }else{
                            console.log("marwan mousaa bta3i ana")
                        item.BlockedList.push(block)
                        console.log(item)
                        return
                        }
                        
                    }
                })
            }
        })
    }
    const changeBlock = event =>{
        setBlock(event.target.value)
    }
    const addCommunity = () =>{
        if(mute === null){
            alert("Please enter a community first")
            return
        }
        mock.communities.map((group)=>
        {   
            if(group.name === mute){
                console.log("mama shebshebha da3")
                mock.users.map((item) =>{
                    if(item.LoggedIn === 1){
                        if(item.MuteList.find(person => person === mute)){
                            alert("Community already been muted")
                        }else{
                            console.log("marwan mousaa bta3i ana")
                        item.MuteList.push(mute)
                        return
                        }
                        
                    }
                })
            }
        })

    }
    const changeCommunity = event =>{
        setMute(event.target.value)
    }
    return(
        <div className={`${classes.tab}`}>
            <div className=''>
                <h2 className={`${classes.header}`}>Safety & Privacy</h2>
                <p className={`${classes.BoxText} ${classes.Subtext} ${classes.mb}`}>Manage how we use data to personalize your Reddit experience, and control how other redditors interact with you. To learn more, visit our Privacy & Security FAQs .</p>
                <h3 className={`${classes.Subheaders}`}>SAFETY<hr className='mt-2'></hr></h3>
                <div className={`${classes.mb}`} >
                    <div  >
                        <h3 className={`${classes.SettingTopics} ${classes.font}`} on>People You’ve Blocked</h3>
                        <p className={`${classes.Subtext}`}>Blocked people can’t send you chat requests or private messages.</p>
                    </div>
                    <div className={`${classes.BlockUserDiv}`}>
                        <div className={`${classes.w80} ${classes.InputTextDiv}`}>
                            <input type="text" placeholder=' Block New User' onChange={changeBlock} className={`${classes.w100} ${classes.Inputbox}`}></input>
                        </div>
                        <div className={`${classes.SettingToggles}`}>
                            <button className={`${classes.Add}`}  onClick={()=>{addBlocked()}}>ADD</button>
                        </div>
                    </div>
                </div>

                <div className={`${classes.mb}`} >
                    <div  >
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Communities You've Muted</h3>
                        <p className={`${classes.Subtext}`}>Posts from muted communities won't show up in your feeds or recommendations.</p>
                    </div>
                    <div className={`${classes.BlockUserDiv}`}>
                        <div className={`${classes.w80} ${classes.InputTextDiv}`}>
                            <input type="text" placeholder=' MUTE NEW COMMUNITY' onChange={changeCommunity} className={`${classes.w100} ${classes.Inputbox}`}></input>
                            
                        </div>
                        <div className={`${classes.SettingToggles}`}>
                            <button className={`${classes.Add}`} onClick={()=>{addCommunity()}}>ADD</button>
                        </div>
                    </div>
                </div>
                
                <h3 className={`${classes.Subheaders}`}>PRIVACY<hr className='mt-2'></hr> </h3>
                <div className={`${classes.box}`}>
                    <div>
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Show up in search results</h3>
                        <p className={`${classes.BoxText} ${classes.Subtext}`}>Allow search engines like Google to link to your profile in their search results.</p>
                    </div>
                    <div className={`${classes.SettingToggles}`}>
                        <label className={`${classes.switch}`}>
                            <input type="checkbox" checked={search} onChange={()=>{handleSearch()}}/>
                            <span className={`${classes.slider} ${classes.round}`}></span>
                        </label>
                    </div>
                </div>
                <div className={`${classes.box}`}>
                    <div>
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Personalize ads on Reddit based on your activity on Reddit.</h3>
                        <p className={`${classes.BoxText} ${classes.Subtext}`}>Allow us to use your on-platform activity to show you better ads on Reddit.</p>
                    </div>
                    <div className={`${classes.SettingToggles}`}>
                        <label className={`${classes.switch}`}>
                            <input type="checkbox" checked={personal1} onChange={()=>{handlePersonalied()}}/>
                            <span className={`${classes.slider} ${classes.round}`}></span>
                        </label>
                    </div>
                </div>
                <div className={`${classes.box}`}>
                    <div>
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Personalize ads on Reddit based on information and activity from our partners.</h3>
                        <p className={`${classes.BoxText} ${classes.Subtext}`}>Allow us to use information from our partners to show you better ads on Reddit.</p>
                    </div>
                    <div className={`${classes.SettingToggles}`}>
                        <label className={`${classes.switch}`}>
                            <input type="checkbox" />
                            <span className={`${classes.slider} ${classes.round}`}></span>
                        </label>
                    </div>
                </div>
                <h3 className={`${classes.SubheadersSpcl}`}>SENSITIVE ADVERTISING CATEGORIES<hr className='mt-2'></hr> </h3>
                <p className={`${classes.BoxText} ${classes.Subtext} ${classes.mb}`}>You can limit ads about these topics. We’ll do our best not to show them to you when you are signed into your Reddit account.</p>
                <div className={`${classes.box}`}>
                    <div>
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Alcohol</h3>
                        <p className={`${classes.BoxText} ${classes.Subtext}`}>Allowed</p>
                    </div>
                    <div className={`${classes.SettingToggles}`}>
                        <label className={`${classes.switch}`}>
                            <input type="checkbox" checked={alcohol} onChange={()=>{handleAlcohol()}}/>
                            <span className={`${classes.slider} ${classes.round}`}></span>
                        </label>
                    </div>
                </div>
                <div className={`${classes.box}`}>
                    <div>
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Dating</h3>
                        <p className={`${classes.BoxText} ${classes.Subtext}`}>Allowed</p>
                    </div>
                    <div className={`${classes.SettingToggles}`}>
                        <label className={`${classes.switch}`}>
                            <input type="checkbox" checked={date} onChange={()=>{handleDating()}}/>
                            <span className={`${classes.slider} ${classes.round}`}></span>
                        </label>
                    </div>
                </div>
                <div className={`${classes.box}`}>
                    <div>
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Gambling</h3>
                        <p className={`${classes.BoxText} ${classes.Subtext}`}>Allowed</p>
                    </div>
                    <div className={`${classes.SettingToggles}`}>
                        <label className={`${classes.switch}`}>
                            <input type="checkbox" checked={gamble} onChange={()=>{handleGambling()}}/>
                            <span className={`${classes.slider} ${classes.round}`}></span>
                        </label>
                    </div>
                </div>
                <div className={`${classes.box}`}>
                    <div>
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Pregnancy and parenting</h3>
                        <p className={`${classes.BoxText} ${classes.Subtext}`}>Allowed</p>
                    </div>
                    <div className={`${classes.SettingToggles}`}>
                        <label className={`${classes.switch}`}>
                            <input type="checkbox" checked={pregnancy} onChange={()=>{handlePregnancy()}}/>
                            <span className={`${classes.slider} ${classes.round}`}></span>
                        </label>
                    </div>
                </div>
                <div className={`${classes.box}`}>
                    <div>
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Weight loss</h3>
                        <p className={`${classes.BoxText} ${classes.Subtext}`}>Allowed</p>
                    </div>
                    <div className={`${classes.SettingToggles}`}>
                        <label className={`${classes.switch}`}>
                            <input type="checkbox" checked={weight} onChange={()=>{handleWeight()}}/>
                            <span className={`${classes.slider} ${classes.round}`}></span>
                        </label>
                    </div>
                </div>
                <h3 className={`${classes.Subheaders}`}>ADVANCED SECURITY <hr className='mt-2'></hr> </h3>
                <div className={`${classes.box}`}>
                    <div>
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Use two-factor authentication</h3>
                        <p className={`${classes.Subtext} ${classes.w80}`}>Help protect your account (even if someone gets your password) by requiring a verification code and a password to log in.</p>
                    </div>
                    <div className={`${classes.SettingToggles}`}>
                        <label className={`${classes.switch}`}>
                            <input type="checkbox" checked={twofactor} onChange={()=>{handleTwoFactor()}}/>
                            <span className={`${classes.slider} ${classes.round}`}></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>

    )

}