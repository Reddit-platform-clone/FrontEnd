import React from 'react';
import './bootstrap.min.css';
import classes from './Account.module.css' 
import mock from 'F:/Cairo university/CMPS203/software-project/FrontEnd/sarakel/src/mock.json';

export default function FeedSettings() {
    let UserId
    let matureContent
    let Blur
    let Recommendations
    let Autoplay
    let Reduce
    let CommTheme
    let CommSort
    let Remember1
    let ContentView
    let Remember2
    let NewTab
    let New
    let Hot
    let Top
    let Rising
    let Card
    let Classic
    let Compact
    mock.users.map((user) => {
        if(user.LoggedIn === 1){
            UserId = user.id
            matureContent = user.matureContent
            Blur = user.Blur
            Recommendations = user.recommendations
            Autoplay = user.Autoplay
            Reduce = user.Reduce
            CommTheme = user.CommTheme
            CommSort = user.CommSort
            Remember1 = user.remember1
            ContentView = user.ContentView
            Remember2 = user.remember2
            NewTab = user.NewTab
        }
    })
    const [mature, setMature] = React.useState(matureContent)
    const [blur,setBlur] = React.useState(Blur)
    const [recommendations, setRecommendation] = React.useState(Recommendations)
    const [autoplay, setAutoplay] = React.useState(Autoplay)
    const [reduce, setReduce] = React.useState(Reduce)
    const [commtheme,setCommTheme] = React.useState(CommTheme)
    const [commsort, setCommSort] = React.useState(CommSort)
    const [remember1, setRemember1] = React.useState(Remember1)
    const [contentview, setContentView ] = React.useState(ContentView)
    const [remember2, setRemember2] = React.useState(Remember2)
    const[newtab, setNewTab] = React.useState(NewTab)
    mock.users.map((user) => {
        if(user.LoggedIn === 1){
            user.matureContent = mature
           user.Blur = blur 
            user.recommendations = recommendations
           user.Autoplay = autoplay 
           user.Reduce =  reduce  
           user.CommTheme = commtheme  
           user.CommSort = commsort  
           user.remember1 = remember1  
           user.ContentView = contentview 
           user.remember2 = remember2  
           user.NewTab = newtab 
        }
    })
    if(commsort === "New"){
        New = true
    }else{
        New = false
    }
    if(commsort === "Hot"){
        Hot = true
    }else{
        Hot = false
    }
    if(commsort === "Top"){
        Top = true
    }else{
        Top = false
    }
    if(commsort === "Rising"){
        Rising= true
    }else{
        Rising = false
    }
    if(contentview === "Card"){
        Card= true
    }else{
        Card = false
    }
    if(contentview === "Compact"){
        Compact = true
    }else{
        Compact = false
    }
    if(contentview === "Classic"){
        Classic = true
    }else{
        Classic = false
    }
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
                            <input type="checkbox" checked={matureContent} onClick={() => {setMature(!matureContent)}}/>
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
                            <input type="checkbox" checked={blur} onClick={() => {setBlur(!blur)}}/>
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
                            <input type="checkbox" checked={recommendations} onClick={() => {setRecommendation(!recommendations)}}/>
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
                            <input type="checkbox" checked={autoplay} onClick={() => {setAutoplay(!autoplay)}}/>
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
                            <input type="checkbox" checked={autoplay} onClick={() => {setReduce(!reduce)}}/>
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
                            <input type="checkbox" checked={commtheme} onClick={() => {setCommTheme(!commtheme)}}/>
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
                            <option className={`${classes.ContentViewOptions}`} onClick={() => {setCommSort("Hot")}} selected={Hot}>Hot</option> 
                            <option className={`${classes.ContentViewOptions}`} onClick={() => {setCommSort("Top")}} selected={Top}>Top</option> 
                            <option className={`${classes.ContentViewOptions}`} onClick={() => {setCommSort("New")}} selected={New}>New</option> 
                            <option className={`${classes.ContentViewOptions}`} onClick={() => {setCommSort("Rising")}} selected={Rising}>Rising</option> 
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
                            <input type="checkbox" nClick={() => {setNewTab(!newtab)}}/>
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