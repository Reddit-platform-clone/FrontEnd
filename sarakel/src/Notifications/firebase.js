import { initializeApp } from "firebase/app";
import { getMessaging,onMessage,getToken } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDC4_03h716SWY5iSncgEJCM18_R1bb6kA",
  authDomain: "final-sarakel.firebaseapp.com",
  projectId: "final-sarakel",
  storageBucket: "final-sarakel.appspot.com",
  messagingSenderId: "74358882817",
  appId: "1:74358882817:web:af81adb71413daa871b600"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the messaging object for the initialized app
const messaging = getMessaging(app);

export { messaging };


export const requestPermission = () => {
  console. log("Requesting User Permission..")
  Notification. requestPermission().then(permission => {
  if (permission === "granted") {
  console. log("Notification User Permission Granted.");
  
  return getToken(messaging,{
  vapidKey:
  "BB1SQTO6bEwEfPFTY9kL6m9Si1tMl9-QAmdHHgXOAqB20VhtQcO-4AlBN3EOt2iZPwjNOlZG3_W0ZY_BvwlM548"
  })
  .then(currentToken => {
  if (currentToken) {
  console. log("Client Token: ", currentToken);
  } else {
    console. log("Failed to generate the ann renistration token");
  }
    
    
   
})
   
    
    .catch(err => {
    console. log(
    "An error occurred when requesting to receive the token.",
    err);
    })
    
    } else {
    console.log("User Permission Denied.");
    }
  });

};

requestPermission();



export const onMessageListener = () =>
new Promise(resolve =>{
onMessage(messaging, payload => {
resolve(payload);});
});