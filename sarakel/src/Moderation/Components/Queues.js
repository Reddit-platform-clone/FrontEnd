import React, { } from 'react';
import '../../bootstrap.min.css'
import classes from '../Moderation.module.css'
import mock from '../../mock.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
export default function Queues(){

    let ModImg
    const [Sort1, setSort1] = React.useState("Newest first")
    const [Sort2, setSort2] = React.useState("Posts and comments")
    mock.users.map((user) => {
        if(user.LoggedIn === 1){
            ModImg = user.image
            return
        }
    }) 

    return(

            <div className='container-md '>
            <div className='row m-3  justify-content-center'>
                <div className='col-8  '>
                    <div className='container-md'>
                        <div className='row'>
                            <div className='col d-flex'>
                                <span className={`${classes.QueuesHeader}`}>Queues</span>
                            	<img src={ModImg} className={`${classes.ModImg}`}></img>
                            </div>
                        </div>
                        <div className='row mt-3 '>
                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                <button className={`${classes.QueueButtons}`}><span>Mod Queue</span></button>
                            </div>
                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                <button className={`${classes.QueueButtons}`}><span>Reported</span></button>
                            </div>
                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                <button className={`${classes.QueueButtons}`}><span>Removed</span></button>
                            </div>
                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                <button className={`${classes.QueueButtons}`}><span>Edited</span></button>
                            </div>
                            <div className={`col-auto ${classes.QueueButtonDiv}`}>
                                <button className={`${classes.QueueButtons}`}><span>Unmoderated</span></button>
                            </div>
                        </div>
                        <div className='row justify-content mt-5'>
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
                        <div className={`row justify-content-center align-items-center mt-1 ${classes.ModListBox}`}>
                            <h1 className='row justify-content-center'>Empty</h1>
                        </div>
                    </div>
                </div>
                <div className='col-3 bg-dark'>

                </div>
            </div>
            </div>
    )
}