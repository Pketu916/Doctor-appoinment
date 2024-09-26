// /home/ketu/doctor-appointment/src/backend/models/Appointment.js

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    appointmentNumber: { type: String, required: true },
    patientName: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    doctor: { type: String, required: true }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
