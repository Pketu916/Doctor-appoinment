const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const adminRoutes = require('./routes/admin'); 

const app = express(); 
app.use(express.json()); 
app.use(cors()); 

mongoose.connect('mongodb+srv://pketu916:9265@cluster0.lyp2n.mongodb.net/hospitalDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

app.use('/api/admin', adminRoutes); 

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
