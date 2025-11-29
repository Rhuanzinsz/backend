// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Rota para registar: POST http://localhost:3000/auth/register
router.post('/register', AuthController.registrar);

// Rota para login: POST http://localhost:3000/auth/login
router.post('/login', AuthController.login);

module.exports = router;