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

###
```jsx

```
