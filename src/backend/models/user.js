// backend/models/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },   // Add name
  phone: { type: String, required: true },  // Add phone number
  email: { type: String, required: true }   // Add email
});

const User = mongoose.model('User', userSchema);
module.exports = User;
