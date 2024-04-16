import React from 'react';
import './bootstrap.min.css';
import classes from './Account.module.css' 
import mock from 'F:/Cairo university/CMPS203/software-project/FrontEnd/sarakel/src/mock.json';
import { ToastContainer, toast } from "react-toastify";

export default function SafetyPrivacy() {
    let UserId
    let searchResault
    let Personalized1
    let Personalized2
    let Alcohol
    let Dating
    let Gambling
    let Pregnancy
    let Weight
    let BlockArray = []
    mock.users.map((user) => {
        if(user.LoggedIn === 1){
            UserId = user.id
            searchResault = user.SearchResault
            Personalized1 = user.Personalized1
            Personalized2 = user.Personalized2
            Alcohol = user.Alcohol
            Dating = user.Dating
            Gambling = user.Gambling
            Pregnancy = user.Pregnancy
            Weight = user.WeightLoss
            BlockArray = user.BlockedList
        }
    })
    const [search,setSearch] = React.useState(searchResault)
    const [personal1, setPersonal1] = React.useState(Personalized1)
    const [personal2,setPersonal2] = React.useState(Personalized2)
    const [alcohol, setAlcohol] = React.useState(Alcohol)
    const[date, setDate] = React.useState(Dating)
    const [gamble, setGambling] = React.useState(Gambling)
    const[pregnancy, setPregnancy] = React.useState(Pregnancy)
    const[weight,setWeight ] = React.useState(Weight)
    const [block, setBlock] = React.useState(null)
    const [mute, setMute] = React.useState(null)
    mock.users.map((user) => {
        if(user.LoggedIn === 1){
            user.SearchResault = search
            user.Personalized1 = personal1
            user.Personalized2 = personal2
            user.Alcohol = alcohol
            user.Dating = date
            user.Gambling = gamble
            user.Pregnancy = pregnancy
            user.WeightLoss = weight
            return
        }
    })
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
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>People You’ve Blocked</h3>
                        <p className={`${classes.Subtext}`}>Blocked people can’t send you chat requests or private messages.</p>
                    </div>
                    <div className={`${classes.BlockUserDiv}`}>
                        <div className={`${classes.w80} ${classes.InputTextDiv}`}>
                            <input type="text" placeholder=' Block New User' onChange={changeBlock} className={`${classes.w100} ${classes.Inputbox}`}></input>
                        </div>
                        <div className={`${classes.SettingToggles}`}>
                            <button className={`${classes.Add}`} onClick={()=>{addBlocked()}}>ADD</button>
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
                            <input type="checkbox" checked = {search} onClick={() => {setSearch(!search)}}/>
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
                            <input type="checkbox" checked = {personal1} onClick={() => {setPersonal1(!personal1)}}/>
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
                            <input type="checkbox" checked = {personal2} onClick={() => {setPersonal2(!personal2)}}/>
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
                            <input type="checkbox" checked = {alcohol} onClick={() => {setAlcohol(!alcohol)}}/>
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
                            <input type="checkbox" checked = {date} onClick={() => {setDate(!date)}}/>
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
                            <input type="checkbox" checked = {gamble} onClick={() => {setGambling(!gamble)}}/>
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
                            <input type="checkbox" checked ={pregnancy} onClick={() => {setPregnancy(!pregnancy)}}/>
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
                            <input type="checkbox" checked = {weight} onClick={() => {setWeight(!weight)}}/>
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
                            <input type="checkbox" />
                            <span className={`${classes.slider} ${classes.round}`}></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>

    )

}