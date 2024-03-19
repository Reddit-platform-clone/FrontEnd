import React, { } from 'react';
import style from './SettingPage.module.css'
import Account from './Tabs/Account'
import Profile from './Tabs/Profile'
import FeedSettings from './Tabs/FeedSettings'
import SafetyPrivacy from './Tabs/Safety&Privacy';
import Notifications from './Tabs/Notifications';
import Emails from './Tabs/Emails';
import Subscription from './Tabs/Subscription';
import ChatsMessaging from './Tabs/Chats&Messaging';


export default function Settings() {
    const [value,setValue] = React.useState(0)
    const tabArray = []
    const actArray = []
    for(let i=0;i<8;i++){
        if (i===value){
        actArray.push(`${style.btn} ${style.active}`)
        tabArray.push(`${style.show}`)
        }
        else{
        actArray.push(`${style.btn}`)
        tabArray.push(`${style.hide}`)
        }
    }
    return(
        <div className='container'>
            <h3 className={`${style.SettingHeader}`}>User settings</h3>
            <div className="container" >
                <a className={`${style.li}`} ><button type='button' className={actArray[0]} onClick={()=>{setValue(0)}}>Account</button></a>
                <a className={`${style.li}`} ><button type='button' className={actArray[1]} onClick={()=>{setValue(1)}}>Profile</button></a>
                <a className={`${style.li}`} ><button type='button' className={actArray[2]} onClick={()=>{setValue(2)}}>Safety & Privacy</button></a>
                <a className={`${style.li}`} ><button type='button' className={actArray[3]} onClick={()=>{setValue(3)}}>Feed Settings</button></a>
                <a className={`${style.li}`} ><button type='button' className={actArray[4]} onClick={()=>{setValue(4)}}>Notifications</button></a>
                <a className={`${style.li}`} ><button type='button' className={actArray[5]} onClick={()=>{setValue(5)}}>Emails</button></a>
                <a className={`${style.li}`} ><button type='button' className={actArray[6]} onClick={()=>{setValue(6)}}>Subscriptions</button></a>
                <a className={`${style.li}`} ><button type='button' className={actArray[7]} onClick={()=>{setValue(7)}}>Chat & Messaging</button></a>
            </div>
            <hr className='m-0'></hr>
             <div className={tabArray[0]}>
             <Account />
             </div>
             <div className={tabArray[1]}>
             <Profile />
             </div>
             <div className={tabArray[2]}>
             <SafetyPrivacy />
             </div>
             <div className={tabArray[3]}>
             <FeedSettings />
             </div>
             <div className={tabArray[4]}>
             <Notifications />
             </div>
             <div className={tabArray[5]}>
             <Emails />
             </div>
             <div className={tabArray[6]}>
             <Subscription />
             </div>
             <div className={tabArray[7]}>
             <ChatsMessaging />
             </div>

        </div>
    )
}
