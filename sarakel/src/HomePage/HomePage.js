import React, { useState } from 'react';
import NavBar from './Components/NavBar/NavBar'
import SideBar from './Components/SideBar/SideBar'
import Content from './Components/content/content'
import NavBarUnlogged from './Components/NavBar Unlogged/NavBarUnlogged';

export default function HomePage(){
    
        const [isLoggedIn, setIsLoggedIn] = useState(false);

        const handleLogin = () => {
          setIsLoggedIn(true);
        };

        const handleLogout = () => {
            setIsLoggedIn(false);
          };
      
        return (
          <div>
            {isLoggedIn ? <NavBar onLogout={handleLogout} /> : <NavBarUnlogged onLogin={handleLogin} />}
            <SideBar />
            <Content />
        </div>

    )
}