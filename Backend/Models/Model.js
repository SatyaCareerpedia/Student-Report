const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  communication: [{
    title: String,
    score: Number
  }],
  interviews: [{
    date: {
      type: Date,
      default: Date.now
    },
    comments: String,
    score: Number
  }],
  projects: [{
    title: String,
    score: Number
  }]
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
