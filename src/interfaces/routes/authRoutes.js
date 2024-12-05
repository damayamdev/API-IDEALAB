const express = require('express');
const AuthController = require('../controllers/AuthController');
const MySQLUserRepository = require('../../infrastructure/repositories/MySQLUserRepository');

const router = express.Router();
const userRepository = new MySQLUserRepository();
const authController = new AuthController(userRepository);

router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));

module.exports = router;