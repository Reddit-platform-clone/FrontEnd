import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage.js';
import Settings from './Settings/SettingPage.js';
import Moderation from './Moderation/Moderation.js';
import Notifications from './Notifications/Notifications.js';
import MessagesPage from './messagespage/messagespage.js';
import CreatePost from './CreatePost/CreatePost.js';
import ProfilePage from './ProfilePage/ProfilePage.js';
import UsersProfile from './ProfileForOtherUsers/UsersProfile.js'
import CommunityPage from './CommunityPage/CommunityPage.js';
import Search from './Search/Search.js';
import ResetPasswordModal from './HomePage/Components/Reset/ResetPassword.js'; 
import ResetUsernameModal from './HomePage/Components/Reset/ResetUsername.js'; 
import { AuthProvider } from './HomePage/Components/AuthContext.js';
import PostPage from "./PostPage/PostPage.js"


function App() {
  return (      
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="messagespage" element={<MessagesPage />} />
          <Route path="/ModTools/:communityId" element={<Moderation />} />
          <Route path="createpost" element={<CreatePost />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path='/user/:username/overview' element={<UsersProfile></UsersProfile>} />
          <Route path="search" element={<Search />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="/community/:communityId" element={<CommunityPage></CommunityPage>} />
          <Route path="login/reset_password/:token" element={<ResetPasswordModal />} />
          <Route path="login/reset_username/:token" element={<ResetUsernameModal />} /> 
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;