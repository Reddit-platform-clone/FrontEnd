import React from 'react';
import NavBar from '../HomePage/Components/NavBar/NavBar';
import ReactDOM from 'react-dom/client';
import mock from '../mock.json';
import './Notifications.css'

function Notify(){
  return(
    <div>
        
      <ul>
        {mock.notify.map((list, index) => (

          <li className='notif' key={index}>

            <img className='notifimage' src={list.image} alt={`Image ${index}`} />              
            <span className='sender'>{list.sender}</span>
            <span className='reciever'>{list.reciever}</span>

          </li>
          
        ))}
      </ul>
    </div>
  )
}

//<img src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png" alt="avatar for notification" class="max-w-full"></img>

export default function Notifications()
{

 return  (


<div >
<NavBar></NavBar>
 <button className='notifications' onClick={() => ReactDOM.createRoot(document.getElementById("pop-page")).render(<Notify/>)}>  Notifications</button>
            <div id="pop-page"></div>

            </div>
 )


}