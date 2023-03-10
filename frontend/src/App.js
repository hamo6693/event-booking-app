import './App.css';
import React, { useState } from 'react';
import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom"
import LoginPage from './pages/Login';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';
import SingUpPage from './pages/SingUp';
import Navbar from "./components/Navbar"
import AuthContext from './context/auth-context';
function App() {
  let [token,setToken] = useState(localStorage.getItem("token") || "")
  let [userId,setUserId] = useState(localStorage.getItem("userId") || "")
  let [username,setUsername] = useState(localStorage.getItem("username") || "")

  const login = (userToken,loginUserId,username) => {
    if(userToken) {
      setToken(userToken)
      localStorage.setItem("token",userToken)
    }
    if(loginUserId) {
      setUserId(loginUserId)
      localStorage.setItem("userId",userId)
    }
    if(username) {
      setUsername(username)
      localStorage.setItem("username",username)
    }
  }
  const logout = () => {
    setToken(null)
    setUserId(null)
    setUsername(null)
    localStorage.clear()
  }
  return (
    <BrowserRouter>
    <AuthContext.Provider value={{token,username,userId,login,logout}}>
    <Navbar />
    <div className='main-content'>
    <Routes>
      {token && <Route path='/login' element={<Navigate replace to="/events"/>} exact />}
      {token && <Route path='/singup' element={<Navigate replace to="/events"/>} exact />}
      <Route path='/events' element={<EventsPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/singup' element={<SingUpPage />} />
      {!token && <Route path='/bookings' element={<Navigate replace to="/login"/>} exact />}
      <Route path='/bookings' element={<BookingsPage />} />
      <Route path='/' element={<Navigate replace to="/events" />} />
    </Routes>
    </div>
    </AuthContext.Provider>
    
    </BrowserRouter>
    
  );
}

export default App;
