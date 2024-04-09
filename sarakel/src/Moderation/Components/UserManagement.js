import React, { } from 'react';
import '../../bootstrap.min.css'
import classes from '../Moderation.module.css'
import mock from '../../mock.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

export default function UserManagement(){
    const [button, setButton] = React.useState('Ban User')
    const [value, setValue] = React.useState(0)
    const [toggle, setToggle] = React.useState(false)
    const actArray = []
    const buttArray = []
    for(let i=0;i<4;i++){
        if(i === value){
            actArray.push(`${classes.actMenu} ${classes.QueueButtons}`)
        }else{
            actArray.push(`${classes.QueueButtons}`)
        }
    }
    return(
        <div className='container-fluid'>
            <div className='row'>
                <span className={`${classes.UserManagementHeader}`}>User Management</span>
            </div>
            <div className='row mt-3 '>
                <div className={`col-auto ${classes.QueueButtonDiv}`}>
                    <button className={actArray[0]} onClick={()=>{setButton('Ban User'); setValue(0); setToggle(false)}}><span>Banned</span></button>
                </div>
                <div className={`col-auto ${classes.QueueButtonDiv}`}>
                    <button className={actArray[1]} onClick={()=>{setButton('Mute User'); setValue(1); setToggle(false)}}><span>Muted</span></button>
                </div>
                <div className={`col-auto ${classes.QueueButtonDiv}`}>
                    <button className={actArray[2]} onClick={()=>{setButton('Approve User'); setValue(2); setToggle(false)}}><span>Approved</span></button>
                </div>
                <div className={`col-auto ${classes.QueueButtonDiv} `} onClick={()=>{setButton('Invite user as mod'); setValue(3);setToggle(!toggle)}} Toggle state>
                    <button className={actArray[3]}><span>Moderators</span></button>
                </div>
            </div>
            <div className='row  justify-content-end'>
                {toggle &&(<div className='col-auto d-flex'>
                    <div className='col-auto'>
                    <button type="button" class={`btn rounded-5 btn-light`}><span className={`${classes.SchedualeButton}`}>reorder</span></button>
                </div>
                <div className='col-auto'>
                    <button type="button" class={`btn rounded-5 btn-light`}><span className={`${classes.SchedualeButton}`}>Leave as mod</span></button>
                </div>
                </div>)}
                <div className='col-auto'>
                    <button type="button" class={`btn rounded-5 btn-primary`}><span className={`${classes.SchedualeButton}`}>{button}</span></button>
                </div>
            </div>
            <div className={`row justify-content-center`}>
                <div className={`col-11 ms-2 justify-content-center  mt-3 border rounded ${classes.ScheduledListDiv}`}>
                    <span className={`justify-content-center align-items-center ${classes.ScheduledList}`}>No Banned users in r/AnaWMaroAreBesties</span>
                </div>
            </div>
        </div>

    )
}