import '../../bootstrap.min.css'
import classes from '../Moderation.module.css'
import mock from '../../mock.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import React, { useState, useEffect } from 'react';

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
  
    
    
    

    useEffect(() => {
      const fetchData = () => {
        setTimeout(() => {
          setPosts(mock.communities[0]);
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
            {posts.Banned.length === 0 ? (
              <p>No posts to display.</p>
            ) : (
              posts.Rules.map((item, index) => (
                !hiddenPosts[item.id] ? (
                    
                  <div className={`row align- mt-1 ${classes.ModListBox}`}>
                        <div className='col-auto'>
                            <span>{index + 1}</span>
                        </div>
                        <div className='col  bg-info'>
                            <span className='align-items-center'>{item}</span>
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
                {posts.RemovalReasons.length === 0 ? (
                  <p>No posts to display.</p>
                ) : (
                  posts.RemovalReasons.map((item,index) => (
                    !hiddenPosts[item.id] ? (
                        <div className={`row align- mt-1 ${classes.ModListBox}`}>
                        <div className='col-auto'>
                            <span>{index + 1}</span>
                        </div>
                        <div className='col  bg-info'>
                            <span className='align-items-center'>{item}</span>
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

export default function RulesAndRemoval(){
    const [NewRule, setNewRule] = React.useState('')
    const [NewReason, setNewReason] = React.useState('')
    const [toggle, setToggle1] = React.useState(false)
    const [button, setButton] = React.useState('Add rule')
    const [value, setValue] = React.useState(0)

    const ChangeNewRule = event =>{
        if(button === 'Add rule'){
        setNewRule(event.target.value)
        return
        }else if(button === 'Add removal reason'){
        setNewReason(event.target.value)
        return
        }
    }


    function sendNewRule(){
         if(button === 'Add rule'){
            if(NewRule === ''){ alert('Enter A rule')
            }else{
                mock.communities[0].Rules.push(NewRule)}
        }
        if(button === 'Add removal reason'){
           if(NewReason === ''){
            alert('Enter A reason')
           }else{
            mock.communities[0].RemovalReasons.push(NewReason)
           }
           
        }
    }


    const actArray = []
    for(let i=0;i<2;i++){
        if(i === value){
            actArray.push(`${classes.actMenu} ${classes.QueueButtons}`)
        }else{
            actArray.push(`${classes.QueueButtons}`)
        }
    }
    return(
        <div className='container-fluid'>
            <div className='row'>
                <span className={`${classes.UserManagementHeader}`}>Rules and Removal Reasons</span>
            </div>
            
            <div className='row mt-3 '>
                <div className={`col-auto ${classes.QueueButtonDiv}`}>
                    <button className={actArray[0]} onClick={()=>{setButton('Add rule'); setValue(0)}} ><span>Rules</span></button>
                </div>
                
                <div className={`col-auto ${classes.QueueButtonDiv}`}>
                    <button className={actArray[1]} onClick={()=>{setButton('Add removal reason'); setValue(1)}}><span>Removal Reasons</span></button>
                </div>
            </div>
            <div className='row  justify-content-end'>
                <div className='col-auto'>
                    <button type="button" onClick={()=>{setToggle1(!toggle); sendNewRule()}}  class={`btn rounded-5 btn-primary`} Toggle state><span className={`${classes.SchedualeButton}`}>{button}</span></button>
                </div>
                {toggle &&(<div className='row justify-content-end'>
                        <div className='row mt-2 justify-content-end'>
                            <input type="text" placeholder='' onChange={ChangeNewRule} className='col-6'></input>
                        </div>
                </div>)}
            </div>
            <div className={`row justify-content-center`}>
               {Listing(value)}
            </div>
        </div>
    )
}