# notifications
```jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      // Request Firebase permission and get the token
      const token = await requestPermission();
      // Send the token to the backend
      sendTokenToBackend(token);
      
      // Subscribe to Firebase messages
      const unsubscribe = onMessageListener().then(payload => {
        // Update state with incoming notification
        setNotifications(prevNotifications => [...prevNotifications, payload]);
      });

      // Unsubscribe when component unmounts
      return () => {
        unsubscribe.catch(err => console.log("failed: ", err));
      };
    } catch (error) {
      console.error("Failed to get Firebase token:", error);
    }
  };

  fetchData();

}, []);


async function sendTokenToBackend(token) {
    try {
      await axios.post(
        "http://localhost:5000/api/notifications/addDevice",
        { token: token },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhaGV5MSIsImlhdCI6MTcxNTEwODI0MX0.l4yDvmBHyap-LoZ4oRgK5vZziN6FoY-BB6-gzw4FQKo` ,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Token sent to backend successfully");
    } catch (error) {
      console.error("Error sending token to backend:", error);
    }
  }



```

#### Request Firebase permission and get the token
#### Send the token to the backend

```jsx
const [notifications, setNotifications] = useState({});

useEffect(() => {
    // Fetch notifications from the database when the component mounts
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      const response = await axios.get("http://localhost:5000/api/notifications/listNotifications", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhaGV5MSIsImlhdCI6MTcxNTEwODI0MX0.l4yDvmBHyap-LoZ4oRgK5vZziN6FoY-BB6-gzw4FQKo` 
        }
      });
  
      // Check if response.data is an object
      if (typeof response.data === 'object' && response.data !== null) {
        setNotifications(response.data);
        console.log(response.data)
      } else {
        console.error("Data received is not an object:", response.data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }


```

#### get the notifications from backend and list it