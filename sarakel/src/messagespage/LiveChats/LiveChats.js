
import React, { useState, useEffect } from 'react';
import './LiveChats.css'
import NewChat from './newchat.png';
import Filter from './filter.png';
import io from "socket.io-client"
import BackButton from './BackButton.jpeg';
import Welcome from './welcome.png'
import { useAuth } from '../../HomePage/Components/AuthContext';
import SocketService from './SocketComponent.js'
import axios from 'axios';
import '../../HomePage/Components/LogIn/LogIn.js'
function LiveChats() {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);
  const [socket, setSocket] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [conversationId, setConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(false);
  // const [selectedUser, setSelectedUser] = useState('');
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
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [messageMap, setMessageMap] = useState({});
  useEffect(() => {
    // Connect to the WebSocket server
    const newSocket = io('http://57.151.116.81:5000');

    newSocket.on('connect', () => {

      console.log('WebSocket connected');
      setSocket(newSocket);});

    newSocket.on('disconnect', () => {
      console.log('WebSocket disconnected');
      setSocket(null);});

    newSocket.on('error', (error) => {
      console.error('WebSocket error:', error);    });

    return () => {
      // Clean up WebSocket connection on component unmount
      if (socket) {
        socket.disconnect();
      }};}, []);

  // useEffect(() => {
  //   const loadConversation = async () => {
  //     try {
  //       // Retrieve token and username from localStorage
  //       const emailOrUsername = document.getElementById("username").value;
  //       if (!token ) {
  //         console.error('Token or username not found in localStorage');
  //         return;}

  //       const config = {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json'}};

  //       const response = await axios.get('http://57.151.116.81:5000/api/message/getconversations', config);
  //       const previousChats = response.data; // Assuming response.data is an array of chat messages
  //       console.log(previousChats)
  //       setMessages(previousChats);
  //       console.log('Fetched previous chats:', previousChats);
  //     } catch (error) {
  //       console.error('Error fetching previous chats:', error);}};

  //   if (isChatwindowVisible) {
  //     loadConversation(); // Call loadConversation when chat window is visible
  //   }}, [isChatwindowVisible]);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);};

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]);
      setNewMessage('');}};
      useEffect(() => {
        const fetchConversations = async () => {
          try {
            const config = {
              headers: {
                Authorization: `Bearer ${token}`
              }
            };
    
            const response = await axios.get(
              'http://57.151.116.81:5000/api/message/getconverstaions',
              config
            );
    
            // Assuming response.data contains the conversations array
            setConversations(response.data);
            console.log('hya de',setConversations);
          } catch (error) {
            console.error('Error fetching conversations:', error);
            // Handle error
          }
        };
    
        fetchConversations();
      }, [token]);
    
      
  
      const fetchMessagesForConversation = async (conversationId) => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          };
      
          // Send POST request with conversationId in the request body
          const response = await axios.post(
            'http://57.151.116.81:5000/api/message/read_message',
            { conversationId },
            config
          );
          const { messages } = response.data;
          setSelectedMessages(messages);
          console.log('ooooooooooooooooooooooooooooooo', response.data);
          // Handle the received messages (set state, etc.)
        } catch (error) {
          console.error('Error fetching messages for conversation:', error);
          // Handle error
        }
      };
      

  return (

        <div className="App">
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
             <input
            className="username-input"
            placeholder="Type username..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
             </div>
             </div>
             <div className='mainwindowfooter'>
             <button
          className="cancelButton"
          onClick={() => {
            // Handle cancel action
          }}
        >
          Cancel
        </button>
        <button
          className="mainwindowfooterButton"
          // onClick={handleStartChat} 
          onClick={() =>{setIsHomewindowVisible(false);setIsChatwindowVisible(true);}}
        >
          Start
        </button>
             </div>
            </div>
                  )}
                  {isChatwindowVisible && (
                   <div className='windowno1'>
{isChatwindowVisible && (
  <div className='windowno1'>
    <ul>
      {conversations.map((conversation, index) => (
        <li key={index}>
          <strong>Conversation ID:</strong> {conversation._id}<br />
          <strong>Users:</strong> {conversation.users.join(', ')}<br />
          <strong>Message IDs:</strong> {conversation.messagesId.join(', ')}<br />
          <button onClick={() => fetchMessagesForConversation(conversation._id)}>
            Load Messages
          </button>
        </li>
      ))}
    </ul>
    {/* Display selected messages */}
    <div>
      <h2>Selected Messages</h2>
      <ul>
        {selectedMessages.map((message, index) => (
          <li key={index}>
            {message.text} {/* Assuming 'text' is the message content */}
          </li>
        ))}
      </ul>
    </div>
  </div>
)}



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
           </div>    
  );
}


export default LiveChats;
