import React, { useEffect, useState } from 'react';
import NavBar from '../HomePage/Components/NavBar/NavBar';
import './Notifications.css';
import { requestPermission, onMessageListener } from './firebase';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../HomePage/Components/AuthContext';



export default function Notifications() {

  const {token} = useAuth()


  const [notifications, setNotifications] = useState({});

  useEffect(() => {
    requestPermission();

    const unsubscribe = onMessageListener().then(payload => {
      // Update state with incoming notification
      setNotifications(prevNotifications => [...prevNotifications, payload]);
    });

    return () => {
      unsubscribe.catch(err => console.log("failed: ", err));
    };
  }, []);

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

  return (
    <div>
      <NavBar />
      <div id="pop-page">
     
      <ul cl>
        {notifications && notifications.data && notifications.data.map((notification, index) => (
          <li className='notif' key={index}>
            <span className='sendery'>{notification.title}</span>
            <span className='recievery'>{notification.body}</span>
          </li>
        ))}
      </ul>
      </div>

      <Toaster />
    </div>
  );
}
