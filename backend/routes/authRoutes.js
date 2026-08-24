const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected test route
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({
    message: 'You have access to the protected route',
    user: req.user,
  });
});

module.exports = router;
