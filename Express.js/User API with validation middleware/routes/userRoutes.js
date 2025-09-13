const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/userController');
const validateUser = require('../middleware/validateUser');

// POST /api/users
router.post('/', validateUser, createUser);

module.exports = router;
