import React, { useState, useEffect } from 'react';
import './chats.css'; // Import your CSS file for styling
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import logo_2d from './logo_2d.png'
// import comboBoxIcon from './comboBoxIcon.svg'; // Import the icon for the button

import ReCAPTCHA from 'react-google-recaptcha';


import axios from 'axios';

function Chats() {
    const onChange = (value) => {
        console.log("Captcha value:", value);
    }
    const [toggle, setToggle] = useState(1);
    const [toggle2, setToggle2] = useState(1);
    const toggleTab = (index) => {
      setToggle(index);
     }
    
     const toggleTab2 = (index2) => {
      setToggle2(index2);
     }

     const [username, setUsername] = useState('');
     const [subject, setSubject] = useState('');
     const [message, setMessage] = useState('');
     const [sentMessages, setSentMessages] = useState([]);
     const [unreadMessages, setUnreadMessages] = useState([]);

     useEffect(() => {
       if (toggle === 3) {
         getSentMessages()
           .then(messages => setSentMessages(messages))
           .catch(error => console.error(error));
       }
     }, [toggle]);

     const YourComponent = () => {
     
    
      useEffect(() => {
        getUnreadMessages('yourUsername'); // replace 'yourUsername' with actual username
      }, []);
    }
     async function getUnreadMessages(username) {
      try {
        const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhZmV6IiwiaWF0IjoxNzEzMTI5Mjg0fQ.v3Q_7WegCC-UB8UGTlE1Lq3vLnuKm66oA7TsC-Yc0Ss';
        const response = await fetch(`http://localhost:5000/message/get_unread_messages`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({ username }),
        });
    
        const data = await response.json();
    
        if (data.success) {
          this.setState({ unreadMessages: data.message });        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Failed to retrieve unread messages:', error);
      }
    }
    

async function sendMessage() {
  const recipient = document.getElementById('tobox').value;
  const title = document.getElementById('subbox').value;
  const content = document.getElementById('msgboxx').value;

  const messageData = {
    recipient,
    title,
    content
  };
  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhZmV6IiwiaWF0IjoxNzEzMTI5Mjg0fQ.v3Q_7WegCC-UB8UGTlE1Lq3vLnuKm66oA7TsC-Yc0Ss';
  const response = await fetch('http://localhost:5000/message/compose', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(messageData)
  });

  const responseData = await response.json();

  const expectedResponse = {"message": "Message sent successfully."};

  if (JSON.stringify(responseData) === JSON.stringify(expectedResponse)) {
    alert('Message sent successfully.');
  } else {
    alert('Failed to send message: ' + responseData.error);
  }
}

async function deleteMessage(userID, messageId) {
  try {
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhZmV6IiwiaWF0IjoxNzEzMTI5Mjg0fQ.v3Q_7WegCC-UB8UGTlE1Lq3vLnuKm66oA7TsC-Yc0Ss';
    const response = await fetch(`http://localhost:5000/message/del_msg`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ userID, messageId }),
    });

    const data = await response.json();

    if (data.success) {
      alert(data.message);
      removeDeletedMessageFromUI(messageId);
        } else {
      alert(data.error);
    }
  } catch (error) {
    console.error('Failed to delete message:', error);
  }
}

function removeDeletedMessageFromUI(messageId) {
  const messageElement = document.getElementById(messageId);
  if (messageElement) {
    messageElement.remove();
  } else {
    console.error(`Message element with ID ${messageId} not found in the UI.`);
  }
}

async function getSentMessages() {
  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhZmV6IiwiaWF0IjoxNzEzMTI5Mjg0fQ.v3Q_7WegCC-UB8UGTlE1Lq3vLnuKm66oA7TsC-Yc0Ss';
  const response = await fetch('http://localhost:5000/message/sent', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });

  const responseData = await response.json();

  if (response.ok) {
    return responseData;
  } else {
    throw new Error(responseData.error || 'Failed to get sent messages');
  }
}

async function getInboxMessages(username) {
  try {
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhZmV6IiwiaWF0IjoxNzEzMTI5Mjg0fQ.v3Q_7WegCC-UB8UGTlE1Lq3vLnuKm66oA7TsC-Yc0Ss';
    const response = await fetch('http://localhost:5000/message/inbox', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ username }),
    });

    const data = await response.json();

    if (data.success) {
      displayInboxMessages(data.messages);
    } else {
      console.error(data.error);
    }
  } catch (error) {
    console.error('Failed to retrieve inbox messages:', error);
  }
}
function displayInboxMessages(messages) {
  const inboxContainer = document.getElementById('inbox-container');
  inboxContainer.innerHTML = ''; // Clear previous content

  messages.forEach(message => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message.text;
    inboxContainer.appendChild(messageElement);
  });
}

return (
  <div className="app-container">
    <div className='TopBar'>
      <button className={toggle === 1 ? "menu-button active" : "menu-button" } onClick={() => toggleTab(1)}>Send A Private Message</button>
      <button className={toggle === 2 ? "menu-button active" : "menu-button" } onClick={() => toggleTab(2)}>Inbox</button>
      <button className={toggle === 3 ? "menu-button active" : "menu-button" } onClick={() => toggleTab(3)}>Sent</button>
    </div>
    <div className='MainWindow'>
      <div className={toggle === 1 ? "MainWindow1 active-content" : "MainWindow1"}>
        <div className='towindow'>
          <p className='titlebox'>Send A Private Message</p>
          <div className='firsttxt'>
            <p className='titlebox'>to </p><p className='greytxt'>  (username, or /r/name for that subreddit's moderators)</p>
          </div>
          <input id='tobox' className='tobox'  type="text"/>
        </div>
        <div className='subwindow'> 
          <p className='titlebox'>subject</p>
          <input id='subbox' className='subbox'  type="text"/>
        </div>
        <div className='Msgbox'>
          <p className='titlebox'>message</p>
          <input id='msgboxx' className='msgboxx'rows="1" cols="1" type="text" />
        </div>
        <div className='robotchk'>
          <ReCAPTCHA sitekey="YOUR_SITE_KEY" onChange={onChange}/>            
          <button id='sendbtn' className='Sendbutton' onClick={sendMessage}>SEND</button>
        </div>
      </div>

      <div className={toggle === 2 ? "MainWindow2 active-content" : "MainWindow2"}>
        <div className='TopBar2'>
          <button className={toggle2 === 1 ? "menu-button2 active" : "menu-button2" } onClick={() => toggleTab2(1)}>All</button>
          <button className={toggle2 === 2 ? "menu-button2 active" : "menu-button2" } onClick={() => toggleTab2(2)}>Unread</button>
          <button className={toggle2 === 3 ? "menu-button2 active" : "menu-button2" } onClick={() => toggleTab2(3)}>Messages</button>
          <button className={toggle2 === 4 ? "menu-button2 active" : "menu-button2" } onClick={() => toggleTab2(4)}>Comment Replies</button>
          <button className={toggle2 === 5 ? "menu-button2 active" : "menu-button2" } onClick={() => toggleTab2(5)}>Post Replies</button>
          <button className={toggle2 === 6 ? "menu-button2 active" : "menu-button2" } onClick={() => toggleTab2(6)}>Username Mentions</button>
        </div>
        <div className='tab2window'>
          <div className={toggle2 === 1 ? "tab2-1 active-content2" : "tab2-1"}>
            <div><p className='errmsg'>there doesn't seem to be anything here1</p></div>
          </div>
          <div className={toggle2 === 2 ? "tab2-1 active-content2" : "tab2-2"}>
  <div>
    {unreadMessages.length > 0 ? (
      unreadMessages.map((message) => (
        <p key={message.id}>{message.content}</p>
      ))
    ) : (
      <p className='errmsg'>there doesn't seem to be anything here2</p>
    )}
  </div>
</div>

          <div className={toggle2 === 3 ? "tab2-1 active-content2" : "tab2-3"}>
            <div><p className='errmsg'>there doesn't seem to be anything here3</p></div>
          </div>
          <div className={toggle2 === 4 ? "tab2-1 active-content2" : "tab2-4"}>
            <div><p className='errmsg'>there doesn't seem to be anything here4</p></div>
          </div>
          <div className={toggle2 === 5 ? "tab2-1 active-content2" : "tab2-5"}>
            <div><p className='errmsg'>there doesn't seem to be anything here5</p></div>
          </div>
          <div className={toggle2 === 6 ? "tab2-1 active-content2" : "tab2-6"}>
            <div><p className='errmsg'>there doesn't seem to be anything here6</p></div>
          </div>
        </div>
      </div> 

      <div className={toggle === 3 ? "MainWindow3 active-content" : "MainWindow3"}>
  <div className='themessage'>
    {sentMessages.length > 0 ? (
      sentMessages.map(message => (
        <div key={message._id} className='message-container'>
          <div className='topmsg'>
            <h4 className='txttitle'>{message.title}</h4>
            <h4 className='txttitle'>:</h4>
          </div>
          <div className='belowtitle'>
          <div className='msgbody'>
            <p className='msgcontent'>to:</p>
            <p className='reciever'>{message.recipient}</p>
            <p className='msgcontent'>Sent: </p>
            <p>{message.dateTime}</p>
          </div>
          <div className='contmsg'>
          <p className='msgcontent'>{message.content}</p>
          </div>
          <button className='Permalink'>Permalink</button>
          </div>
        </div>
      ))
    ) : (
      <div className='nocontmsg'>
        <p className='errmsg'>There doesn't seem to be anything here</p>
      </div>
    )}
  </div>
</div>
    </div>
  </div>
)
    }
export default Chats;
