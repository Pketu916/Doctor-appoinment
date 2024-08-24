import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../img/logo.png';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <img src={Logo} alt="Logo" className="navbar-logo" />
        <NavLink className="navbar-brand" to="/">MediManage</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                exact
                className="nav-link"
                to="/"
                activeClassName="active"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/add-appointment"
                activeClassName="active"
              >
                Appointment
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/patient-details"
                activeClassName="active"
              >
                Patient Details
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/about"
                activeClassName="active"
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/doctor-list"
                activeClassName="active"
              >
                Doctors
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
