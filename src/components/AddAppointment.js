import React, { useState } from 'react';
// import './AddAppointment.css'; // Ensure this file exists in the correct path

const AddAppointment = () => {
  const [patientName, setPatientName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [time, setTime] = useState('');
  const [doctor, setDoctor] = useState('');
  const [appointments, setAppointments] = useState([]);

  // Predefined time slots
  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = { patientName, date, time, doctor };
    setAppointments([...appointments, newAppointment]);
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

  return ( <div>
      <div id='addappointment' className="new d-flex align-items-center justify-content-center">
      <div  className=' login-form p-4 '>
        <h2>Add New Appointment</h2>
        <form onSubmit={handleSubmit}>
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
            <input type="text" className="form-control" value={doctor} onChange={(e) => setDoctor(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">Add Appointment</button>
        </form>
      </div>
      </div>
      {/* Display the list of appointments */}
      <h3 className="mt-4">Appointments List</h3>
      <ul className="list-group">
        {appointments.map((appointment, index) => (
          <li key={index} className="list-group-item">
            <div className="appointment-detail"><strong>Patient Name:</strong> {appointment.patientName}</div>
            <div className="appointment-detail"><strong>Doctor:</strong> {appointment.doctor}</div>
            <div className="appointment-detail"><strong>Date:</strong> {appointment.date}</div>
            <div className="appointment-detail"><strong>Time:</strong> {appointment.time}</div>
            <button className="btn btn-sm " onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddAppointment;
