import React from 'react';
import './bootstrap.min.css';
import classes from './Account.module.css' 

export default function ChatsMessaging(){
    return(
        <div className={`${classes.tab}`}>
        <div className={`${classes.w100}`}>
            <h2 className={`${classes.header}`}>Chat & Messaging</h2>
            <div className={`${classes.box}`}>
                    <div>
                    <h3 className={`${classes.SettingTopics}`}>Who can send you chat requests</h3>
                    </div>
                    <div className={`${classes.SettingToggles}`}>
                        <div className={`${classes.dropdown}`}>
                            <button className={`${classes.dropbtn} `}><span className={`${classes.font}`}>SELECT</span></button>
                            <div className={`${classes.dropdownContent} ${classes.font}`}>
                                <a href="#">Male</a>
                                <a href="#">Woman</a>
                                <a href="#">Non-Binary</a>
                                <a href="#">I Refer To Myself As...</a>
                                <a href="#">I Prefer Not To Say</a>
                            </div>
                        </div>
                    </div>
            </div>
            <div className={`${classes.box}`}>
                    <div>
                    <h3 className={`${classes.SettingTopics}`}>Who can send you private messages</h3>
                    <p className={`${classes.Subtext} ${classes.font}`}>Heads up—Reddit admins and moderators of communities you’ve joined can message you even if they’re not approved.</p>
                    </div>
                    <div className={`${classes.SettingToggles}`}>
                        <div className={`${classes.dropdown}`}>
                            <button className={`${classes.dropbtn} `}><span className={`${classes.font}`}>SELECT</span></button>
                            <div className={`${classes.dropdownContent} ${classes.font}`}>
                                <a href="#">Male</a>
                                <a href="#">Woman</a>
                                <a href="#">Non-Binary</a>
                                <a href="#">I Refer To Myself As...</a>
                                <a href="#">I Prefer Not To Say</a>
                            </div>
                        </div>
                    </div>
            </div>
            <div className={`${classes.box}`}>
                    <div >
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Mark all as read</h3>
                        <p className={`${classes.Subtext}`}>Mark all conversations and invites as read.</p>
                    </div>
                    <div className={`${classes.SettingToggles}`}>
                    <a href="#" className={`${classes.Change} ${classes.font}`}>Mark as Read</a>
                    </div>
            </div>
        </div>
    </div>
    )

}