import React from 'react';
import './bootstrap.min.css';
import classes from './Account.module.css' 

export default function SafetyPrivacy() {
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
                            <input type="text" placeholder=' Block New User'  className={`${classes.w100} ${classes.Inputbox}`}></input>
                        </div>
                        <div className={`${classes.SettingToggles}`}>
                            <button className={`${classes.Add}`}>ADD</button>
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
                            <input type="text" placeholder=' MUTE NEW COMMUNITY'  className={`${classes.w100} ${classes.Inputbox}`}></input>
                            
                        </div>
                        <div className={`${classes.SettingToggles}`}>
                            <button className={`${classes.Add}`}>ADD</button>
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
                            <input type="checkbox" />
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
                            <input type="checkbox" />
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
                            <input type="checkbox" />
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
                            <input type="checkbox" />
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
                            <input type="checkbox" />
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
                            <input type="checkbox" />
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
                            <input type="checkbox" />
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