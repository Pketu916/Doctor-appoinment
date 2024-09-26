// /home/ketu/doctor-appointment/src/backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoutes = require('./routes/admin');
const patientRoutes = require('./routes/patientRoutes'); // Import patient routes
const appointmentRoutes = require('./routes/appointmentRoutes'); // Import appointment routes

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://pketu916:9265@cluster0.lyp2n.mongodb.net/hospitalDB?retryWrites=true&w=majority')
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// Use admin, patient, and appointment routes
app.use('/api/admin', adminRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes); // Use appointment routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});