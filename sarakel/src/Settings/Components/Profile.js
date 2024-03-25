import React from 'react';
import './bootstrap.min.css';
import classes from './Account.module.css' 
import plus from './plus-sign.png'
import arrow from './arrow-left-solid.svg'


export default function Profile(){
    const [social, setSocial] = React.useState("None");
    const link = "https://www.redditstatic.com/desktop2x/img/social-links/" + social.toLocaleLowerCase() + ".png"
    const placeholder = " " + social + " URL"
    const [value, setValue] = React.useState(1)
    const [toggle, setToggle] = React.useState(false)
    const secArray = []
    for(let i=0;i<2;i++){
        if (i===value){
        secArray.push(`${classes.show}`)
        }
        else{
        secArray.push(`${classes.hide}`)
        }
    }
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
                <div className={`${classes.SettingTogglesReverse}`} >
                    <a  className={`${classes.AddLinks} ${classes.font}`} onClick={() => {setToggle(!toggle) ; setValue(0)} } Toggle State><img src={plus} className={`${classes.plusLogo}`}></img>Add social link</a>
                </div>
                {toggle &&(
                <div className={`${classes.SocialLinks}`}>
                    <div className={secArray[0]}>
                        <section className={`${classes.SocialSection}`}>
                            <header className={`${classes.SocialHeader1}`}>
                                <div>
                                Add Social Links
                                </div>
                            </header>
                            <div className={`${classes.SocialDiv} `}>
                                <li className={`${classes.SocialList}`} onClick={()=>{setSocial("Custom"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/custom.png" />
                                    Custom URL
                                </li>
                                <li className={`${classes.SocialList}`} onClick={()=>{setSocial("Reddit"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/reddit.png" />
                                    Reddit
                                </li>
                                <li className={`${classes.SocialList}`} onClick={()=>{setSocial("Instagram"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/instagram.png" />
                                    Instagram
                                </li>
                                <li className={`${classes.SocialList}`}onClick={()=>{setSocial("Twitter"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/twitter.png" />
                                    Twitter
                                </li>
                                <li className={`${classes.SocialList}`} onClick={()=>{setSocial("Tiktok"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/tiktok.png" />
                                    Tiktok
                                </li>
                                <li className={`${classes.SocialList}`} onClick={()=>{setSocial("Twitch"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/twitch.png" />
                                    Twitch
                                </li>
                                <li className={`${classes.SocialList}`} onClick={()=>{setSocial("Facebook"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/facebook.png" />
                                    Facebook
                                </li>
                                <li className={`${classes.SocialList}`} onClick={()=>{setSocial("Youtube"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/youtube.png" />
                                    Youtube
                                </li>
                                <li className={`${classes.SocialList}`} onClick={()=>{setSocial("Tumblr"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/tumblr.png" />
                                    Tumblr
                                </li>
                                <li className={`${classes.SocialList}`} onClick={()=>{setSocial("Spotify"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/spotify.png" />
                                    Spotify
                                </li>
                                <li className={`${classes.SocialList}`} onClick={()=>{setSocial("SoundCloud"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/soundcloud.png" />
                                    SoundCloud
                                </li>
                                <li className={`${classes.SocialList}`} onClick={()=>{setSocial("Beacons"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/beacons.png" />
                                    Beacons
                                </li>
                                <li className={`${classes.SocialList}`} onClick={()=>{setSocial("Linktree"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/linktree.png" />
                                    Linktree
                                </li>
                                <li className={`${classes.SocialList}`} onClick={()=>{setSocial("Discord"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/discord.png" />
                                    Discord
                                </li>
                                <li className={`${classes.SocialList}`} onClick={()=>{setSocial("Venmo"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/venmo.png" />
                                    Venmo
                                </li>
                                <li className={`${classes.SocialList}`} onClick={()=>{setSocial("Cash App"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/cash_app.png" />
                                    Cash App
                                </li>
                                <li className={`${classes.SocialList}`} onClick={()=>{setSocial("Patreon"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/patreon.png" />
                                    Patreon
                                </li>
                                <li className={`${classes.SocialList}`} onClick={()=>{setSocial("Kofi"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/kofi.png" />
                                    Kofi
                                </li>
                                <li className={`${classes.SocialList}`} onClick={()=>{setSocial("PayPal"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/paypal.png" />
                                    PayPal
                                </li>
                                <li className={`${classes.SocialList}`} onClick={()=>{setSocial("Cameo"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/cameo.png" />
                                    Cameo
                                </li>
                                <li className={`${classes.SocialList}`} onClick={()=>{setSocial("OnlyFans"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/onlyfans.png" />
                                    OnlyFans
                                </li>
                                <li className={`${classes.SocialList}`} onClick={()=>{setSocial("Substack"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/substack.png" />
                                    Substack
                                </li>
                                <li className={`${classes.SocialList}`} onClick={()=>{setSocial("Kichstarter"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/kickstarter.png" />
                                    Kickstarter
                                </li>
                                <li className={`${classes.SocialList}`} onClick={()=>{setSocial("Buy Me a Coffe"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/buy_me_a_coffee.png" />
                                    Buy Me a COffee
                                </li>
                                <li className={`${classes.SocialList}`} onClick={()=>{setSocial("Shopify"); setValue(1)}}>
                                <img className={`${classes.SocialImg}`} src="https://www.redditstatic.com/desktop2x/img/social-links/shopify.png" />
                                    Shopify
                                </li>
                            </div>
                        </section>
                    </div>
                    <div className={secArray[1]}>
                        <section className={`${classes.SocialInput}`}>
                            <header className={`${classes.SocialHeader}`}>
                            <img src={arrow} className={`${classes.BackArrow}`} onClick={() =>{setValue(0)}}></img>
                                <div>
                                    Add Social Links
                                </div>
                                <div className={`${classes.SettingToggles}`}>
                                <a href="#" className={`${classes.Change} ${classes.font}`}>Save</a>
                                </div>
                            </header>
                            
                            <div className={`${classes.SocialInputDiv}`}>
                            <li className={`${classes.SocialList}`}>
                                <img className={`${classes.SocialImg}`} src={link} />
                                    {social}
                            </li>
                            <div className={`${classes.BlockUserDiv}`}>
                                <div className={`${classes.w100} ${classes.InputTextDiv}`}>
                                    <input type="text" placeholder={placeholder}  className={`${classes.w100} ${classes.Inputbox}`}></input>
                                </div>
                            </div>
                            </div>
                        </section>
                    </div>
                </div>)}
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