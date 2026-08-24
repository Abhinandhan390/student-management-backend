const Student = require('../models/student');

// Create a new student
const createStudent = async (req, res) => {
  try {
    const { name, email, usn, department, semester, section } = req.body;

    // Check required fields
    if (!name || !email || !usn || !department || !semester || !section) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }

    // Check if email already exists
    const existingEmail = await Student.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        message: 'Student with this email already exists',
      });
    }

    // Check if USN already exists
    const existingUsn = await Student.findOne({ usn });

    if (existingUsn) {
      return res.status(400).json({
        message: 'Student with this USN already exists',
      });
    }

    // Create student
    const student = await Student.create({
      name,
      email,
      usn,
      department,
      semester,
      section,
    });

    res.status(201).json({
      message: 'Student created successfully',
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

// Get all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json({
      message: 'Students retrieved successfully',
      students,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};
// Get a single student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: 'Student not found',
      });
    }

    res.status(200).json({
      message: 'Student retrieved successfully',
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};
// Update a student
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({
        message: 'Student not found',
      });
    }

    res.status(200).json({
      message: 'Student updated successfully',
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};
// Delete a student
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: 'Student not found',
      });
    }

    res.status(200).json({
      message: 'Student deleted successfully',
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
