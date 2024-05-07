import React, { useState, useEffect } from 'react';
import './chats.css'; // Import your CSS file for styling
import { useAuth } from '../../HomePage/Components/AuthContext.js';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

function Chats() {
    const { token, user } = useAuth()
    const onChange = (value) => {
        console.log("Captcha value:", value);}
    const [toggle, setToggle] = useState(1);
    const [toggle2, setToggle2] = useState(1);
    const toggleTab = (index) => {
      setToggle(index);}
    const toggleTab2 = (index2) => {
      setToggle2(index2);}

     const [username, setUsername] = useState(null);
     const [message, setMessage] = useState('');
     const [sentMessages, setSentMessages] = useState([]);
     const [unreadMessages, setUnreadMessages] = useState([]);
     const [inboxMessages, setInboxMessages] = useState([]);
     const [combinedMessages, setCombinedMessages] = useState([]);
     const [mentions, setMentions] = useState([]);
     const [postReplies, setPostReplies] = useState([]);
     const [messageStatus, setMessageStatus] = useState([]);
     const [selectedReportReason, setSelectedReportReason] = useState('');
     const [reportModalOpen, setReportModalOpen] = useState(false);

     const handleOpenReportModal = () => {
      setReportModalOpen(true); };
  
    const handleCloseReportModal = () => {
      setReportModalOpen(false);};
  
    const handleSubmitReport = async () => {
      if (!selectedReportReason) {
        alert('Please select a reason for the report.');
        return;}
  
      const messageId = ''; // Set the message ID here
      const reportDetails = selectedReportReason;
  
      try {
        await handleReportMessage(messageId, reportDetails);
        alert('Message reported successfully.');
        handleCloseReportModal();
      } catch (error) {
        console.error('Failed to report message:', error.message);
        alert('Failed to report message.');} };

     const toggleReportModal = () => {
      setReportModalOpen(!reportModalOpen); };
    
     useEffect(() => {
      async function fetchPostReplies() {
        try {
          const response = await axios.post('http://localhost:5000/api/get_post_replies');
          const { data } = response;
          if (data && Array.isArray(data.message)) {
            setPostReplies(data.message); // Update component state with retrieved post replies
          } else {
            console.error('Invalid response format for post replies:', data);
          }
        } catch (error) {
          console.error('Failed to fetch post replies:', error.message);}}
  
      fetchPostReplies();
    }, []);
         
     useEffect(() => {
      fetchInboxMessages();
    }, []);

    useEffect(() => {
      fetchMessages();
    }, []);

    async function getUsernameMentions() {
      try {
        const token = 'YOUR_AUTH_TOKEN'; // Replace with your authentication token
        const response = await fetch('http://localhost:5000/api/get_user_mentions', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`}});  
        const data = await response.json();
        if (response.ok) {
          console.log('Username Mentions:', data);
          return data; // Return the retrieved data
        } else {
          throw new Error(data.message || 'Failed to retrieve username mentions');}
      } catch (error) {
        console.error('Error fetching username mentions:', error.message);
        throw error; }}
    useEffect(() => {
      async function fetchData() {
        try {
          const usernameMentions = await getUsernameMentions();
          setMentions(usernameMentions); // Update component state with retrieved mentions
        } catch (error) {
          console.error('Failed to fetch username mentions:', error.message);}}
  
      fetchData();}, []);
  
    const fetchMessages = async () => {
      try {
        const [inboxResponse, sentResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/message/inbox', {
            headers: {Authorization: `Bearer ${token}`}}),
          axios.get('http://localhost:5000/api/message/sent', {
            headers: {Authorization: `Bearer ${token}`}})]);
  
        if (inboxResponse && inboxResponse.data) {
          setInboxMessages(inboxResponse.data);}
  
        if (sentResponse && sentResponse.data) {
          setSentMessages(sentResponse.data);}
      } catch (error) {
        console.error('Error fetching messages:', error);}};
  
    useEffect(() => {
      const combined = [...sentMessages.map(msg => ({ ...msg, type: 'sent' })), ...inboxMessages.map(msg => ({ ...msg, type: 'received' }))];
      setCombinedMessages(combined);
    }, [sentMessages, inboxMessages]);

    async function fetchInboxMessages() {
      try {
        const response = await fetch('http://localhost:5000/api/message/inbox', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`}});
        if (!response.ok) {
          throw new Error(`Failed to fetch inbox messages: ${response.status} ${response.statusText}`);}
        const data = await response.json();
        if (data) {
          setInboxMessages(data);
        } else {
          console.error('No inbox messages received.'); }
        if (response && response.data) {
          const messages = response.data;
          setInboxMessages(messages);
          const unread = messages.filter(message => !message.isRead);
          setUnreadMessages(unread);
        }
      } catch (error) {
        console.error('Error fetching inbox messages:', error);}}
     useEffect(() => {
      if (token) {
        axios.get('http://127.0.0.1:5000/api/v1/me', {
          headers: {
            Authorization: `Bearer ${token}`, // Properly interpolate token
          },})
        .then(response => {
          setUsername(response.data.user.username);})
        .catch(error => {
          console.error('Error fetching user data:', error);
        });}}, [token]);

  async function markMessageRead(messageId) {
    try {
      await axios.post('http://localhost:5000/api/read_message', { messageId });
      fetchCombinedMessages();
    } catch (error) {
      console.error('Failed to mark message as read:', error.message);}}

  async function markMessageUnread(messageId) {
    try {
      await axios.post('http://localhost:5000/api/unread_message', { messageId });
      fetchCombinedMessages();
    } catch (error) {
      console.error('Failed to mark message as unread:', error.message);}}

     useEffect(() => {
       if (toggle === 3) {
         getSentMessages()
           .then(messages => setSentMessages(messages))
           .catch(error => console.error(error));
       }
     }, [toggle]);
     async function getUnreadMessages(username) {
      try {
        const response = await fetch(`http://localhost:5000/api/message/unread`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`},
          body: JSON.stringify({ username }),});
    
        const data = await response.json();
    
        if (data.success) {
          this.setState({ unreadMessages: data.message });        } else {
          console.error(data.error);}
      } catch (error) {
        console.error('Failed to retrieve unread messages:', error);}}
    useEffect(() => {
      fetchCombinedMessages();}, []);

    async function fetchCombinedMessages() {
      try {
        const response = await axios.get('http://localhost:5000/api/message/combined');
        const { data } = response;
  
        if (data && Array.isArray(data)) {
          // Initialize message status array based on fetched messages
          const initialStatus = data.map(message => ({
            _id: message._id,
            isRead: message.isRead || false}));
          setMessageStatus(initialStatus);
          setCombinedMessages(data);
        } else {
          console.error('Invalid response format for combined messages:', data);}
      } catch (error) {
        console.error('Failed to fetch combined messages:', error.message);}}

async function sendMessage() {
  const recipient = document.getElementById('tobox').value;
  const title = document.getElementById('subbox').value;
  const content = document.getElementById('msgboxx').value;
  
  const messageData = {
    username: username,
    recipient: recipient,
    title: title,
    content: content
  };
  const response = await fetch('http://localhost:5000/api/message/compose', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`},
    body: JSON.stringify(messageData)});

  const responseData = await response.json();
  const expectedResponse = {"message": "Message sent successfully."};

  if (JSON.stringify(responseData) === JSON.stringify(expectedResponse)) {
    alert('Message sent successfully.');
  } else {
    alert('Failed to send message: ' + responseData.error);}}

useEffect(() => {
  if (toggle2 === 3) {
    Promise.all([getSentMessages(), fetchInboxMessages()])
      .then(([sentMsgs, inboxMsgs]) => {
        const combinedMessages = [...sentMsgs, ...inboxMsgs];
        setSentMessages(sentMsgs);
        setInboxMessages(inboxMsgs);
        setCombinedMessages(combinedMessages);
      })
      .catch(error => console.error(error));
  }
}, [toggle]);

async function getSentMessages() {
  const response = await fetch('http://localhost:5000/api/message/sent', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` }
  });
  const responseData = await response.json();
  if (response.ok) {
    return responseData;
  } else {
    throw new Error(responseData.error || 'Failed to get sent messages'); }}

async function handleDeleteMessage(messageId) {
  try {
    const response = await fetch(`http://localhost:5000/api/message/del_msg`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`},
      body: JSON.stringify({ messageId })});

    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Failed to delete message: ${data.message}`);}

    alert('Message deleted successfully.');
  } catch (error) {
    console.error('Error deleting message:', error);
    alert('Failed to delete message.');}}

const handleReportMessage = async (messageId) => {
  try {
    toggleReportModal();
    if (selectedReportReason) {
      const response = await fetch(`http://localhost:5000/api/report_msg`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`},
        body: JSON.stringify({ _id: messageId, reportDetails: selectedReportReason })});

      if (response.ok) {
        alert('Message reported successfully.');
      } else {
        const data = await response.json();
        alert('Failed to report message: ' + data.message);}
    } else {
      alert('Please select a reason for reporting.');}
  } catch (error) {
    console.error('Error reporting message:', error);
    alert('Failed to report message.');}};

const toggleMessageStatus = async (messageId, isRead) => {
  try {
    const endpoint = isRead ? 'markMessageUnread' : 'markMessageRead';
    await axios.post(`http://localhost:5000/api/${endpoint}`, { messageId });
    fetchInboxMessages();
  } catch (error) {
    console.error(`Failed to mark message as ${isRead ? 'unread' : 'read'}:`, error.message);
  }
};

return (
  <div className="app-container">
    <div className='TopBar'>
      <button className={toggle === 1 ? "menu-button active" : "menu-button"} onClick={() => toggleTab(1)}>Send A Private Message</button>
      <button className={toggle === 2 ? "menu-button active" : "menu-button"} onClick={() => toggleTab(2)}>Inbox</button>
      <button className={toggle === 3 ? "menu-button active" : "menu-button"} onClick={() => toggleTab(3)}>Sent</button>
    </div>

    <div className='MainWindow'>
      <div className={toggle === 1 ? "MainWindow1 active-content" : "MainWindow1"}>
        <div className='towindow'>
          <p className='titlebox'>Send A Private Message</p>
          <div className='firsttxt'>
            <p className='titlebox'>to </p><p className='greytxt'>(username, or /r/name for that subreddit's moderators)</p>
          </div>
          <input id='tobox' className='tobox' type="text" />
        </div>

        <div className='subwindow'>
          <p className='titlebox'>subject</p>
          <input id='subbox' className='subbox' type="text" />
        </div>

        <div className='Msgbox'>
          <p className='titlebox'>message</p>
          <input id='msgboxx' className='msgboxx' rows="1" cols="1" type="text" />
        </div>

        <div className='robotchk'>
          <button id='sendbtn' className='Sendbutton' onClick={sendMessage}>SEND</button>
        </div>
      </div>

      <div className={toggle === 2 ? "MainWindow2 active-content" : "MainWindow2"}>
        <div className='TopBar2'>
          <button className={toggle2 === 1 ? "menu-button2 active" : "menu-button2"} onClick={() => toggleTab2(1)}>All</button>
          <button className={toggle2 === 2 ? "menu-button2 active" : "menu-button2"} onClick={() => toggleTab2(2)}>Unread</button>
          <button className={toggle2 === 3 ? "menu-button2 active" : "menu-button2"} onClick={() => toggleTab2(3)}>Messages</button>
          <button className={toggle2 === 4 ? "menu-button2 active" : "menu-button2"} onClick={() => toggleTab2(4)}>Comment Replies</button>
          <button className={toggle2 === 5 ? "menu-button2 active" : "menu-button2"} onClick={() => toggleTab2(5)}>Post Replies</button>
          <button className={toggle2 === 6 ? "menu-button2 active" : "menu-button2"} onClick={() => toggleTab2(6)}>Username Mentions</button>
        </div>

        <div className='tab2window'>
          <div className={toggle2 === 1 ? "tab2-1 active-content2" : "tab2-1"}>
            <div className="themessageinb">
              {inboxMessages.length > 0 ? (
                inboxMessages.map(message => (
                  <div key={message._id} className="message-container">
                    <div className="topmsg">
                      <h4 className="txttitle">{message.title}</h4>
                      <h4 className="txttitle">:</h4>
                    </div>
                    <div className="belowtitle">
                      <div className="msgbody">
                        <p className="msgcontent">From:</p>
                        <p className="reciever">{message.username}</p>
                        <p className="msgcontent">Received:</p>
                        <p>{new Date(message.dateTime).toLocaleString()}</p>
                      </div>
                      <div className="contmsg">
                        <p className="msgcontent">{message.content}</p>
                      </div>
                      <div className="message-actions">
                        <button className='Permalink' onClick={() => handleDeleteMessage(message._id)}>Delete</button>
                        <button className='Permalink' onClick={() => handleReportMessage(message._id, 'Report Reason')}>Report</button>
                        <button className='Permalink'>Permalink</button>
                        <button onClick={() => toggleMessageStatus(message._id, message.isRead)}>
                          {message.isRead ? 'Mark as Unread' : 'Mark as Read'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="nocontmsg">
                  <p className="errmsg">There doesn't seem to be anything here</p>
                </div>
              )}
            </div>
            {reportModalOpen && (
              <div className="report-modal-overlay">
                <div className="report-modal">
                  <h2>Submit a Report</h2>
                  <p>Thanks for looking out for yourself and your fellow redditors by reporting things that break the rules. Let us know what's happening, and we'll look into it.</p>
                  <select
                    value={selectedReportReason}
                    onChange={(e) => setSelectedReportReason(e.target.value)}
                  >
                    <option value="">Select a reason</option>
                    <option value="Harassment">Harassment</option>
                    <option value="Threatening violence">Threatening violence</option>
                    <option value="Hate">Hate</option>
                    {/* Add more report reasons as needed */}
                  </select>
                  <button onClick={handleSubmitReport}>Submit</button>
                  <button onClick={handleCloseReportModal}>Cancel</button>
                </div>
              </div>
            )}
          </div>

          <div className={toggle2 === 2 ? "tab2-1 active-content2" : "tab2-2"}>
            {unreadMessages.length > 0 ? (
              unreadMessages.map(message => (
                <div key={message._id} className="message-container">
                  <div className="topmsg">
                    <h4 className="txttitle">{message.title}</h4>
                    <h4 className="txttitle">:</h4>
                  </div>
                  <div className="belowtitle">
                    <div className="msgbody">
                      <p className="msgcontent">From:</p>
                      <p className="reciever">{message.username}</p>
                      <p className="msgcontent">Received:</p>
                      <p>{new Date(message.dateTime).toLocaleString()}</p>
                    </div>
                    <div className="contmsg">
                      <p className="msgcontent">{message.content}</p>
                    </div>
                    <div className="message-actions">
                      <button className='Permalink'>Permalink</button>
                      <button onClick={() => toggleMessageStatus(message._id, true)}>Mark as Read</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="nocontmsg">
                <p className="errmsg">There doesn't seem to be anything here</p>
              </div>
            )}
          </div>

          <div className={toggle2 === 3 ? "tab2-3 active-content2" : "tab2-3"}>
            <div className="themessage">
              {combinedMessages.length > 0 ? (
                combinedMessages.map((message) => (
                  <div key={message._id} className="message-container">
                    <div className="topmsg">
                      <h4 className="txttitle">{message.title}</h4>
                      <h4 className="txttitle">:</h4>
                    </div>
                    <div className="belowtitle">
                      <div className="msgbody">
                        <p className="msgcontent">From:</p>
                        <p className="reciever">{message.type === 'received' ? message.sender : message.recipient}</p>
                        <p className="msgcontent">{message.type === 'received' ? 'Received' : 'Sent'}:</p>
                        <p>{new Date(message.dateTime).toLocaleString()}</p>
                      </div>
                      <div className="contmsg">
                        <p className="msgcontent">{message.content}</p>
                      </div>
                      <div className="message-actions">
                        <button className='Permalink' onClick={() => handleDeleteMessage(message._id)}>Delete</button>
                        <button className='Permalink' onClick={toggleReportModal}>Report</button>
                        <button className='Permalink' onClick={() => toggleMessageStatus(message._id, message.isRead)}>
                          {message.isRead ? 'Mark as Unread' : 'Mark as Read'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="nocontmsg">
                  <p className="errmsg">There doesn't seem to be anything here</p>
                </div>
              )}
            </div>
            {reportModalOpen && (
              <div className="report-modal-overlay">
                <div className="report-modal">
                  <h2>Submit a Report</h2>
                  <p>Thanks for looking out for yourself and your fellow redditors by reporting things that break the rules. Let us know what's happening, and we'll look into it.</p>
                  <select
                    value={selectedReportReason}
                    onChange={(e) => setSelectedReportReason(e.target.value)}
                  >
                    <option value="">Select a reason</option>
                    <option value="Harassment">Harassment</option>
                    <option value="Threatening violence">Threatening violence</option>
                    <option value="Hate">Hate</option>
                    {/* Add more report reasons as needed */}
                  </select>
                  <button onClick={handleReportMessage}>Submit</button>
                </div>
              </div>
            )}
          </div>

          <div className={toggle2 === 4 ? "tab2-1 active-content2" : "tab2-4"}>
            <div><p className='errmsg'>there doesn't seem to be anything here4</p></div>
          </div>

          <div className={toggle2 === 5 ? "tab2-1 active-content2" : "tab2-5"}>
            {postReplies.length > 0 ? (
              <div>
                {postReplies.map((reply, index) => (
                  <div key={index}>
                    <p className='reply-item'>{reply}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p className='errmsg'>There doesn't seem to be anything here</p>
              </div>
            )}
          </div>

          <div className={toggle2 === 6 ? "tab2-1 active-content2" : "tab2-6"}>
            {mentions.length > 0 ? (
              <div>
                {mentions.map((mention, index) => (
                  <div key={index}>
                    <p className='mention-item'>{mention}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p className='errmsg'>There doesn't seem to be anything here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={toggle === 3 ? "MainWindow3 active-content" : "MainWindow3"}>
        <div className='themessage'>
          {sentMessages.length > 0 ? (
            sentMessages.map((message) => (
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
);

    }
export default Chats;
