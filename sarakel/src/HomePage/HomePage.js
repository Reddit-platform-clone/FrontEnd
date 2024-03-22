import React, { } from 'react';
import NavBar from './Components/NavBar/NavBar'
import SideBar from './Components/SideBar/SideBar'
import Content from './Components/content/content'

export default function HomePage(){
    return(
        <div>
            <NavBar />
            <SideBar />
            <Content />
        </div>

    )
}