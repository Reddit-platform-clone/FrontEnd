import React from 'react';
import './bootstrap.min.css';
import classes from './Account.module.css' 
import plus from './plus-sign.png'
export default function Profile(){
    return(
    <div className={`${classes.tab}`}>
        <div className={`${classes.w100}`}>
            <h2 className={`${classes.header}`}>Customize profile</h2>
            <h3 className={`${classes.Subheaders}`}>PROFILE INFORMATION <hr className='mt-2'></hr></h3>
            <div className={`${classes.mb}`} >
                <div  >
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Display name (optional)</h3>
                     <p className={`${classes.Subtext}`}>Set a display name. This does not change your username.</p>
                </div>
                <div className={`${classes.BlockUserDiv}`}>
                        <div className={`${classes.w100} ${classes.InputTextDiv}`}>
                            <input type="text" placeholder='Display name (optional)'  className={`${classes.w100} ${classes.Inputbox}`}></input>
                        </div>
                    </div>
            </div>
            <div >
                <div >
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>About (optional)</h3>
                    <p className={`${classes.Subtext}`}>Set a display name. This does not change your username.</p>
                </div>
                <div className={`${classes.box}`}>
                        <textarea placeholder='About (optional)' maxLength='200' rows='4' className={`${classes.BgTextBox}`}></textarea>
                </div>
            </div>
            <div >
                <div>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Social links (5 max)</h3>
                    <p className={`${classes.Subtext}`}>People who visit your profile will see your social links.</p>
                </div>
                <div className={`${classes.SettingTogglesReverse}`}>
                    <a href="#" className={`${classes.AddLinks} ${classes.font}`}><img src={plus} className={`${classes.plusLogo}`}></img>Add social link</a>
                </div>
            </div>
            <h3 className={`${classes.Subheaders}`}>IMAGES <hr className='mt-2'></hr> </h3>
            <div className={`${classes.box}`}>
                <div>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Profile and banner pictures</h3>
                    <p className={`${classes.Subtext}`}>Images must be .png or .jpg format</p>
                </div>
                <div className={`${classes.SettingToggles}`}>
                <a href="#" className={`${classes.Change} ${classes.font}`}>Change</a>
                </div>
            </div>
            <h3 className={`${classes.Subheaders}`}>PROFILE CATEGORY<hr className='mt-2'></hr> </h3>
            <div className={`${classes.box}`} >
                <div className={`${classes.BoxText}`}>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>NSFW</h3>
                    <p className={`${classes.Subtext}`}>This content is NSFW (may contain nudity, pornography, profanity or inappropriate content for those under 18)</p>
                </div>
                <div className={`${classes.SettingToggles}`}>
                    <label className={`${classes.switch}`}>
                            <input type="checkbox"/>
                            <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                </div>
            </div>
            <h3 className={`${classes.Subheaders}`}>ADVANCED<hr className='mt-2'></hr></h3>
            <div className={`${classes.box}`} >
                <div className={`${classes.BoxText}`}>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Allow people to follow you</h3>
                    <p className={`${classes.Subtext}`}>Followers will be notified about posts you make to your profile and see them in their home feed.</p>
                </div>
                <div className={`${classes.SettingToggles}`}>
                    <label className={`${classes.switch}`}>
                            <a type="checkbox" />
                            <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                </div>
            </div>
            <div className={`${classes.box}`} >
                <div className={`${classes.BoxText}`}>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Content visibility</h3>
                    <p className={`${classes.Subtext}`}>Posts to this profile can appear in <a href='#' className={`${classes.Blue}`}>r/all</a> and your profile can be discovered in <a href='#' className={`${classes.Blue}`}>r/users</a> </p>
                </div>
                <div className={`${classes.SettingToggles}`}>
                    <label className={`${classes.switch}`}>
                            <a type="checkbox" />
                            <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                </div>
            </div>
            <div className={`${classes.box}`} >
                <div className={`${classes.BoxText}`}>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Active in communities visibility</h3>
                    <p className={`${classes.Subtext}`}>Show which communities I am active in on my profile.</p>
                </div>
                <div className={`${classes.SettingToggles}`}>
                    <label className={`${classes.switch}`}>
                            <a type="checkbox" />
                            <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                </div>
            </div>
            <div className={`${classes.box}`}>
                <div>
                    <h3 className={`${classes.SettingTopics} ${classes.font}`}>Clear history</h3>
                    <p className={`${classes.Subtext}`}>Delete your post views history.</p>
                </div>
                <div className={`${classes.SettingToggles}`}>
                <a href="#" className={`${classes.Change} ${classes.font}`}>Clear history</a>
                </div>
            </div>
            <h3 className={`${classes.Subheaders}`}>PROFILE MODERATION<hr className='mt-2'></hr> </h3>
            <div className={`${classes.box}`}>For moderation tools please visit our <a href='#' className={`${classes.Blue}`}>Profile Moderation page</a></div>
    </div>   
</div>
    )

}