import React from 'react';
import './bootstrap.min.css';
import classes from './Account.module.css' 
import axios from 'axios';
import mock from 'C:/Users/Khaled/Documents/GitHub/FrontEnd/sarakel/src/mock.json';

export default function FeedSettings() {
    let New
    let Hot
    let Top
    let Rising
    let Card
    let Classic
    let Compact
    const [mature, setMature] = React.useState()
    const [blur,setBlur] = React.useState()
    const [recommendations, setRecommendation] = React.useState()
    const [autoplay, setAutoplay] = React.useState()
    const [reduce, setReduce] = React.useState()
    const [commtheme,setCommTheme] = React.useState()
    const [commsort, setCommSort] = React.useState()
    const [remember1, setRemember1] = React.useState()
    const [contentview, setContentView ] = React.useState()
    const [remember2, setRemember2] = React.useState()
    const [newtab, setNewTab] = React.useState()
    const [MarkDown, setMarkDown] = React.useState()
    
    function handleMature(){
        setMature(!mature)
        sendInfo({showMatureContent: !mature})
    }
    function handleBlur(){
        setBlur(!blur)
        sendInfo({blurMatureContent: !blur})
    }
    function handleRecommendation(){
        setRecommendation(!recommendations)
        sendInfo({enableHomeFeedRecs: !recommendations})
    }
    function handleAutoPlay(){
        setAutoplay(!autoplay)
        sendInfo({autoPlay: !autoplay})
    }
    function handleReduce(){
        setReduce(!reduce)
        sendInfo({reduceAnimations: !reduce})
    }
    function handleCommunityThemes(){
        setCommTheme(!commtheme)
        sendInfo({communityThemes: !commtheme})
    }
    function handleRemember1(){
        setRemember1(!remember1)
        sendInfo({rememberPerCommunity: !remember1})
    }
    function handleRemember2(){
        setRemember1(!remember2)
        sendInfo({rememberPerCommunityView: !remember2})
    }
    function handleOpenNewTab(){
        setNewTab(!newtab)
        sendInfo({openPostsInNewWindow: !newtab})
    }
    function handleMarkDown(){
        setMarkDown(!MarkDown)
        sendInfo({defaultToMarkdown: !MarkDown})
    }
    async function sendInfo(data){
            const promise = await axios.patch('http://localhost:5000/api/v1/me/prefs',data,{
                headers:{Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFzaHJhZiIsImlhdCI6MTcxMjc1NTMyMH0.rLf3qX_XiDt8Ujb9IYdLgfAt89cWyD_1C5MOYPYik9k'}
            });
            return promise;
    }
    async function GetInfo(){
        const promise = await axios.get('http://localhost:5000/api/v1/me/prefs',{
            headers:{Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFzaHJhZiIsImlhdCI6MTcxMjc1NTMyMH0.rLf3qX_XiDt8Ujb9IYdLgfAt89cWyD_1C5MOYPYik9k'}
        });
        return promise.data;
    }
    React.useEffect(() =>{
        async function GetandApply(){
            const data = await GetInfo()
            if(data){
                setMature(data.settings.showMatureContent)
                setBlur(data.settings.blurMatureContent)
                setRecommendation(data.settings.enableHomeFeedRecs)
                setAutoplay(data.settings.autoPlay)
                setReduce(data.settings.reduceAnimations)
                setCommTheme(data.settings.communityThemes)
                setRemember1(data.settings.rememberPerCommunity)
                setRemember2(data.settings.rememberPerCommunityView)
                setNewTab(data.settings.openPostsInNewWindow)
                setMarkDown(data.settings.defaultToMarkdown)
            }
        }
        
        GetandApply()
    },[])

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
                            <input type="checkbox" checked={mature} onChange={() => {handleMature()}}/>
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
                            <input type="checkbox" checked={blur} onChange={() => {handleBlur()}}/>
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
                            <input type="checkbox" checked={recommendations} onChange={() => {handleRecommendation()}}/>
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
                            <input type="checkbox" checked={autoplay} onChange={() => {handleAutoPlay()}}/>
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
                            <input type="checkbox" checked={reduce} onChange={() => {handleReduce()}}/>
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
                            <input type="checkbox" checked={commtheme} onChange={() => {handleCommunityThemes()}}/>
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
                        <select className={`${classes.ContentView} ${classes.Blue}`} >
                            <option className={`${classes.ContentViewOptions}`} onChange={() => {setCommSort("Hot")}} selected={Hot}>Hot</option> 
                            <option className={`${classes.ContentViewOptions}`} onChange={() => {setCommSort("Top")}} selected={Top}>Top</option> 
                            <option className={`${classes.ContentViewOptions}`} onChange={() => {setCommSort("New")}} selected={New}>New</option> 
                            <option className={`${classes.ContentViewOptions}`} onChange={() => {setCommSort("Rising")}} selected={Rising}>Rising</option> 
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
                            <option className={`${classes.ContentViewOptions}`}nClick={() => {setContentView("Card")}} selected={Card}>Card</option> 
                            <option className={`${classes.ContentViewOptions}`} nClick={() => {setCommSort("Compact")}} selected={Classic}>Classic</option> 
                            <option className={`${classes.ContentViewOptions}`}nClick={() => {setCommSort("Classic")}} selected={Compact}>Compact</option> 
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
                            <input type="checkbox" checked={newtab} onChange={() => {handleOpenNewTab()}}/>
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
                            <input type="checkbox" checked={MarkDown} onChange={()=>{handleMarkDown()}}/>
                            <span className={`${classes.slider} ${classes.round}`}></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}