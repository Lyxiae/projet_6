const express = require('express');
const router = express.Router();

//Importation du modèle/schéma user
const User = require('../models/User');

//Importation des logiques métier pour les routes
const userCtrl = require('../controllers/user');

//Route POST pour l'inscription d'un utilisateur
router.post('/signup', userCtrl.signup);

//Route POST pour la connexion d'un utilisateur
router.post('/login', userCtrl.login);

module.exports = router;