import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../img/logo.png';

const Navbar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRedPhase, setIsRedPhase] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const items = document.querySelectorAll('.nav-item .nav-link');
    const totalItems = items.length;

    const intervalId = setInterval(() => {
      // Reset all items to default color
      items.forEach(item => item.classList.remove('red', 'blue'));

      // Set the current item color
      items[currentIndex].classList.add(isRedPhase ? 'red' : 'blue');

      // Move to the next item
      setCurrentIndex((currentIndex + 1) % totalItems);

      // If we completed a full cycle, switch phase (red to blue or vice versa)
      if (currentIndex === totalItems - 1) {
        setIsRedPhase(!isRedPhase);
      }
    }, 500); // Change color every 0.5s

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [currentIndex, isRedPhase]);

  // Logout handler function
  const handleLogout = () => {
    // Clear user session data (you might be using localStorage, sessionStorage, cookies, etc.)
    localStorage.removeItem('userToken');  // Example if token is stored in localStorage

    // Redirect to login page
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <img src={Logo} alt="Logo" className="navbar-logo" />
        <NavLink
          className="navbar-brand"
          style={{
            fontWeight: '500',
            fontFamily: 'monospace',
            fontSize: '29px'
          }}
          to="/"
        >
          MediManage
        </NavLink>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/add-appointment" activeClassName="active">
                Appointment
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/patient-details" activeClassName="active">
                Patient Details
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" activeClassName="active">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/doctor-list" activeClassName="active">
                Doctors
              </NavLink>
            </li>
            {/* Logout button */}
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/profile" activeClassName="active">
                Profile
              </NavLink>
            </li> */}
            <li className="nav-item">
              <button id='logout' className="nav-link btn-link" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
