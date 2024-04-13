import React from 'react';
import './bootstrap.min.css';
import classes from './Account.module.css' 
import mock from 'F:/Cairo university/CMPS203, Software Engineering/software-project/FrontEnd/sarakel/src/mock.json';
export default function Notifications(){
    let userId
    let Mentions
    let Comments
    let UpvotePost
    let UpvoteComments
    let Replies
    let NewFollowers
    let Posts
    mock.users.map((user) => {
        if(user.LoggedIn === 1){
            userId = user.id
            Mentions = user.Mentions
            Comments = user.Comments
            UpvotePost = user.UpvotePost
            UpvoteComments = user.UpvoteComments
            Replies = user.Replies
            NewFollowers = user.NewFollowers
            Posts = user.Posts
        }
    })  
    const [mention ,setMention] = React.useState(Mentions)
    const [comments, setComments] = React.useState(Comments)
    const[upvotepost, setUpvotePost] = React.useState(UpvotePost)
    const[upvotecomment, setUpvotecomment] = React.useState(UpvoteComments)
    const [replies, setReplies] = React.useState(Replies)
    const [newfollowers, setNewFollow] = React.useState(NewFollowers)
    const [post, setPosts] = React.useState(Posts)
    mock.users.map((user) => {
        if(user.LoggedIn === 1){
          user.Mentions  =  mention
           user.Comments  = comments
           user.UpvotePost  = upvotepost
             user.UpvoteComments = upvotecomment
            user.Replies = replies
           user.NewFollowers =  newfollowers
             user.Posts= post
        }
    }) 

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
                        <input type="checkbox" checked={mention} onClick={() => {setMention(!mention)}}/>
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
                        <input type="checkbox" checked={comments} onClick={() => {setComments(!comments)}}/>
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
                        <input type="checkbox" checked={upvotepost} onClick={() => {setUpvotePost(!UpvotePost)}}/>
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
                        <input type="checkbox" checked={upvotecomment} onClick={() => {setUpvotecomment(!upvotecomment)}}/>
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
                        <span className={`${classes.slider} ${classes.round}`} checked={replies} onClick={() => {setReplies(!replies)}}></span>
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
                        <input type="checkbox" checked={newfollowers} onClick={() => {setNewFollow(!newfollowers)}}/>
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
                        <input type="checkbox" checked={post} onClick={() => {setPosts(!post)}}/>
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