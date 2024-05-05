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
          <Route path='/settings' element={<Settings />} />
          <Route path='/messages' element={<MessagesPage />} />
          <Route path='/moderation' element={<Moderation />} />
          <Route path='/createpost' element={<CreatePost />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/search' element={<Search />} />
          <Route path='/notifications' element={<Notifications />} />
          <Route path="/" element={<Users />} />
          <Route path="/user/:username/overview" element={<UsersProfile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
