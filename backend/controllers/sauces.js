const Sauce = require('../models/Sauce');

//Importation du système de gestion de fichiers file system de Node
const fs = require('fs');


//Logique métier pour createSauce, créer une sauce
exports.createSauce = (req, res, next) => {
    console.log(req.body);
    const sauceObject = req.body;
    console.log(sauceObject);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject
    });
    console.log(sauce);
    sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce créée !' }))
    .catch(error => res.status(400).json({ error }));
};

//Logique métier pour deleteSauce, supprime une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce Supprimée !' }))
    .catch(error => res.status(500).json({ error }));
}

//Logique métier pour getAllSauces, obtient les informations de toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

//Logique métier pour getOneSauce, obtient les informations d'une sauce d'après son id.
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

//Logique métier pour modifySauce, modifie les informations d'une sauce
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.body;
    console.log(req.body);
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id})
    .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
    .catch(error => res.status(400).json({ error }));
}

