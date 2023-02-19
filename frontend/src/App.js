import './App.css';
import React from 'react';
import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom"
import LoginPage from './pages/Login';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';
import SingUpPage from './pages/SingUp';
import Navbar from "./components/Navbar"

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <div className='main-content'>
    <Routes>
      <Route path='/events' element={<EventsPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/singup' element={<SingUpPage />} />
      <Route path='/bookings' element={<BookingsPage />} />
      <Route path='/' element={<Navigate replace to="/events" />} />
    </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
