import React, { useState } from 'react';

const PatientDetails = () => {
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');
  const [patients, setPatients] = useState([]); // State to store patients

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPatient = { patientName, age, gender, contact };
    setPatients([...patients, newPatient]); // Add new patient to the list
    // Reset form fields
    setPatientName('');
    setAge('');
    setGender('');
    setContact('');
  };

  return (<div>
  <div  id='patientDetails' className="new  d-flex align-items-center justify-content-center">
    <div  className=' login-form p-4 '>
      <h2>Add Patient Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Patient Name:</label>
          <input type="text" className="form-control" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Contact:</label>
          <input type="text" className="form-control" value={contact} onChange={(e) => setContact(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Patient Details</button>
      </form>
      </div>
      </div>
      {/* Display the list of patients */}
      <h3 className="mt-4">Patients List</h3>
      <ul className="list-group">
        {patients.map((patient, index) => (
          <li key={index} className="list-group-item">
            <div className="patient-detail"><strong>Name:</strong> {patient.patientName}</div>
            <div className="patient-detail"><strong>Age:</strong> {patient.age} years old</div>
            <div className="patient-detail"><strong>Gender:</strong> {patient.gender}</div>
            <div className="patient-detail"><strong>Contact:</strong> {patient.contact}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientDetails;
