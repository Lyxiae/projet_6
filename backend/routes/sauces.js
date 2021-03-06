const express = require('express');
const router = express.Router();

//Importation du middleware d'authentification
const auth = require('../middleware/auth');

//Importation du middleware de configuration de multer
const multer = require('../middleware/multer-config');

//Importation des controllers / logiques métier
const sauceCtrl = require('../controllers/sauces');

// Route POST, pour ajouter une sauce
router.post('/', auth, multer, sauceCtrl.createSauce);

//Route POST pour les likes/dislikes
router.post('/:id/like', auth, sauceCtrl.addLikeDislike);

//Route PUT, pour modifier une sauce créée
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

//Route DELETE, pour supprimer une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);

//Route GET, pour avoir la liste des sauces
router.get('/', auth, sauceCtrl.getAllSauces);

//Route GET, pour avoir les informations d'une sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);

module.exports = router;