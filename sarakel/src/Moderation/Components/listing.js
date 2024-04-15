import React, { useState, useEffect } from 'react';
import '../../bootstrap.min.css'
import classes from '../Moderation.module.css'
import mock from '../../mock.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import jsonData from '../../mock.json';

export default function Listing(){
    let img
    mock.users.map((user) => {
        if(user.LoggedIn === 1){
            img = user.image
            return
        }
    }) 
    const [posts, setPosts] = useState();
    const [loading, setLoading] = useState(true);

    const [hiddenPosts, setHiddenPosts] = useState({});
  
    function GetUserName(id){
        let username = 5
        mock.users.map((user) => {
            if(user.id === id){
                username = user.name
                  return user.name
            }
        })
        return username
    }
    
    function GetUserImage(id){
        mock.users.map((user) => {
            if(user.id === id){
                console.log(566)
                 return user.image[0]  
            }
        })
    }

    useEffect(() => {
      const fetchData = () => {
        setTimeout(() => {
          setPosts(jsonData.communities[0]);
          setLoading(false);
        }, 1000);
      };
  
      fetchData();
  
      return () => {
        // Cleanup tasks if needed
      };
    }, []);
  

  
    return (
        <div >
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="">
            {posts.length === 0 ? (
              <p>No posts to display.</p>
            ) : (
              posts.ModQueue.map((item) => (
                !hiddenPosts[item.id] ? (
                  <div className={`row  mt-1 ${classes.ModListBox}`}>
                    <div className='row '>
                    <div className='col-1'>
                        <button type="button" class={`btn`}><input className={`${classes.checkBox}`} type='checkbox'></input></button>
                    </div>
                    <div className='col '>
                        <div className='row mt-2 '>
                            <div className='col-1'>
                                <span className={`align-items-center w-100 `}>R/MAMAZAMANHAGAYA</span>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col'>
                                <span className={`${classes.content}`}>{item.title}</span>
                            </div>
                        </div>
                        <div className='row mt-1'>
                            <span className={`${classes.color}`}>{item.text}</span>
                        </div>
                        <div className='row  mt-2'>
                            <img src={item.media} className='col-7'></img>
                        </div>
                        <div className='row mt-1'>
                            <p className={`${classes.color}`}>{item.comments} comments</p>
                        </div>
                        <div className={`row ${classes.ModBanner} align-items-center col-11 rounded mt-2`}>
                            <div className='col-1 '>
                                <img  src={img} className={`${classes.ModImg} w-100 col-12`} ></img>
                            </div>
                            <div className='col'>
                                <div className='row'><a>Removed</a></div>
                                <div className='row '><a>u/MemoNar</a></div>
                            </div>
                        </div>
                        <div className='row mt-3 '>
                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                <button className={`${classes.QueueButtons}`}><span>Add Removal Reasons</span></button>
                            </div>
                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                <button className={`${classes.QueueButtons}`}><span>Approve</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                ) : (
                  <div  className="hidden-post-card">
                    
                  </div>
                )
              ))
            )}
          </div>
        )}
      </div>
    );
}