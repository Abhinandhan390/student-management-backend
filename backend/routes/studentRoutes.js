const express = require('express');

const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create a student
router.post('/', authMiddleware, createStudent);

// Get all students
router.get('/', authMiddleware, getStudents);

// Get one student by ID
router.get('/:id', authMiddleware, getStudentById);

// Update a student
router.put('/:id', authMiddleware, updateStudent);

// Delete a student
router.delete('/:id', authMiddleware, deleteStudent);

module.exports = router;
