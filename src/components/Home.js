import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div id='Home' className="new">
      <h2>Welcome to Doctor Appointment</h2>
      <p>Manage your appointments easily.</p>
      <Link to="/add-appointment" className="btn btn-primary mr-2">Add Appointment</Link>
      <Link to="/patient-details" className="btn btn-secondary">Add Patient Details</Link>
    </div>
  );
};

export default Home;
