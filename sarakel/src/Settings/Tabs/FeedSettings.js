import React from 'react';
import './bootstrap.min.css';
import classes from './Account.module.css' 
import icon from './google-logo-9808.png'
import can from './red-trash-can-icon.png'

export default function FeedSettings() {
    return(
        <div className={`${classes.tab}`}>
            <div className=''>
                <h2 className={`${classes.header}`}>Feed settings</h2>
                <h3 className={`${classes.Subheaders}`}>CONTENT PREFERENCES <hr className='mt-2'></hr></h3>
                <div className={`${classes.box}`}>
                    <div>
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Show mature (18+) content</h3>
                        <p className={`${classes.BoxText} ${classes.Subtext}`}>See NSFW (Not Safe for Work) mature and adult images, videos, written content, and other media in your Reddit feeds and search results.</p>
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
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Blur mature images and media</h3>
                        <p className={`${classes.BoxText} ${classes.Subtext}`}>Blur previews and thumbnails for any images or videos tagged as NSFW (Not Safe for Work).</p>
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
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Enable home feed recommendations</h3>
                        <p className={`${classes.BoxText} ${classes.Subtext}`}>Allow us to introduce recommended posts in your home feed.</p>
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
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Autoplay media</h3>
                        <p className={`${classes.BoxText} ${classes.Subtext}`}>Play videos and gifs automatically when in the viewport.</p>
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
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Reduce Animations</h3>
                        <p className={`${classes.BoxText} ${classes.Subtext}`}>Reduce animations on posts, comments, and feeds.</p>
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
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Community themes</h3>
                        <p className={`${classes.BoxText} ${classes.Subtext}`}>Use custom themes for all communities. You can also turn this off on a per community basis.</p>
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
                    <h3 className={`${classes.SettingTopics}`}>Community content sort</h3>
                    <p className={`${classes.Subtext} ${classes.font}`}>Choose how you would like content organized in communities you visit. This will not affect global feeds such as Home, or Popular.</p>
                    </div>
                    <div className={`${classes.SettingToggles}`}>
                        <select className={`${classes.ContentView} ${classes.Blue}`} selected="selected">
                            <option className={`${classes.ContentViewOptions}`}>Hot</option> 
                            <option className={`${classes.ContentViewOptions}`}>Top</option> 
                            <option className={`${classes.ContentViewOptions}`}>New</option> 
                            <option className={`${classes.ContentViewOptions}`}>Rising</option> 
                        </select>
                    </div>
                </div>
                <div className={`${classes.box} ${classes.disabled}`}>
                        <div >
                            <h3 className={`${classes.SettingTopics} ${classes.font}`}>Remember per community</h3>
                            <p className={`${classes.Subtext} ${classes.BoxText}`} >Enable if you would like each community to remember and use the last content sort you selected for that community.</p>
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
                    <h3 className={`${classes.SettingTopics}`}>Global content view</h3>
                    <p className={`${classes.Subtext} ${classes.font}`}>Choose how you would like content displayed in feeds. This control is also found above your feed.</p>
                    </div>
                    <div className={`${classes.SettingToggles}`}>
                        <select className={`${classes.ContentView} ${classes.Blue}`} selected="selected">
                            <option className={`${classes.ContentViewOptions}`}>Card</option> 
                            <option className={`${classes.ContentViewOptions}`}>Classic</option> 
                            <option className={`${classes.ContentViewOptions}`}>Compact</option> 
                        </select>
                    </div>
                </div>
                <div className={`${classes.box} ${classes.disabled}`}>
                        <div >
                            <h3 className={`${classes.SettingTopics} ${classes.font}`}>Remember per community</h3>
                            <p className={`${classes.Subtext} ${classes.BoxText}`} >Enable if you would like each community to remember and use the last content sort you selected for that community.</p>
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
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Open posts in new tab</h3>
                        <p className={`${classes.Subtext}`}>Enable to always open posts in a new tab.</p>
                    </div>
                    <div className={`${classes.SettingToggles}`}>
                        <label className={`${classes.switch}`}>
                            <input type="checkbox" />
                            <span className={`${classes.slider} ${classes.round}`}></span>
                        </label>
                    </div>
                </div>
                <h3 className={`${classes.Subheaders}`}>POST PREFERENCES <hr className='mt-2'></hr> </h3>
                <div className={`${classes.box}`}>
                    <div>
                        <h3 className={`${classes.SettingTopics} ${classes.font}`}>Default to markdown</h3>
                        <p className={`${classes.Subtext}`}>When posting, your input will default to markdown text instead of fancy pants.</p>
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