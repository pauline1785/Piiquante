/* ROUTES SAUCE */

// import d'express et création d'un routeur pour implémenter des routes
const express = require('express');
const router = express.Router();

// import des controllers
const sauceCtrl = require('../controllers/sauce');

// import du middleware d'authentification
const auth = require ('../middleware/auth');

// import du middleware multer
const multer = require('../middleware/multer-config');

// routes
router.post('/', auth, multer, sauceCtrl.createSauce); 
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeOrDislikeSauce);

module.exports = router;