import React from 'react'
import Navbar from '../components/Navbar'
import Profile from '../components/Profile'
import {Routes,Route } from 'react-router-dom';
import CreateEvent from '../pages/CreateEvent';
import ManageEvents from '../pages/ManageEvents';
import ManageUsers from '../pages/ManageUsers';
import MyEvents from '../pages/MyEvents';
import AboutUs from '../pages/AboutUs';
import Welcome from '../pages/Welcome'

const Home = ({isAuthenticated}) => {
  return (
    <div>
        <Navbar isAuthenticated={isAuthenticated}/>
    
    <div style={{marginTop:'80px'}}>

        <Routes>
            <Route path='/' element={<Welcome/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/createvnt' element={<CreateEvent/>}/>
            <Route path='/myevnts' element={<MyEvents/>}/>
            <Route path='/aboutus' element={<AboutUs/>}/>
            

            <Route path='/managevnt' element={<ManageEvents/>}/>
            <Route path='/manageusers' element={<ManageUsers/>}/>

        </Routes>
        
    </div>
    </div>
  )
}

export default Home