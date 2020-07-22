const express = require('express');
const router = express.Router();

//Importation des logiques métier pour les routes
const userCtrl = require('../controllers/user');

//Importation du middleware verifyPassword pour la vérification de la complexité du mot de passe
const verifyPassword = require('../middleware/verifyPassword');

//Route POST pour l'inscription d'un utilisateur
router.post('/signup', verifyPassword, userCtrl.signup);

//Route POST pour la connexion d'un utilisateur
router.post('/login', userCtrl.login);

module.exports = router;