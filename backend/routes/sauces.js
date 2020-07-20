const express = require('express');
const router = express.Router();



//Importation du modèle/schéma Sauce
const Sauce = require('../models/Sauce');

//Importation du middleware d'authentification
const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

//Importation des controllers / logiques métier
const sauceCtrl = require('../controllers/sauces');

// Route POST, pour ajouter une sauce
router.post('/', auth, multer, sauceCtrl.createSauce);

//Route PUT, pour modifier une sauce créée
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

//Route DELETE, pour supprimer une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);

//Route GET, pour avoir la liste des sauces
router.get('/', auth, sauceCtrl.getAllSauces);

//Route GET, pour avoir les informations d'une sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);

module.exports = router;