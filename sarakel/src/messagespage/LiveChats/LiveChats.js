
import React, { useState, useEffect } from 'react';
import './LiveChats.css'
import NewChat from './newchat.png';
import Filter from './filter.png';
// import SocketService from './SocketService/SocketService.js';
// import io from "socket.io-client"
import BackButton from './BackButton.jpeg';
import Welcome from './welcome.png'
import { useAuth } from '../../HomePage/Components/AuthContext';

function LiveChats() {
  const { token } = useAuth();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);
  const handleApply = () => {
    // Do something with the selected checkboxes
    console.log('Checkbox 1:', checkbox1);
    console.log('Checkbox 2:', checkbox2);
    console.log('Checkbox 3:', checkbox3);
    // Close the pop-up window
    setShowPopup(false);
  };
  const [isVisible, setIsVisible] = useState(true);
  const [isHomewindowVisible, setIsHomewindowVisible] = useState(false);
  const [isChatwindowVisible, setIsChatwindowVisible] = useState(false);
  const [isThreadswindowVisible, setIsThreadswindowVisible] = useState(false);
  const [isDiscoverChannelswindowVisible, setIsDiscoverChannelswindowVisible] = useState(false);
  const [ismainsideswindowVisible, setIsmainsidewindowVisible] = useState(true);

  const [toggle, setToggle] = useState(1);
  const [toggle2, setToggle2] = useState(1);
  const toggleTab = (index) => {
    setToggle(index);
   }
  
   const toggleTab2 = (index2) => {
    setToggle2(index2);
   }
  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };

  // const socket = io.connect("http://localhost:3000")

  return (

        <div className="App">
          {/* {console.log(token)} */}
          <div className="sidebar">
            <div className="sidebar-header">
            <h3 className='sidebar-header-txt'>Chats</h3>
            <button className='sidebar-header-button active' onClick={() =>{setIsThreadswindowVisible(false);setIsHomewindowVisible(true);setIsChatwindowVisible(false);setIsDiscoverChannelswindowVisible(false);setIsDiscoverChannelswindowVisible(false);setIsVisible(false)}}>
            <img src={NewChat} alt="Settings" />
            </button>
            <button className="sidebar-header-button">
            <img src={Filter} alt="Add"onClick={() => setShowPopup(!showPopup)} className="chatbox"  />
            </button>
            {showPopup && (
            <div className="popup">
              
              <label>
                {/* Checkbox 1 */}
                <input
                  type="checkbox"
                  checked={checkbox1}
                  onChange={() => setCheckbox1(!checkbox1)}
                />
                Chat channels
              </label>
              <label>
                {/* Checkbox 2 */}
                <input
                  type="checkbox"
                  checked={checkbox2}
                  onChange={() => setCheckbox2(!checkbox2)}
                />
                Group chats
              </label>
              <label>
                {/* Checkbox 3 */}
                <input
                  type="checkbox"
                  checked={checkbox3}
                  onChange={() => setCheckbox3(!checkbox3)}
                />
                Direct chats
              </label>
              <button className='Applybutton' onClick={handleApply}>Apply</button>
            </div>
          )}
            </div>
            <div className="sidebar-main">
            {ismainsideswindowVisible && (
            <div className="sidebar-main1">
            <button className='sidebar-button' onClick={() =>{setIsThreadswindowVisible(true);setIsHomewindowVisible(false);setIsChatwindowVisible(false);setIsVisible(false)}}>Threads</button>
            <button className='sidebar-button' onClick={() =>{setIsThreadswindowVisible(false);setIsHomewindowVisible(false);setIsChatwindowVisible(false);setIsVisible(false);setIsmainsidewindowVisible(false);setIsDiscoverChannelswindowVisible(true)}}>Discover Channels</button>
            </div>
            )}
            {isDiscoverChannelswindowVisible && (
            <div className='sidebar2'>
              <div className='buttton'>
              <img src={BackButton} className='backbutton-image'onClick={() =>{setIsThreadswindowVisible(false);setIsHomewindowVisible(false);setIsChatwindowVisible(false);setIsDiscoverChannelswindowVisible(false);setIsDiscoverChannelswindowVisible(false);setIsmainsidewindowVisible(true);setIsVisible(true)}}/>
            <button className='backbuttonn' onClick={() =>{setIsThreadswindowVisible(false);setIsHomewindowVisible(false);setIsChatwindowVisible(false);setIsDiscoverChannelswindowVisible(false);setIsDiscoverChannelswindowVisible(false);setIsmainsidewindowVisible(true);setIsVisible(true)}}>
            Discover
            </button>
            </div>
            <div className="sidebar-main2">
            <button className='sidebar-button2' onClick={() =>{setIsThreadswindowVisible(true);setIsHomewindowVisible(false);setIsChatwindowVisible(false);setIsVisible(false)}}>General r/Open AI</button>
            </div>
            </div>

            )}
            </div>

          </div>
          {isVisible && (
          <div className='main-window'>
            <img className='welcome'src={Welcome}></img>
          <h4>Welcome to chat!</h4>
          <p>Start a direct or group chat with other Sarakel users.</p>
        <button className='startchatbutton' onClick={() => {
          setIsVisible(false);
          setIsHomewindowVisible(true)
        }}>
          Start a new Chat
        </button>
      </div>
             )}         

      {isHomewindowVisible && (
          <div className='Homewindow'>
            
          <div className="usernamesearch-main-window-header">
             <h4 className='NewChatstxt'>New Chat</h4>
             </div>
             <div className='homewindow-main'>
             <div className='usernamesearch'>
              <input className="username-input" 
              // value={username}
               placeholder="Type username...">
              
              </input>
             </div>
             </div>
             <div className='mainwindowfooter'>
             <button className='cancelButton'onClick={() =>{setIsThreadswindowVisible(false);setIsHomewindowVisible(false);setIsChatwindowVisible(false);setIsVisible(true)}}>
              Cancel
             </button>
             <button className='mainwindowfooterButton' onClick={() =>{setIsThreadswindowVisible(false);setIsHomewindowVisible(false); setIsChatwindowVisible(true)}}>
              Start
             </button>
             
             </div>
            </div>
                  )}
                  {isChatwindowVisible && (
            <div className='windowno1'>
             <div className="main-window-header">
             <h4>New Chat</h4>
             </div>
             <div className="main-window-main">
             <div className='MainWindowLiveChats'>
             {/* <SocketService url="your_socket_server_url" user="current_user_id" /> */}
             <div className="chat-container">
             {messages.map((message, index) => (
             <div className="message" key={index}>
             {message}
             </div>
             ))}
             </div>            
             <input
               className="message-input"
               value={newMessage}
               onChange={handleNewMessageChange}
               placeholder="Type your message..."
              />
              <button className="send-button" onClick={handleSendMessage}>Send</button>
              
      
             </div>

            </div>
          </div>
          )}
          {isThreadswindowVisible && (
           <div className='windowno2'>
            <div className='windowno2header'>
             <h4 className='Threadstxt'>Threads</h4>
            </div>
            <div className='windowno2main'>             
             <h1>You don't have any threads yet</h1>
             <p>When you do, they'll show up here.</p>
             <button className='go-to-msg-button'onClick={() =>{setIsThreadswindowVisible(false);setIsHomewindowVisible(false);setIsChatwindowVisible(false);setIsVisible(true)}}>Go to Messages</button>
           </div>
           </div>
          )}
          {/* {isDiscoverChannelswindowVisible &&(
           <div className='windowno3'>
            <div className='windowno3header'>
             <h4>Threads</h4>
            </div>
            <div className='windowno3main'>             
             <h1>You don't have any threads yet</h1>
             <p>When you do, they'll show up here.</p>
             <button className='go-to-msg-button'onClick={() =>{setIsThreadswindowVisible(false);setIsHomewindowVisible(false);setIsChatwindowVisible(false);setIsVisible(true)}}>Go to Messages</button>
           </div>
           </div>
          )} */}
           </div>



    

    
  );
}


export default LiveChats;
