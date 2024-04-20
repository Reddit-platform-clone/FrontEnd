import React, { useState, useEffect } from 'react';
import NavBar from './Components/NavBar/NavBar';
import SideBar from './Components/SideBar/SideBar';
import Content from './Components/content/content';
import NavBarUnlogged from "./Components/NavBar Unlogged/NavBarUnlogged";
import { useAuth } from "./Components/AuthContext";

export default function HomePage(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { token } = useAuth();

    useEffect(() => {
        setIsLoggedIn(token !== null); 
    }, [token]);
      
    return (
        <div>
            {isLoggedIn ? <NavBar/> : <NavBarUnlogged/>}
            <SideBar />
            <Content />
        </div>
    );
}
