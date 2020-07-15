const express = require('express');
const router = express.Router();

//Importation du modèle/schéma Sauce
const Sauce = require('../models/Sauce');

//Importation des controllers / logiques métier
const sauceCtrl = require('../controllers/sauces');

// Route POST, pour ajouter une sauce
router.post('/', sauceCtrl.createSauce);

//Route GET, pour avoir la liste des sauces
router.get('/', sauceCtrl.getAllSauces);

//Route GET, pour avoir les informations d'une sauce
router.get('/:id', sauceCtrl.getOneSauce);

// //Route PUT, pour modifier une sauce créée
// router.put('/:id', sauceCtrl.modifySauce);

// //Route DELETE, pour supprimer une sauce
// router.delete('/', sauceCtrl.deleteSauce);

module.exports = router;