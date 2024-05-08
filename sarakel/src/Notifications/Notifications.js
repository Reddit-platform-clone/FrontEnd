import React, { useEffect, useState } from 'react';
import NavBar from '../HomePage/Components/NavBar/NavBar';
import './Notifications.css';
import { requestPermission, onMessageListener } from './firebase';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../HomePage/Components/AuthContext';



export default function Notifications() {

  const {token} = useAuth()


  const [notifications, setNotifications] = useState([]);

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

  // Function to fetch notifications from the database
  async function fetchNotifications() {
    try {
      const response = await axios.get("http://localhost:5000/api/notifications/listNotifications", {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      // Update state with fetched notifications
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
    console.log(`${token}`)
  }

  return (
    <div>
      <NavBar />
      <div id="pop-page">
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>
              <span>{notification.title}</span>
              <span>{notification.body}</span>
            </li>
          ))}
        </ul>
      </div>
      <Toaster />
    </div>
  );
}
