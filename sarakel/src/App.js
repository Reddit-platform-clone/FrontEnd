import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './HomePage/HomePage.js';
import Settings from './Settings/SettingPage.js'
 import ProfilePage from './ProfilePage/ProfilePage.js';
import SideBar from './HomePage/Components/SideBar/SideBar.js';
import NavBarUnlogged from './HomePage/Components/NavBar Unlogged/NavBarUnlogged.js';
 import UsersProfile from './ProfileForOtherUsers/UsersProfile.js';
 import Search from './Search/Search.js';
function App() {
  return (
    // <div className="App">
    //   {/* <Social /> */}
    //   {/* <SideBar /> */}
    //   {/* <Settings /> */}
      
    //</div>
    //  <BrowserRouter>
    // <Routes>
    //    <Route index  element={<HomePage />} />
    //      <Route path='settings' element={<Settings />} />
    //    </Routes>
    //  </BrowserRouter>
        <>
         <UsersProfile/>
        </>

  );
}

export default App;
