// /home/ketu/doctor-appointment/src/backend/routes/appointmentRoutes.js

const express = require('express');
const Appointment = require('../models/Appointment');
const router = express.Router();

// Create a new appointment
router.post('/', async (req, res) => {
  const { appointmentNumber, patientName, date, time, doctor } = req.body;

  const appointment = new Appointment({
    appointmentNumber,
    patientName,
    date,
    time,
    doctor
  });

  try {
    const savedAppointment = await appointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete appointment by ID
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment', error });
  }
});

module.exports = router;

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
