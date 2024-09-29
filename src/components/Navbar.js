import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../img/logo.png';
import ProfileDropdown from './ProfileDropdown'; // Assuming this is a separate component

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from local storage
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData'); // Clear user data
    setUser(null); // Clear state
    navigate('/login'); // Redirect to login
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
          </ul>
          {user ? (
            // If user is logged in, show profile and logout option
            <ProfileDropdown user={user} onLogout={handleLogout} />
          ) : (
            <button onClick={() => navigate('/login')} className="btn btn-primary">Login</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
