import React, { useState } from 'react';
import { Collapse } from "react-bootstrap";

const AddAppointment = () => {
  const [appointmentCounter, setAppointmentCounter] = useState(1); // Counter for generating appointment numbers
  const [patientName, setPatientName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [time, setTime] = useState('');
  const [doctor, setDoctor] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [sortBy, setSortBy] = useState('date'); // State for sorting criteria
  const [isChecked, setIsChecked] = useState(false);

  // Predefined time slots
  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
  ];

  // Updated doctors list
  const doctors = [
    'Dr. Arjun Gupta, Neurologist',           // Male
    'Dr. Aditi Patel, Neurologist',          // Female
    'Dr. Priya Sharma, Ophthalmologist',      // Female
    'Dr. Rohan Mehta, Ophthalmologist ',    // Male
    'Dr. Karan Verma, Dentist',               // Male
    'Dr. Varun Patel, Dentist',            // Male
    'Dr. Neha Singh, Pediatrician',           // Female
    'Dr. Deepak Agarwal, Pediatrician'        // Female
  ];
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointmentNumber = `AP${appointmentCounter.toString().padStart(4, '0')}`; // Generate appointment number
    const newAppointment = { appointmentNumber, patientName, date, time, doctor };
    setAppointments([...appointments, newAppointment]);
    setAppointmentCounter(appointmentCounter + 1); // Increment counter for next appointment number
    // Reset form fields
    setPatientName('');
    setDate(new Date().toISOString().split('T')[0]); // Reset to today
    setTime('');
    setDoctor('');
  };

  const handleDelete = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortedAppointments = [...appointments].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time);
    }
    if (sortBy === 'time') {
      return new Date('1970-01-01 ' + a.time) - new Date('1970-01-01 ' + b.time);
    }
    return a.patientName.localeCompare(b.patientName);
  });

  return (
    <div>
      <div id="addappointment" className="container-fluid d-flex align-items-center flex-column">
        <div className="row">
          <div className="homeset col-md-6 d-flex flex-column justify-content-center">
            <h2 className="your-health mb-4">Schedule Your Healing</h2>
            <p className="pa mb-4">
            Navigate the enchanted forest of appointments with ease. Choose your date, time, and doctor, and set your path to better health with just a few clicks.
            </p>
            <div className="btnset">
            <button type="button" id="homeButton" className="btn btn-primary mx-2">
              Home
            </button>
            <button
              type="button"
              id="addAppointmentButton"
              className="btn btn-secondary mx-2"
              onClick={() => {
                setIsChecked(prev => !prev); // Toggle the isChecked state
              }}
              aria-controls="example-collapse-text"
              aria-expanded={isChecked} // Reflect the state in aria-expanded attribute
            >
              {isChecked ? "Hide Form" : "Add Appointment"}
            </button>
            </div>
          </div>
        </div>
      </div>
      <div className="new1 d-flex align-items-center justify-content-center">
        <Collapse in={isChecked}>
          <div id="example-collapse-text" className="login-form login-form-width custom-collapse">

            <h2>Add New Appointment</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Appointment Number:</label>
                <input type="text" className="form-control" value={`AP${appointmentCounter.toString().padStart(4, '0')}`} disabled />
              </div>
              <div className="form-group">
                <label>Patient Name:</label>
                <input type="text" className="form-control" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Date:</label>
                <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Time:</label>
                <select className="form-control" value={time} onChange={(e) => setTime(e.target.value)} required>
                  <option value="">Select Time Slot</option>
                  {timeSlots.map((slot, index) => (
                    <option key={index} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Doctor:</label>
                <select className="form-control" value={doctor} onChange={(e) => setDoctor(e.target.value)} required>
                  <option value="">Select Doctor</option>
                  {doctors.map((doc, index) => (
                    <option key={index} value={doc}>{doc}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Add Appointment</button>
            </form>
          </div>

        </Collapse>
      </div>
      <div className="mainlist">
        <h3>Appointments List</h3>
        <div className='sort'>
          <div>
          <label>Sort by:</label>
          <select className="form-control" value={sortBy} onChange={handleSortChange}>
            <option value="date">Date</option>
            <option value="time">Time</option>
            <option value="patientName">Patient Name</option>
          </select>
          </div>
        </div>
        <ul className="listtable">
          {sortedAppointments.map((appointment, index) => (
            <li key={index} className="list">
              <div className="appointment-detail"><strong>Appointment Number:</strong> {appointment.appointmentNumber}</div>
              <div className="appointment-detail"><strong>Patient Name:</strong> {appointment.patientName}</div>
              <div className="appointment-detail"><strong>Doctor:</strong> {appointment.doctor}</div>
              <div className="appointment-detail"><strong>Date:</strong> {appointment.date}</div>
              <div className="appointment-detail"><strong>Time:</strong> {appointment.time}</div>
              <button className="btn btn-sm" onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddAppointment;
