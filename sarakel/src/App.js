//import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import HomePage from './HomePage/HomePage.js';
// import Settings from './Settings/SettingPage.js'
// import Moderation from './Moderation/Moderation.js'
// import Notifications from './Notifications/Notifications.js';
// import MessagesPage from './messagespage/messagespage.js';
// import CreatePost from './CreatePost/CreatePost.js';
// import ProfilePage from './ProfilePage/ProfilePage.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import PostPage from './PostPage/PostPage'
// import Search from './Search/Search.js'
// import { AuthProvider } from './HomePage/Components/AuthContext.js';
// import messagespage from './messagespage/messagespage.js'
//import { Route } from 'react-router-dom';
//import NavBar from './HomePage/Components/NavBar/NavBar.js'
function App() {
  return (      
    // <AuthProvider>
    //     <BrowserRouter>
    //     <Routes>
    //       <Route index  element={<HomePage />} />
    //       <Route path='settings' element={<Settings />} />
    //       <Route path = 'MessagesPage' element={<MessagesPage />}></Route>
    //       <Route path ='Moderation' element={<Moderation />}></Route>
    //       <Route path = 'CreatePost' element={<CreatePost />}></Route>
    //       <Route path = 'ProfilePage' element={<ProfilePage />}></Route>
    //       <Route path='Search' element={<Search />}></Route>
    //       <Route path='Notifications' element={<Notifications />}></Route>
    //       <Route path='MessagesPage' element={<MessagesPage></MessagesPage>}></Route>
    //     </Routes>
    //   </BrowserRouter>
    // </AuthProvider>

        <PostPage />
    
  );
}

export default App;
