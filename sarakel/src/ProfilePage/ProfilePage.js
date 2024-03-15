import './bootstrap.min.css'
import  './ProfilePage.css'
import React, { } from 'react';
import logo from './logo512.png'

function ProfilePage(){
    return(
        <>
        <div className='leftside'>
            <ul className='list-group'>
                <a className='home' href='#'>
                    <li className='list-group-item'>Home</li>
                </a>
                <a className='popular' href='#'>
                    <li className='list-group-item'>Popular</li>
                </a>

                <a className='All' href='#'>
                    <li className='list-group-item'>All</li>
                </a>
                
            </ul>
            <hr/>
            
            <div class="dropdown">
                <span>Your Communitites</span>
                <div class="dropdown-content">
                    <a href="#">Option 1</a>
                    <a href="#">Option 2</a>
                    <a href="#">Option 3</a>
                </div>
            </div> <hr/>

            <div class="dropdown">
                    <span>Resources</span>
                    <div class="dropdown-content">
                            <a href="#">About Sarakel</a>
                            <a href="#">Advertise</a>
                            <a href="#">Help</a>
                            <a href="#">Blog</a>
                            <a href="#">Careers</a>
                            <a href="#">Press</a><hr/>
                            <a href="#">Communitites</a>
                            <a href="#">Best of Sarakel</a>
                            <a href="#">Topics</a><hr/>
                            <a href="#">Content Policy</a>
                            <a href="#">Privacy Policy</a>
                            <a href="#">User Agreement</a>

                        </div>
                    </div>

        </div> 


        <div className='middlepage'>
            <img src={logo} className='logo'></img>
            <div>
                <h3 className='username'>User1</h3>
                <h6 className='sarakelid'>u/user1</h6>

            </div>


            <nav className='profilecontents'>
                <div>
                    
                                    <a class="nav-link" href="#">Overview</a>
                                    <a class="nav-link" href="#">Posts</a>
                                    <a class="nav-link" href="#">Comments</a>
                                    <a class="nav-link" href="#">Saved</a>
                                    <a class="nav-link" href="#">Hidden</a>
                                    <a class="nav-link" href="#">Upvoted</a>
                                    <a class="nav-link" href="#">Downvoted</a>


                </div>
                <hr/>
            </nav>


                                    <div className='rightside'>
                                       <div className="flex flex-col">
                                        <span className="text-lg font-semibold">User1</span>
                                        </div> 
                                    </div>

            


                
           

        </div>
        

                            
        </>
        
        
    );


}
export default ProfilePage