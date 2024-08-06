import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      id="home"
      className="new d-flex flex-column align-items-center justify-content-center min-vh-90"
    >
      <h2>Welcome to MediManage</h2>
      <p>Manage your appointments and patient details with ease.</p>
      <div className="mt-4">
        <Link to="/add-appointment" className="btn1 btn btn-primary mr-2">
          Add Appointment
        </Link>
        <Link to="/patient-details" className="btn2 btn btn-secondary ml-2">
          Add Patient Details
        </Link>
      </div>
    </div>
  );
};

export default Home;
