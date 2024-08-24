import React from "react";

const Footer = () => {
  return (
    <footer className="bgfooter text-center text-lg-start">
      <div className="container p-4">
        <div className="roww row">
          {/* DrPRO Section */}
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">DrPRO</h5>
            <p>
              Plastic Surgery <br />
              Nulla facilisi. Nulla egestas vel lacus sed interdum. Sed mollis, orci elementum eleifend tempor, nunc libero porttitor tellus.
            </p>
          </div>

          {/* Contact Info Section */}
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Contact Info</h5>
            <p>+53 345 7953 32453</p>
            <p>yourmail@gmail.com</p>
            <p>contact@gmail.com</p>
          </div>

          {/* Our Locations Section */}
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Our Locations</h5>
            <p>Miami <br /> 45 Creekside Av FL 931</p>
            <p>Los Angeles <br /> 1481 Creekside Lane Avila Beach, CA 931</p>
          </div>

          {/* Opening Hours Section */}
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Opening Hours</h5>
            <p>Monday: 8:00am - 9:00pm</p>
            <p>Tuesday: 8:00am - 9:00pm</p>
            <p>Wednesday: 8:00am - 9:00pm</p>
            <p>Thursday: 8:00am - 9:00pm</p>
            <p>Friday: 8:00am - 7:00pm</p>
          </div>
        </div>
      </div>
      
      <div className=" footer text-center p-3"> 
        ©2024 Doctor Appointment 
      </div>
    </footer>
  );
};

export default Footer;
