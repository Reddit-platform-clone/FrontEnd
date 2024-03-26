import React, { useState } from 'react';
import NavBar from './Components/NavBar/NavBar'
import SideBar from './Components/SideBar/SideBar'
import Content from './Components/content/content'
import NavBarUnlogged from 'C:\\Users\\moham\\Desktop\\sarakel\\sarakel\\src\\HomePage\\Components\\NavBar Unlogged\\NavBarUnlogged';

export default function HomePage(){
    
        const [isLoggedIn, setIsLoggedIn] = useState(false);

        const handleLogin = () => {
          setIsLoggedIn(true);
        };
      
        return (
          <div>
            {isLoggedIn ? <NavBar /> : <NavBarUnlogged onLogin={handleLogin} />}
            <SideBar />
            <Content />
        </div>

    )
}