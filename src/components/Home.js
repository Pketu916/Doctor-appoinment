import React from "react";
import { Link } from "react-router-dom";
import DoctorList from './DoctorList'; // Import the DoctorList component

const Home = () => {
  return (
    <div>
    <div id="home" className="container-fluid d-flex align-items-center flex-column">
      <div className="row">
        <div className="homeset col-md-6 d-flex flex-column justify-content-center">
          <h2 className="mb-4">The Most Valuable Thing is Your Health</h2>
          <p className=" pa mb-4">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.
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
