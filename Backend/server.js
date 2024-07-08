const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const studentRoutes = require('./Routes');
const mongoURI = 'mongodb://localhost:27017/student-performance';

// Connect to MongoDB
mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error: ', err));

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/students', studentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
