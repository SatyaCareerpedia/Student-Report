const express = require('express');
const router = express.Router();
const Student = require('./Models/Model'); 

router.post('/add', async (req, res) => {
  try {
    const { name, communication, interviews, projects } = req.body;
    const student = new Student({
      name,
      communication,
      interviews,
      projects
    });
    const savedStudent = await student.save();
    res.status(201).json(savedStudent); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to update a student by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, communication, interviews, projects } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(id, {
      name,
      communication,
      interviews,
      projects
    }, { new: true }); 
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to delete a student by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndRemove(id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
