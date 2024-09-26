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
