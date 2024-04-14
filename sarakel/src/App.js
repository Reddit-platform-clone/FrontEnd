import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './HomePage/HomePage.js';
import Settings from './Settings/SettingPage.js'
import Moderation from './Moderation/Moderation.js'
import MessagesPage from './messagespage/messagespage.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
//import { Route } from 'react-router-dom';
//import NavBar from './HomePage/Components/NavBar/NavBar.js'
function App() {
  return (
    // <div className="App">
    //   {/* <Social /> */}
    //   {/* <SideBar /> */}
    //   {/* <Settings /> */}
      
    <BrowserRouter>
      <Routes>
        <Route index  element={<HomePage />} />
        <Route path='settings' element={<Settings />} />
        <Route  path = 'MessagesPage' element={<MessagesPage />}></Route>
      </Routes>
    </BrowserRouter>

      

  );
}

export default App;
