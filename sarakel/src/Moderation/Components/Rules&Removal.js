import React, { } from 'react';
import '../../bootstrap.min.css'
import classes from '../Moderation.module.css'
import mock from '../../mock.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

export default function RulesAndRemoval(){
    const [button, setButton] = React.useState('Add rule')
    const [value, setValue] = React.useState(0)
    const [toggle, setToggle] = React.useState(false)
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
                    <button className={actArray[0]} onClick={()=>{setButton('Add rule'); setValue(0)}}><span>Rules</span></button>
                </div>
                <div className={`col-auto ${classes.QueueButtonDiv}`}>
                    <button className={actArray[1]} onClick={()=>{setButton('Add removal reason'); setValue(1)}}><span>Removal Reasons</span></button>
                </div>
            </div>
            <div className='row  justify-content-end'>
                <div className='col-auto'>
                    <button type="button" class={`btn rounded-5 btn-primary`}><span className={`${classes.SchedualeButton}`}>{button}</span></button>
                </div>
            </div>
            <div className={`row justify-content-center`}>
                <div className={`col-11 ms-2 justify-content-center  mt-3 border rounded ${classes.ScheduledListDiv}`}>
                    <span className={`justify-content-center align-items-center ${classes.ScheduledList}`}>No Rules in r/AnaWMaroAreBesties</span>
                </div>
            </div>
        </div>
    )
}