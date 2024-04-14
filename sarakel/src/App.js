import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './HomePage/HomePage.js';
import Settings from './Settings/SettingPage.js'
import { AuthProvider } from './HomePage/Components/AuthContext.js';
function App() {
  return (
    // <div className="App">
    //   {/* <Social /> */}
    //   {/* <SideBar /> */}
    //   {/* <Settings /> */}
      
    // </div>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route index  element={<HomePage />} />
        <Route path='settings' element={<Settings />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
