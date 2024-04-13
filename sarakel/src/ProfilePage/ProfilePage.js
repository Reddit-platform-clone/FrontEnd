import './bootstrap.min.css'
import React, { useState } from 'react';
import  './ProfilePage.css'
import logo from './logo512.png'
import jsonData from 'F:/Cairo university/CMPS203, Software Engineering/software-project/FrontEnd/sarakel/src/mock.json'
import { CgAddR } from "react-icons/cg";

function ProfilePage(){
    let userid;
    let username;
    let userimage;
    jsonData.users.map((user) => {
        if (user.LoggedIn !== 1) {
            userid = user.id;
           
            username = user.name;
            
            userimage = user.image;
            return;
        }
    });
    

    let x;
    let y;

    const GetLoggedIn = () => {
        jsonData.users.map((user) => {
            if (user.LoggedIn === 1) {
                x = user.id;
                y = user.name
                return JSON.stringify(user.id);
            }
        });
    };
    return(
        <>
        <div className='container1'>
            

            
                <div className='top-section'>
                        <img src={jsonData.users[0].image} alt='Logo' className='logo1' />
                        <div>
                            <h3 className='username2'>{jsonData.users[0].name}</h3>
                            <h6 className='sarakelid'>{jsonData.users[0].sarakelid}</h6>
                    
                        </div>
                </div>
                

                <div className='Contents1'>
                        <a className='nav-link' href='#'>
                            <span>Overview</span>
                        </a>
                        <a className='nav-link' href='#'>
                            <span>Posts</span>
                        </a>
                        <a className='nav-link' href='#'>
                            <span>Comments</span>
                        </a>
                        <a className='nav-link' href='#'>
                            <span>Saved</span>
                        </a>
                        <a className='nav-link' href='#'>
                            <span>Hidden</span>
                        </a>
                        <a className='nav-link' href='#'>
                            <span>Upvoted</span>
                        </a>
                        <a className='nav-link' href='#'>
                            <span>DownVoted</span>
                        </a>
                        <a className='nav-link' href='#'>
                            <span>Create Post</span>
                        </a>
                        <hr className="hr-solid1"></hr>
                </div>
                
            

                                <div className="right-side-container">
                                    {/* Other content */}
                                    <div className="right-side">
                                        {/* Content of right side */}
                                        <div className="flex items-center justify-between">
                                        <div className="background-image"></div>

                                            <a href="">
                                                <button className='add-banner-btn'>
                                                    <CgAddR/>
                                               </button>
                                            </a>
                                               
                                                <div className="username-container">
                                                    {/* Background image */}
                                                    
                                                    {/* Username */}
                                                    <h2 className="text-lg font-bold">{jsonData.users[0].name}</h2>
                                                </div>
                                            <button className='share'>Share</button>
                                        </div>
                                        <hr/>

                                        <div className="mt-6">
                                            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Settings</h3>
                                            <div className='Settings-buttons'>
                                            <div className='edit-profile'>
                                                    <img src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_2.png" alt="u/ahmet77mostafa avatar" width="24" height="24" loading="eager" />

                                                        <div className="profile-info">
                                                            <span className='bold-text'>Profile</span>
                                                            <span className='description11'>Customize your profile</span>
                                                        </div>
                                                        <button className='edit-profile-btn'>Edit Profile</button>
                                            </div>

                                                <div className='edit-avatar'>
                                                <img src="data:image/svg+xml,%3Csvg%20fill%3D%22currentColor%22%20height%3D%2220%22%20icon-name%3D%22avatar-style-outline%22%20viewBox%3D%220%200%2020%2020%22%20width%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22m19.683%205.252-3.87-3.92a1.128%201.128%200%200%200-.8-.332h-1.55a1.093%201.093%200%200%200-1.1.91%201.9%201.9%200%200%201-3.744%200A1.094%201.094%200%200%200%207.533%201h-1.55c-.3%200-.588.12-.8.332L1.317%205.253a1.1%201.1%200%200%200%20.014%201.557l1.87%201.829a1.121%201.121%200%200%200%201.48.076l.32-.24v1.936c.344-.31.786-.49%201.25-.511V5.977L3.993%207.668l-1.68-1.646L6.036%202.25H7.42a3.156%203.156%200%200%200%206.16%200h1.383l3.723%203.772-1.7%201.668-2.236-1.749v8.138c.501.337.927.774%201.25%201.284V8.509l.338.264a1.117%201.117%200%200%200%201.436-.109l1.894-1.853a1.101%201.101%200%200%200%20.015-1.559ZM13.691%2020H1.31A1.325%201.325%200%200%201%200%2018.663v-4.916a1.03%201.03%200%200%201%20.5-.884.988.988%200%200%201%20.98-.014%203%203%200%200%200%203.3-.266c.334-.342.649-.702.944-1.078a.624.624%200%200%201%20.775-.163l6.75%203.5A2.945%202.945%200%200%201%2015%2017.584v1.079A1.325%201.325%200%200%201%2013.691%2020Zm-12.44-5.873v4.536c0%20.054.033.087.058.087h12.382c.025%200%20.06-.033.06-.087v-1.079a1.72%201.72%200%200%200-1.035-1.609l-6.349-3.29a9.24%209.24%200%200%201-.76.831%204.235%204.235%200%200%201-4.357.611Zm4.022%204.042-.9-.862%203.138-3.3.9.862-3.138%203.3Zm3.04%200-.913-.857%202.09-2.219.91.857-2.088%202.219Z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E" alt="avatar" width="20" height="20"></img>
                                                    <div className='avatar-info'>
                                                        <span className='bold-text'>Avatar</span>
                                                        <span className='description11'>Customize and style</span>
                                                    </div>
                                                        <button className='edit-avatar-btn'>Avatar</button>

                                                </div>
                                                <div className='mod-settings'>
                                                <img src="data:image/svg+xml,%3Csvg%20fill%3D%22currentColor%22%20height%3D%2220%22%20icon-name%3D%22mod-outline%22%20viewBox%3D%220%200%2020%2020%22%20width%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M10%2020c-.101%200-.202-.014-.3-.04C8.249%2019.554%201%2017.277%201%2012V3.187A1.122%201.122%200%200%201%201.846%202.1L9.73.108c.177-.044.363-.044.54%200L18.154%202.1A1.122%201.122%200%200%201%2019%203.187V12c0%205.277-7.249%207.554-8.7%207.957A1.162%201.162%200%200%201%2010%2020ZM2.25%203.283V12c0%204.465%206.989%206.531%207.786%206.751.725-.22%207.714-2.286%207.714-6.751V3.283L10%201.33%202.25%203.283Z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E" alt="mod" width="20" height="20"></img>

                                                    <div className='mod-info'>
                                                        <span className='bold-text'>Moderation</span>
                                                        <span className='description11'>Moderation Tools</span>
                                                   </div>
                                                    <button className='mod-settings-btn'>Mod settings</button>

                                                </div>
                                                
                                            </div>
                                        </div>
                                        <hr/>

                                        <div className='Social-link'>
                                            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Links</h3>
                                            <button className='add-social-link' style={{ display: 'flex', alignItems: 'center' }}>
                                                <img src="data:image/svg+xml,%3Csvg%20fill='currentColor'%20height='12'%20icon-name='add-fill'%20viewBox='0%200%2020%2020'%20width='12'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20d='M19%209h-8V1H9v8H1v2h8v8h2v-8h8V9Z'%3E%3C/path%3E%3C/svg%3E" alt="Add Icon" width="12" height="12"></img>
                                                <span style={{ marginLeft: '4px' }}>Add Social Link</span>
                                            </button>
                                        </div>



                                    </div>
                                </div>


            
        </div>
  
        

                            
        </>
        
        
    );


}
export default ProfilePage