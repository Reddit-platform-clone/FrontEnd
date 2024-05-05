import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage.js';
import Settings from './Settings/SettingPage.js';
import Moderation from './Moderation/Moderation.js';
import Notifications from './Notifications/Notifications.js';
import MessagesPage from './messagespage/messagespage.js';
import CreatePost from './CreatePost/CreatePost.js';
import ProfilePage from './ProfilePage/ProfilePage.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import Search from './Search/Search.js';
import { AuthProvider } from './HomePage/Components/AuthContext.js';
import Users from './Search/Components/Users.js'; 
import UsersProfile from './ProfileForOtherUsers/UsersProfile.js'; 

function App() {
  return (      
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='settings' element={<Settings />} />
          <Route path='MessagesPage' element={<MessagesPage />} />
          <Route path='Moderation' element={<Moderation />} />
          <Route path='CreatePost' element={<CreatePost />} />
          <Route path='ProfilePage' element={<ProfilePage />} />
          <Route path='Search' element={<Search />} />
          <Route path='Notifications' element={<Notifications />} />
          <Route path="/user/:username/overview" element={<UsersProfile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
