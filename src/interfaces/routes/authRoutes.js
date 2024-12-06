const express = require('express');
const container = require('../../shared/container');

const router = express.Router();
const authController = container.resolve('authController');

router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));

module.exports = router;