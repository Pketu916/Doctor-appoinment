import React, { useState } from 'react';

const AddAppointment = () => {
  const [appointmentCounter, setAppointmentCounter] = useState(1); // Counter for generating appointment numbers
  const [patientName, setPatientName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [time, setTime] = useState('');
  const [doctor, setDoctor] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [sortBy, setSortBy] = useState('date'); // State for sorting criteria

  // Predefined time slots
  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
  ];

  // Predefined doctors
  const doctors = [
    'Dr. Smith',
    'Dr. Johnson',
    'Dr. Williams',
    'Dr. Jones',
    'Dr. Brown',
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
      <div id='addappointment' className="new d-flex align-items-center justify-content-center">
        <div className='login-form p-4'>
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
      </div>

      <div className="mt-4">
        <h3>Appointments List</h3>
        <div className="form-group">
          <label>Sort by:</label>
          <select className="form-control" value={sortBy} onChange={handleSortChange}>
            <option value="date">Date</option>
            <option value="time">Time</option>
            <option value="patientName">Patient Name</option>
          </select>
        </div>
        <ul className="list-group">
          {sortedAppointments.map((appointment, index) => (
            <li key={index} className="list-group-item">
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
