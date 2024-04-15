
import '../../bootstrap.min.css'
import classes from '../Moderation.module.css'
import jsonData from '../../mock.json';
import mock from '../../mock.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import React, { useState, useEffect } from 'react';
import ReactPlayer from "react-player";


 function Listing(queue){
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
  

    if(queue + 1 === 1){
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
    )}else if(queue + 1 ===2){
        return (
            <div >
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="">
                {posts.ReportedQueue.length === 0 ? (
                  <p>No posts to display.</p>
                ) : (
                  posts.ReportedQueue.map((item) => (
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
        )
    }else if(queue+1 ===3){
        return (
            <div >
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="">
                {posts.RemovedQueue.length === 0 ? (
                  <p>No posts to display.</p>
                ) : (
                  posts.RemovedQueue.map((item) => (
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
        )
    }else if(queue+1 ===4){
        return (
            <div >
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="">
                {posts.EditedQueue.length === 0 ? (
                  <p>No posts to display.</p>
                ) : (
                  posts.EditedQueue.map((item) => (
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
        )
    }else if(queue+1 ===5){
        return (
            <div >
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="">
                {posts.UnmoderatedQueue.length === 0 ? (
                  <p>No posts to display.</p>
                ) : (
                  posts.UnmoderatedQueue.map((item) => (
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
        )
    }
}
export default function Queues(){
    const actArray = []
    const buttArray = []
    const [value, setValue] = React.useState(0)
    for(let i=0;i<5;i++){
        if(i === value){
            actArray.push(`${classes.actMenu} ${classes.QueueButtons}`)
        }else{
            actArray.push(`${classes.QueueButtons}`)
        }
    }
    let img
    mock.users.map((user) => {
        if(user.LoggedIn === 1){
            img = user.image
            return
        }
    }) 
    const [Sort1, setSort1] = React.useState("Newest first")
    const [Sort2, setSort2] = React.useState("Posts and comments")
    

    return(

            <div className='container-md '>
            <div className='row m-3  justify-content-center'>
                <div className='col-8  '>
                    <div className='container-md'>
                        <div className='row'>
                            <div className='col  d-flex'>
                                <span className={`  ${classes.QueuesHeader}`}>Queues</span>
                            	<img src={img} className={`${classes.ModImg}`}></img>
                            </div>
                        </div>
                        <div className='row mt-3 '>
                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                <button className={actArray[0]} onClick={()=>{setValue(0)}}><span>Mod Queue</span></button>
                            </div>
                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                <button className={actArray[1]} onClick={()=>{setValue(1)}}><span>Reported</span></button>
                            </div>
                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                <button className={actArray[2]} onClick={()=>{setValue(2)}}><span>Removed</span></button>
                            </div>
                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                <button className={actArray[3]} onClick={()=>{setValue(3)}}><span>Edited</span></button>
                            </div>
                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                <button className={actArray[4]} onClick={()=>{setValue(4)}}><span>Unmoderated</span></button>
                            </div>
                        </div>
                        <div className='row justify-content mt-3'>
                            <div className='col-auto'>
                                <div class="dropdown">
                                    <button className='btn  dropdown-toggle' type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                       {Sort1}
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a class="dropdown-item" onClick={()=>{setSort1('Newest First')}} href="#">Newest First</a></li>
                                        <li><a class="dropdown-item" onClick={()=>{setSort1('Oldest First')}} href="#">Oldest First</a></li>
                                        <li><a class="dropdown-item" onClick={()=>{setSort1('Most reported first')}} href="#">Most Reported First</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className='col-auto'>
                                <div class="dropdown">
                                    <button class="btn  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        {Sort2}
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a class="dropdown-item" onClick={()=>{setSort2('Posts and comments')}} href="#">Posts And Comments</a></li>
                                        <li><a class="dropdown-item" onClick={()=>{setSort2('Posts')}} href="#">Posts</a></li>
                                        <li><a class="dropdown-item" onClick={()=>{setSort2('Comments')}} href="#">Comments</a></li>
                                        <li><a class="dropdown-item" onClick={()=>{setSort2('Live Chat Messages')}} href="#">Live Chat Messages</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={`row justify-content ${classes.ActionBar}`}>
                            <div className={`col-auto ${classes.ActionBarDrpdwn}`}>
                                <div class="btn-group">
                                    <button type="button" class="btn"><input type='checkbox'></input></button>
                                    <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">Spam Filtered</a></li>
                                        <li><a class="dropdown-item" href="#">Has Reports</a></li>
                                        <li><a class="dropdown-item" href="#">Self Reports</a></li>
                                        <li><a class="dropdown-item" href="#">Posts With Flair</a></li>
                                        <li><a class="dropdown-item" href="#">Posts</a></li>
                                        <li><a class="dropdown-item" href="#">Comments</a></li>
                                        <li><a class="dropdown-item" href="#">Chat Posts</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {Listing(value)}
                        
                    </div>
                </div>
                <div className='col-3 '>

                </div>
            </div>
            </div>
    )
}