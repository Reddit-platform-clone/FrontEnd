# chats
### toggle

```jsx
    const [toggle, setToggle] = useState(1);
    const [toggle2, setToggle2] = useState(1);
    const toggleTab = (index) => {
      setToggle(index);
     }
    
     const toggleTab2 = (index2) => {
      setToggle2(index2);
     }

```
#### toggle used to navigate between the tabs
#### toggle used to navigate between (Send A Private Message, Inbox, Sent)
#### toggle2 used to navigate between the tabs that appear when inbox tab clicked to show new tabs (All, Unread, Messages, Comment Replies, Post Replies, Username Mentions)

### function1
```jsx
 useEffect(() => {
       if (toggle === 3) {
         getSentMessages()
           .then(messages => setSentMessages(messages))
           .catch(error => console.error(error));
       }
     }, [toggle]);
```
#### to send the sent messages data to the third tab(sent messages)

### ReportModel 
```jsx
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
    
    onst handleReportMessage = async (messageId) => {
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

```
#### explains Report Model logic and the choice of the report message popup window

### fetchPostReplies functions
```jsx

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
```
#### function to get the post replies from the back end and display it

### delete button
``` jsx
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

```
#### as when the user click the delete button it gets the message id and remove it from the database

### getUnreadMessages function
```jsx
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
    
```
#### function getUnreadMessages used to check if there is still there unread messages or not if not an error message appear

### sendMessage function
```jsx
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


```
#### function sendMessage takes the element from the to box to assign it to the recipient as it is called in the backend file, the element from the subject box and assign it to the title in the backend and the message text from the message box and assign it to the content in the backend
#### the token is for a user to test the sending of the message
#### if the message is sent 'Message sent successfully' if not 'Failed to send message:' message appear

### deleteMessage function
```jsx
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
      // TODO: update your UI to remove the deleted message
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error('Failed to delete message:', error);
  }
}
```
#### The request includes headers for ‘Content-Type’ and ‘Authorization’. The ‘Content-Type’ is set to ‘application/json’, indicating that the body content is in JSON format. The ‘Authorization’ header includes the token for authentication.
#### The body of the request is a JSON string that contains the userID and messageId. This information is likely used by the server to identify which message to delete.
####  If the success property of the response data is true, it means the message was successfully deleted. An alert is shown with the message from the server, and there’s a placeholder comment indicating where code should be added to update the UI to reflect the deletion. If success is not true, it means there was an error, and an alert is shown with the error message.

### getSentMessages functions
```jsx
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

```
#### it includes headers such as 'Content-Type': 'application/json' and 'Authorization': token for authentication using the token declared earlier.
#### If the response is successful (response.ok is true), it returns the extracted JSON data. Otherwise, it throws an error with either the error message received from the server (responseData.error) or a generic message indicating the failure to fetch sent messages.

### getInboxMessages function
```jsx
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

```
#### the function getInboxMessages that takes a username parameter.
#### it includes headers such as 'Content-Type': 'application/json' and 'Authorization': token for authentication using the token declared earlier. Additionally, it sends the username as JSON data in the request body.
#### If  the response indicates success (data.success is true), it logs the inbox messages to the console. Otherwise, it logs the error received from the server.

### displayInboxMessages function
```jsx

function displayInboxMessages(messages) {
  const inboxContainer = document.getElementById('inbox-container');
  inboxContainer.innerHTML = ''; // Clear previous content

  messages.forEach(message => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message.text;
    inboxContainer.appendChild(messageElement);
  });
}

```
#### that function is responsible for updating the user interface (UI) to display inbox messages
#### inbox-container'. This element will serve as the container for displaying the inbox messages.
#### Inside the loop, it creates a new (div) element for each message. It sets the textContent property of the (div) element to the text content of the current message.

### return()
```jsx
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
```
#### app-container div is representing the whole page below the navigation bar
#### Topbar div is responsible for the blue bar below the navigation bar the contain 3 buttons mentioned above that toggle to change window content
#### main window div contain 3 states for each button with different contents
#### The first window contains a title , to box, subject box, message box to write the message to be delivered
#### second window contains inbox messages
#### third messages contains sent messages

### display Unread messages
```jsx
 <div>
    {unreadMessages.length > 0 ? (
      unreadMessages.map((message) => (
        <p key={message.id}>{message.content}</p>
      ))
    ) : (
      <p className='errmsg'>there doesn't seem to be anything here</p>
    )}
  </div>
```
#### This is a conditional statement. It checks if the length of the unreadMessages array is greater than 0. If it is, it evaluates the expression inside the parentheses. If not, it evaluates the expression after the colon.

### Message div
```jsx
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
```
#### div to divide this window to show the message

### Report window
```jsx
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
```
#### on clicking the report button a pop up window appear to choose the report reason from drop down list of 3 choices
#### Harassment
#### Hate
#### Threatening Violence
