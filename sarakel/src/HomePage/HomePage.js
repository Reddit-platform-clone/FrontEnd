import React, { useState } from 'react';
import NavBar from './Components/NavBar/NavBar'
import SideBar from './Components/SideBar/SideBar'
import Content from './Components/content/content'
import NavBarUnlogged from './Components/NavBar Unlogged/NavBarUnlogged';
import mock from '../mock.json'
export default function HomePage(){
          let Logged = false
          let NotLogged = true
          mock.users.map((user) => {
            if(user.LoggedIn === 1){
                Logged =true
                NotLogged = false
            }
        })
        const[Mainnav,setMainNav] = React.useState(Logged)
        const[OutNav,setOutNav] = React.useState(NotLogged)
        mock.users.map((user) => {
          if(user.LoggedIn === 1){
            Logged =true
            NotLogged = false
          }
      })
        return (
          <div>
            {Mainnav && (<NavBar />)}
            {OutNav && (<NavBarUnlogged />)}
            <SideBar />
            <Content />
        </div>

    )
}