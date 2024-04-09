import React, { } from 'react';
import '../../bootstrap.min.css'
import classes from '../Moderation.module.css'
import mock from '../../mock.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

export default function ScheduledPosts(){
    return(
        <div className='container-fluid sticky-top'>
            <div className='row d-flex justify-content-end'>
                <div className='col-auto'>
                    <button type="button" class={`btn rounded-5 btn-primary`}><span className={`${classes.SchedualeButton}`}>Schedule Post</span></button>
                </div>
            </div>
            <div className='row mt-4'>
                <span className={`${classes.ScheduledHeader}`}>Scheduled posts</span>
            </div>
            <div className={`row `}>
                <div className={`col-9 ms-2 justify-content-center  mt-3 border rounded ${classes.ScheduledListDiv}`}>
                    <span className={`justify-content-center align-items-center ${classes.ScheduledList}`}>No scheduled posts in r/AnaWMaroAreBesties</span>
                </div>
            </div>
        </div>
    )
}