import React from "react";
import { Link } from "react-router-dom";
import DoctorList from './DoctorList'; // Import the DoctorList component

const Home = () => {
  return (
    <div>
    <div id="home" className="container-fluid d-flex align-items-center flex-column">
      <div className="row">
        <div className="homeset col-md-6 d-flex flex-column justify-content-center">
          <h2 className=" your-health mb-4">The Most Precious Gift: Your Health</h2>
          <p className=" pa mb-4">
          In a peaceful land beyond word mountains, our portal awaits to guide you on your journey to wellness. Whether booking an appointment or adding patient details, all paths lead to care and healing.
          </p>
          <div className="homesetbtn mb-4">
            <Link to="/add-appointment" className="btn btn-primary me-2">
              Add Appointment
            </Link>
            <Link to="/patient-details" className="btn btn-secondary ms-2">
              Add Patient Details
            </Link>
            <Link to="/doctor-list" className="btn btn-info ms-2">
              View Doctor List
            </Link>
          </div>
        </div>
      </div>

    </div>
      {/* Include DoctorList component directly in the Home page */}
      <div className="doctor-list-section col-md-12">
        <h3 className="mb-4">Our Doctors</h3>
        <DoctorList />
      </div>
    </div>
  );
};

export default Home;
