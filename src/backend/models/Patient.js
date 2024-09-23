const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  caseNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String },
  phone: { type: String, required: true },
  email: { type: String },
  emergencyContact: { type: String, required: true },
  pastDiagnoses: { type: String },
  surgeries: { type: String },
  allergies: { type: String },
  currentMedications: { type: String },
  appointmentDate: { type: Date },
  doctorName: { type: String },
  insuranceProvider: { type: String },
  policyNumber: { type: String },
  coverageDetails: { type: String },
  doctorsNotes: { type: String },
  patientNotes: { type: String },
  additionalObservations: { type: String }
});

module.exports = mongoose.model('Patient', patientSchema);
