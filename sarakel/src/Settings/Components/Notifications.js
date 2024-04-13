import React from 'react';
import './bootstrap.min.css';
import classes from './Account.module.css' 
import axios from 'axios';
import mock from 'C:/Users/Khaled/Documents/GitHub/FrontEnd/sarakel/src/mock.json';
export default function Notifications(){
    const [mention ,setMention] = React.useState()
    const [comments, setComments] = React.useState()
    const[upvotepost, setUpvotePost] = React.useState()
    const[upvotecomment, setUpvotecomment] = React.useState()
    const [replies, setReplies] = React.useState()
    const [newfollowers, setNewFollow] = React.useState()
    const [postsFollowed, setPostsFollowed] = React.useState()

    function handleMentions(){
        setMention(!mention);
        sendInfo({mentionsOfUsername: !mention});
       
    }
    function handleComments(){
        setComments(!comments);
        sendInfo({commentsOnPosts: !comments});
       
    }
    function handleUpvotesPosts(){
        setUpvotePost(!upvotepost);
        sendInfo({upvotesOnPosts: !upvotepost});
    }
    function handleUpvoteComments(){
        setUpvotecomment(!upvotecomment);
        sendInfo({upvotesOnComments: !upvotecomment});
    }
    function handleReplies(){
        setReplies(!replies);
        sendInfo({repliesToComments: !replies});
    }
    function handleNewFollowers(){
        setNewFollow(!newfollowers);
        sendInfo({newFollowers: !newfollowers});
    }
    function handlePostsFollowed(){
        setPostsFollowed(!postsFollowed);
        sendInfo({postsFollowed: !postsFollowed});
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
                setMention(data.settings.mentionsOfUsername)
                setComments(data.settings.commentsOnPosts)
                setUpvotePost(data.settings.upvotesOnPosts)
                setUpvotecomment(data.settings.upvotesOnComments)
                setReplies(data.settings.repliesToComments)
                setNewFollow(data.settings.newFollowers)
                setPostsFollowed(data.settings.postsFollowed)
            }
        }
        
        GetandApply()
    },[])
    return(
        <div className={`${classes.tab}`}>
        <div className={`${classes.w100}`}>
            <h2 className={`${classes.header}`}>Notifications</h2>
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
                        <input type="checkbox" checked={mention} onChange={() => {handleMentions()}}/>
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
                        <input type="checkbox" checked={comments} onChange={() => {handleComments()}}/>
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
                        <input type="checkbox" checked={upvotepost} onChange={() => {handleUpvotesPosts()}}/>
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
                        <input type="checkbox" checked={upvotecomment} onChange={() => {handleUpvoteComments()}}/>
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
                        <span className={`${classes.slider} ${classes.round}`} checked={replies} onChange={() => {handleReplies()}}></span>
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
                        <input type="checkbox" checked={newfollowers} onChange={() => {handleNewFollowers()}}/>
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
                        <input type="checkbox" checked={postsFollowed} onChange={() => {handlePostsFollowed()}}/>
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