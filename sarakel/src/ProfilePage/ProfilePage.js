import './bootstrap.min.css'
import  './ProfilePage.css'
import logo from './logo512.png'
import React from 'react';

function ProfilePage(){
    return(
        <>
        <div className='container'>
            <div className='leftside'>
                <ul className='list-group'>
                    <li className='list-group-item'><a className='home' href='#'>Home</a></li>
                    <li className='list-group-item'><a className='popular' href='#'>Popular</a></li>
                    <li className='list-group-item'><a className='All' href='#'>All</a></li>
                </ul>
                <hr/>

                <div className="dropdown">
                    <span>Your Communities</span>
                    <div className="dropdown-content">
                        <a href="#">Option 1</a>
                        <a href="#">Option 2</a>
                        <a href="#">Option 3</a>
                    </div>
                </div>
                <hr/>

                <div className="dropdown">
                    <span>Resources</span>
                    <div className="dropdown-content">
                        <a href="#">About Sarakel</a>
                        <a href="#">Advertise</a>
                        <a href="#">Help</a>
                        <a href="#">Blog</a>
                        <a href="#">Careers</a>
                        <a href="#">Press</a><hr/>
                        <a href="#">Communities</a>
                        <a href="#">Best of Sarakel</a>
                        <a href="#">Topics</a><hr/>
                        <a href="#">Content Policy</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">User Agreement</a>
                    </div>
                </div>
            </div>

            <div className='middlepage'>
                <img src={logo} alt='Logo' className='logo' />
                <div>
                    <h3 className='username'>User1</h3>
                    <h6 className='sarakelid'>u/user1</h6>
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
                        <br/>
                    </div>
                    <div className='createpost'>
                        <a className="nav-link" href="#">+Create Post</a>
                    </div>
                    <hr/>
                </nav>
            </div>

                            <div className='rightside'>
                                                                    <div className="p-4">
                                                <div className="flex items-center justify-between">
                                                    <h2 className="text-lg font-bold">User1</h2>
                                                    <button className="button text-[#0079d3] button-ghost">Share</button>
                                                    <button className="button text-[#0079d3] button-ghost">Follow</button>
                                                </div>

                                                <div className="flex justify-between my-4">
                                                    <div>
                                                        <p className="text-sm text-gray-500">Post Karma</p>
                                                        <p className="text-lg font-bold">1</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Comment Karma</p>
                                                        <p className="text-lg font-bold">0</p>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between my-4">
                                                    <div>
                                                        <p className="text-sm text-gray-500">Cake day</p>
                                                        <p className="text-lg font-bold">Mar 1, 2024</p>
                                                    </div>
                                                    <div>
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