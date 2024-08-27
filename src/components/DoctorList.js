import React from "react";
// Import the images
import bg1 from '../img/doc/bg_1.webp';
import doc2 from '../img/doc/doc-2.jpg';
import doc3 from '../img/doc/doc-3.jpg';
import doc4 from '../img/doc/doc-4.jpg';
import doc5 from '../img/doc/doc-5.jpg';
import doc6 from '../img/doc/doc-6.jpg';
import doc7 from '../img/doc/doc-7.jpg';
import doc8 from '../img/doc/doc-8.jpg';

// Doctor Component
const Doctor = ({ name, specialty, description, imgSrc }) => {
  return (
    <div className="doctor-card">
      <img src={imgSrc} alt={`${name}`} className="doctor-image" />
      <h4 className="doctor-name">{name}</h4>
      <h4 className="doctor-specialty">{specialty}</h4>
      <p className="doctor-description">{description}</p>
    </div>
  );
};

// DoctorList Component
const DoctorList = () => {
  const doctors = [
    { name: "Dr. Arjun Gupta", specialty: "Neurologist", description: "I am an ambitious workaholic, but apart from that, pretty simple person.", imgSrc: bg1 },
    { name: "Dr. Priya Sharma", specialty: "Ophthalmologist", description: "I am an ambitious workaholic, but apart from that, pretty simple person.", imgSrc: doc2 },
    { name: "Dr. Karan Verma", specialty: "Dentist", description: "I am an ambitious workaholic, but apart from that, pretty simple person.", imgSrc: doc3 },
    { name: "Dr. Neha Singh", specialty: "Pediatrician", description: "I am an ambitious workaholic, but apart from that, pretty simple person.", imgSrc: doc4 },
    { name: "Dr. Aditi Patel", specialty: "Cardiologist", description: "I am an ambitious workaholic, but apart from that, pretty simple person.", imgSrc: doc5 },
    { name: "Dr. Rohan Mehta", specialty: "Orthopedic Surgeon", description: "I am an ambitious workaholic, but apart from that, pretty simple person.", imgSrc: doc6 },
    { name: "Dr. Varun Patel", specialty: "Dermatologist", description: "I am an ambitious workaholic, but apart from that, pretty simple person.", imgSrc: doc7 },
    { name: "Dr. Deepak Agarwal", specialty: "Endocrinologist", description: "I am an ambitious workaholic, but apart from that, pretty simple person.", imgSrc: doc8 }
];


  return (
    <div className="doctor-list">
      {doctors.map((doctor, index) => (
        <Doctor
          key={index}
          name={doctor.name}
          specialty={doctor.specialty}
          description={doctor.description}
          imgSrc={doctor.imgSrc}
        />
      ))}
    </div>
  );
};

export default DoctorList;
