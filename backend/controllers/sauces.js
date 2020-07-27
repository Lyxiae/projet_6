const Sauce = require('../models/Sauce');

//Importation du système de gestion de fichiers file system de Node
const fs = require('fs');

//Logique métier pour createSauce, créer une sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    console.log(sauceObject);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce créée !' }))
    .catch(error => res.status(400).json({ error }));
};

//Logique métier pour addLikeDislike pour ajouter un j'aime ou un j'aime pas sur une sauce.
exports.addLikeDislike = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        const userId = req.body.userId;
        const userWantsToLike = (req.body.like === 1);
        const userWantsToDislike = (req.body.like === -1);
        const userWantsToCancel = (req.body.like === 0);
        const userCanLike = (!sauce.usersLiked.includes(userId));
        const userCanDislike = (!sauce.usersDisliked.includes(userId));
        const notTheFirstVote = (sauce.usersLiked.includes(userId) || sauce.usersDisliked.includes(userId));

        let lastAction = 'none';
        if (sauce.usersLiked.includes(userId)) {
            lastAction = 'liked';
        }

        if (sauce.usersDisliked.includes(userId)) {
            lastAction = 'disliked';
        }

        if (userWantsToLike && userCanLike) {sauce.usersLiked.push(userId)};
        if (userWantsToDislike && userCanDislike) {sauce.usersDisliked.push(userId)};

        if (userWantsToCancel && notTheFirstVote) {
            if  (sauce.usersLiked.includes(userId)) {
                let index = sauce.usersLiked.indexOf(userId);
                sauce.usersLiked.splice(index, 1);
            } else {
                let index = sauce.usersDisliked.indexOf(userId);
                sauce.usersDisliked.splice(index, 1);
            }
            
        }
        sauce.likes = sauce.usersLiked.length;
        sauce.dislikes = sauce.usersDisliked.length;
        const updatedSauce = sauce;
        updatedSauce.save();
        return updatedSauce;
    })
    .then(sauce => res.status(200).json(sauce))
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