/* ROUTES UTILISATEURS */

// // import d'express et création d'un routeur pour implémenter des routes
const express = require('express');
const router = express.Router();

// import des controllers
const userCtrl = require('../controllers/user');

// routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);


module.exports = router;