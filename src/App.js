import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import AddAppointment from './components/AddAppointment';
import PatientDetails from './components/PatientDetails';
import About from './components/About';
import Admin from './components/Admin';
import './App.css'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => setLoggedIn(true);

  return (
    <Router>
      <div>
        {loggedIn && <Navbar />}
        <Routes>
          <Route path="/login" element={<Admin onLogin={handleLogin} />} />
          <Route path="/" element={loggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
          <Route path="/home" element={loggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/add-appointment" element={loggedIn ? <AddAppointment /> : <Navigate to="/login" />} />
          <Route path="/patient-details" element={loggedIn ? <PatientDetails /> : <Navigate to="/login" />} />
          <Route path="/about" element={loggedIn ? <About /> : <Navigate to="/login" />} />
        </Routes>
        {loggedIn && <Footer />}
      </div> 
    </Router>
  );
};

export default App;
