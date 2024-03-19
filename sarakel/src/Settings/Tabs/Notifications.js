import React from 'react';
import './bootstrap.min.css';
import classes from './Account.module.css' 

export default function Notifications(){

    return(
        <div className={`${classes.tab}`}>
        <div className={`${classes.w100}`}>
            <h2 className={`${classes.header}`}>Safety & Privacy</h2>
            <h3 className={`${classes.Subheaders}`}>MESSAGES<hr className='mt-2'></hr></h3>
            <div className={`${classes.box}`}>
                <div>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Private messages</h3>
                </div>
                <div className={`${classes.SettingToggles}`}>
                    <label className={`${classes.switch}`}>
                        <input type="checkbox" />
                        <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                </div>
            </div>
            <div className={`${classes.box}`}>
                <div>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Chat messagess</h3>
                </div>
                <div className={`${classes.SettingToggles}`}>
                    <label className={`${classes.switch}`}>
                        <input type="checkbox" />
                        <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                </div>
            </div>
            <div className={`${classes.box}`}>
                <div>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Chat requests</h3>
                </div>
                <div className={`${classes.SettingToggles}`}>
                    <label className={`${classes.switch}`}>
                        <input type="checkbox" />
                        <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                </div>
            </div>
            <h3 className={`${classes.Subheaders}`}>ACTIVITY<hr className='mt-2'></hr> </h3>
            <div className={`${classes.box}`}>
                <div>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Mentions of u/username</h3>
                </div>
                <div className={`${classes.SettingToggles}`}>
                    <label className={`${classes.switch}`}>
                        <input type="checkbox" />
                        <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                </div>
            </div>            
            <div className={`${classes.box}`}>
                <div>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Comments on your posts</h3>
                </div>
                <div className={`${classes.SettingToggles}`}>
                    <label className={`${classes.switch}`}>
                        <input type="checkbox" />
                        <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                </div>
            </div>           
            <div className={`${classes.box}`}>
                <div>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Upvotes on your posts</h3>
                </div>
                <div className={`${classes.SettingToggles}`}>
                    <label className={`${classes.switch}`}>
                        <input type="checkbox" />
                        <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                </div>
            </div>            
            <div className={`${classes.box}`}>
                <div>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Upvotes on your comments</h3>
                </div>
                <div className={`${classes.SettingToggles}`}>
                    <label className={`${classes.switch}`}>
                        <input type="checkbox" />
                        <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                </div>
            </div>            
            <div className={`${classes.box}`}>
                <div>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Replies to your comments</h3>
                </div>
                <div className={`${classes.SettingToggles}`}>
                    <label className={`${classes.switch}`}>
                        <input type="checkbox" />
                        <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                </div>
            </div>           
            <div className={`${classes.box}`}>
                <div>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Activity on your comments</h3>
                </div>
                <div className={`${classes.SettingToggles}`}>
                    <label className={`${classes.switch}`}>
                        <input type="checkbox" />
                        <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                </div>
            </div>          
            <div className={`${classes.box}`}>
                <div>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Activity on chat posts you're in</h3>
                </div>
                <div className={`${classes.SettingToggles}`}>
                    <label className={`${classes.switch}`}>
                        <input type="checkbox" />
                        <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                </div>
            </div>           
             <div className={`${classes.box}`}>
                <div>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>New followers</h3>
                </div>
                <div className={`${classes.SettingToggles}`}>
                    <label className={`${classes.switch}`}>
                        <input type="checkbox" />
                        <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                </div>
            </div>            
            <div className={`${classes.box}`}>
                <div>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Awards you receive</h3>
                </div>
                <div className={`${classes.SettingToggles}`}>
                    <label className={`${classes.switch}`}>
                        <input type="checkbox" />
                        <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                </div>
            </div>            
            <div className={`${classes.box}`}>
                <div>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Posts you follow</h3>
                </div>
                <div className={`${classes.SettingToggles}`}>
                    <label className={`${classes.switch}`}>
                        <input type="checkbox" />
                        <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                </div>
            </div>            
            <div className={`${classes.box}`}>
                <div>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Comments you follow</h3>
                </div>
                <div className={`${classes.SettingToggles}`}>
                    <label className={`${classes.switch}`}>
                        <input type="checkbox" />
                        <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                </div>
            </div>
            <h3 className={`${classes.Subheaders}`}>SENSITIVE ADVERTISING CATEGORIES<hr className='mt-2'></hr> </h3>
            <div className={`${classes.box}`}>
                <div>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Trending posts</h3>
                </div>
                <div className={`${classes.SettingToggles}`}>
                    <label className={`${classes.switch}`}>
                        <input type="checkbox" />
                        <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                </div>
            </div>
            <div className={`${classes.box}`}>
                <div>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Community recommendations</h3>
                </div>
                <div className={`${classes.SettingToggles}`}>
                    <label className={`${classes.switch}`}>
                        <input type="checkbox" />
                        <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                </div>
            </div>
            <div className={`${classes.box}`}>
                <div>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>ReReddit</h3>
                </div>
                <div className={`${classes.SettingToggles}`}>
                    <label className={`${classes.switch}`}>
                        <input type="checkbox" />
                        <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                </div>
            </div>
            <div className={`${classes.box}`}>
                <div>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Featured content</h3>
                </div>
                <div className={`${classes.SettingToggles}`}>
                    <label className={`${classes.switch}`}>
                        <input type="checkbox" />
                        <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                </div>
            </div>
            <h3 className={`${classes.Subheaders}`}>UPDATES <hr className='mt-2'></hr> </h3>
            <div className={`${classes.box}`}>
                <div>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Reddit announcements</h3>
                </div>
                <div className={`${classes.SettingToggles}`}>
                    <label className={`${classes.switch}`}>
                        <input type="checkbox" />
                        <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                </div>
            </div>
            <div className={`${classes.box}`}>
                <div>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Cake day</h3>
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