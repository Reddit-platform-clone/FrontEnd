import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage.js';
import Settings from './Settings/SettingPage.js';
import Moderation from './Moderation/Moderation.js';
import Notifications from './Notifications/Notifications.js';
import MessagesPage from './messagespage/messagespage.js';
import CreatePost from './CreatePost/CreatePost.js';
import ProfilePage from './ProfilePage/ProfilePage.js';
import Search from './Search/Search.js';
import ResetPasswordModal from './HomePage/Components/Reset/ResetPassword.js'; // Import the ResetPasswordModal component
import { AuthProvider } from './HomePage/Components/AuthContext.js';

function App() {
  return (      
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="messagespage" element={<MessagesPage />} />
          <Route path="moderation" element={<Moderation />} />
          <Route path="createpost" element={<CreatePost />} />
          <Route path="profilepage" element={<ProfilePage />} />
          <Route path="search" element={<Search />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="login/reset_password/:token" element={<ResetPasswordModal />} /> 
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
