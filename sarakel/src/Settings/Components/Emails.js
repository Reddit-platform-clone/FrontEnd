import React from 'react';
import './bootstrap.min.css';
import style from './Tabs.module.css'
import axios from 'axios'; 
import mock from '../../mock.json';
import { getToken } from '../../HomePage/token';
export default function Emails(){
    const [newfollowers, setNewFollow] = React.useState()
    const [chatreq, setChatReq] = React.useState()
    const [unsub, setUnsub] = React.useState()
    let token = getToken()
    function handleNewFollowers(){
        setNewFollow(!newfollowers);
        sendInfo({newFollowersEmail: !newfollowers});
    }
    function handleChatRequest(){
        setChatReq(!chatreq);
        sendInfo({chatRequesetsEmail: !chatreq});
    }
    function handleUnSub(){
        setUnsub(!unsub);
        sendInfo({unsubscribeFromAllEmails: !unsub});
    }
    async function sendInfo(data){
            const promise = await axios.patch('http://localhost:5000/api/v1/me/prefs',data,{
                headers:{Authorization: `Bearer ${token} `}     });
            return promise;
    }
    async function GetInfo(){
        const promise = await axios.get('http://localhost:5000/api/v1/me/prefs',{
            headers:{Authorization: `Bearer ${token} `}        });
        return promise.data;
    }
    React.useEffect(() =>{
        async function GetandApply(){
            const data = await GetInfo()
            if(data){
                setNewFollow(data.settings.newFollowersEmail)
                setChatReq(data.settings.chatRequesetsEmail)
                setUnsub(data.settings.unsubscribeFromAllEmails)
                
            }
        }
        
        GetandApply()
    },[])
    return(
        <div className={`${style.tab}`}>
        <div className={`${style.w100}`}>
            <h2 className={`${style.header}`}>Manage Emails</h2>
            <h3 className={`${style.Subheaders}`}>MESSAGES<hr className='mt-2'></hr></h3>
            <div className={`${style.box}`}>
                <div>
                    <h3 className={`${style.SettingTopics} ${style.font}`}>Private messages</h3>
                </div>
                <div className={`${style.SettingToggles}`}>
                    <label className={`${style.switch}`}>
                        <input type="checkbox" />
                        <span className={`${style.slider} ${style.round}`}></span>
                    </label>
                </div>
            </div>
            <div className={`${style.box}`}>
                <div>
                    <h3 className={`${style.SettingTopics} ${style.font}`}>Chat requests</h3>
                </div>
                <div className={`${style.SettingToggles}`}>
                    <label className={`${style.switch}`}>
                        <input type="checkbox" checked={chatreq} onChange={() => {handleChatRequest()}}/>
                        <span className={`${style.slider} ${style.round}`}></span>
                    </label>
                </div>
            </div>
            <h3 className={`${style.SubheadersSpcl}`}>ACTIVITY<hr className='mt-2'></hr> </h3>
            <div className={`${style.box}`}>
                <div>
                    <h3 className={`${style.SettingTopics} ${style.font}`}>New user welcome</h3>
                </div>
                <div className={`${style.SettingToggles}`}>
                    <label className={`${style.switch}`}>
                        <input type="checkbox" />
                        <span className={`${style.slider} ${style.round}`}></span>
                    </label>
                </div>
            </div>            
            <div className={`${style.box}`}>
                <div>
                    <h3 className={`${style.SettingTopics} ${style.font}`}>Comments on your posts</h3>
                </div>
                <div className={`${style.SettingToggles}`}>
                    <label className={`${style.switch}`}>
                        <input type="checkbox" />
                        <span className={`${style.slider} ${style.round}`}></span>
                    </label>
                </div>
            </div>           
            <div className={`${style.box}`}>
                <div>
                    <h3 className={`${style.SettingTopics} ${style.font}`}>Replies to your comments</h3>
                </div>
                <div className={`${style.SettingToggles}`}>
                    <label className={`${style.switch}`}>
                        <input type="checkbox" />
                        <span className={`${style.slider} ${style.round}`}></span>
                    </label>
                </div>
            </div>            
            <div className={`${style.box}`}>
                <div>
                    <h3 className={`${style.SettingTopics} ${style.font}`}>Upvotes on your posts</h3>
                </div>
                <div className={`${style.SettingToggles}`}>
                    <label className={`${style.switch}`}>
                        <input type="checkbox" />
                        <span className={`${style.slider} ${style.round}`}></span>
                    </label>
                </div>
            </div>            
            <div className={`${style.box}`}>
                <div>
                    <h3 className={`${style.SettingTopics} ${style.font}`}>Upvotes on your comments</h3>
                </div>
                <div className={`${style.SettingToggles}`}>
                    <label className={`${style.switch}`}>
                        <input type="checkbox" />
                        <span className={`${style.slider} ${style.round}`}></span>
                    </label>
                </div>
            </div>           
            <div className={`${style.box}`}>
                <div>
                    <h3 className={`${style.SettingTopics} ${style.font}`}>Username mentions</h3>
                </div>
                <div className={`${style.SettingToggles}`}>
                    <label className={`${style.switch}`}>
                        <input type="checkbox" />
                        <span className={`${style.slider} ${style.round}`}></span>
                    </label>
                </div>
            </div>          
            <div className={`${style.box} `}>
                <div>
                    <h3 className={`${style.SettingTopics} ${style.font}`}>New followers</h3>
                </div>
                <div className={`${style.SettingToggles} ${style.mb}`}>
                    <label className={`${style.switch}`}>
                        <input type="checkbox" checked={newfollowers} onChange={() => {handleNewFollowers()}}/>
                        <span className={`${style.slider} ${style.round}`}></span>
                    </label>
                </div>
            </div>
            <h3 className={`${style.Subheaders}`}>NEWSLETTERS<hr className='mt-2'></hr> </h3>
            <div className={`${style.box}`}>
                <div>
                    <h3 className={`${style.SettingTopics} ${style.font}`}>Daily Digest</h3>
                </div>
                <div className={`${style.SettingToggles} ${style.mb}`}>
                    <label className={`${style.switch}`}>
                        <input type="checkbox" />
                        <span className={`${style.slider} ${style.round}`}></span>
                    </label>
                </div>
            </div>
            <h3 className={`${style.SubheadersSpcl}`}><hr className='mt-2'></hr> </h3>
            <div className={`${style.box}`}>
                <div>
                    <h3 className={`${style.SettingTopics} ${style.font}`}>Unsubscribe from all emails</h3>
                </div>
                <div className={`${style.SettingToggles}`}>
                    <label className={`${style.switch}`}>
                        <input type="checkbox" checked={unsub} onChange={() => {handleUnSub()}}/>
                        <span className={`${style.slider} ${style.round}`}></span>
                    </label>
                </div>
            </div>
        </div>
    </div>
    )

}