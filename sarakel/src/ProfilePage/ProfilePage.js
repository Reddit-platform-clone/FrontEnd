import './bootstrap.min.css'
import  './ProfilePage.css'
import logo from './logo512.png'
import React from 'react';
import jsonData from '../mock.json'

function ProfilePage(){
    return(
        <>
        <div className='container'>
            

            
                <div className='top-section'>
                        <img src={logo} alt='Logo' className='logo1' />
                        <div>
                            <h3 className='username'>User1</h3>
                            <h6 className='sarakelid'>u/user1</h6>
                    
                        </div>
                </div>
                

                <nav className='profilecontents'>
                    <div>
                        <a className="nav-link" href="#">Overview</a>
                        <a className="nav-link" href="#">Posts</a>
                        <a className="nav-link" href="#">Comments</a>
                        <a className="nav-link" href="#">Saved</a>
                        <a className="nav-link" href="#">Hidden</a>
                        <a className="nav-link" href="#">Upvoted</a>
                        <a className="nav-link" href="#">Downvoted</a>
                        <br/><br/>
                        <a className="nav-link" href="#">+Create Post</a>
                        
                    </div>
                    
                    <hr/>
                </nav>
                <h3> No posts available</h3>
            

                            <div className='rightside'>
                                                        <div className="p-4">
                                                <div className="flex items-center justify-between">
                                                    <a href=''>
                                                        <button className="button text-[#0079d3] button-ghost">+</button>
                                                    </a>
                                                
                                                        
                                                    <h2 className="text-lg font-bold">User1</h2>
                                                    <button className="button text-[#0079d3] button-ghost">Share</button>
                                                    <button className="button text-[#0079d3] button-ghost">Follow</button>
                                                </div>

                                                <div className="flex justify-between my-4">
                                                    <div className='horizontalali'>
                                                        <p className="text-sm text-gray-500">Post Karma</p>
                                                        <p className="text-lg font-bold">1</p>
                                                    </div>
                                                    <div className='horizontalali'> 
                                                        <p className="text-sm text-gray-500">Comment Karma</p>
                                                        <p className="text-lg font-bold">0</p>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between my-4">
                                                    <div className='horizontalali'>
                                                        <p className="text-sm text-gray-500">Cake day</p>
                                                        <p className="text-lg font-bold">Mar 1, 2024</p>
                                                    </div>
                                                    <div className='horizontalali'>
                                                        <p className="text-sm text-gray-500">Gold Received</p>
                                                        <p className="text-lg font-bold">0</p>
                                                    </div>
                                                </div>

                                                <div className="mt-6">
                                                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Settings</h3>
                                                    <div className="mt-2">
                                                        <button className="button flex items-center justify-between w-full text-left py-2">
                                                            <div className="flex items-center">
                                                                <span className="text-yellow-500 mr-2">&#9881;</span>
                                                                Profile
                                                            </div>
                                                            <span className="font-medium text-[#0079d3]">Edit Profile</span>
                                                        </button>
                                                        <button className="button flex items-center justify-between w-full text-left py-2">
                                                            <div className="flex items-center">
                                                                <span className="text-yellow-500 mr-2">&#128101;</span>
                                                                Avatar
                                                            </div>
                                                            <span className="font-medium text-[#0079d3]">Style Avatar</span>
                                                        </button>
                                                        <button className="button flex items-center justify-between w-full text-left py-2">
                                                            <div className="flex items-center">
                                                                <span className="text-yellow-500 mr-2">&#10004;</span>
                                                                Moderation
                                                            </div>
                                                            <span className="font-medium text-[#0079d3]">Mod Settings</span>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="mt-6">
                                                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Links</h3>
                                                    <button className="button flex items-center justify-between w-full text-left py-2 mt-2">
                                                        <span className="text-[#0079d3] mr-2">&#10133;</span>
                                                        Add Social Link
                                                    </button>
                                                </div>
                                            </div>

                            </div>

            
        </div>
  
        

                            
        </>
        
        
    );


}
export default ProfilePage