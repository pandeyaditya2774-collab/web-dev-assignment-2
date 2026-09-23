const express = require('express');
const students = require('../data/students');

const router = express.Router();

const isValidText = (value) => typeof value === 'string' && value.trim() !== '';

router.get('/', (req, res) => {
  res.status(200).json(students);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID must be a number' });
  }

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  res.status(200).json(student);
});

router.post('/', (req, res) => {
  const { name, course } = req.body;

  if (!isValidText(name) || !isValidText(course)) {
    return res.status(400).json({ message: 'Name and course are required' });
  }

  const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;
  const newStudent = { id: newId, name: name.trim(), course: course.trim() };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, course } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID must be a number' });
  }

  if (!isValidText(name) || !isValidText(course)) {
    return res.status(400).json({ message: 'Name and course are required' });
  }

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  student.name = name.trim();
  student.course = course.trim();

  res.status(200).json(student);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID must be a number' });
  }

  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }

  const deleted = students.splice(index, 1)[0];
  res.status(200).json({ message: 'Student deleted', student: deleted });
});

module.exports = router;
