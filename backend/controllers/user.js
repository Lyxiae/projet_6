const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Importation du schéma/modèle User
const User = require('../models/User');

//Inscription
exports.signup = (req, res, next) => {
    //Hash le mot de passe à partir du password donné dans la requête, effectue l'opération 10 fois
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        //Crée l'objet user d'après le modèle User avec l'email dela requête et la version hash du password
        const user = new User({
            email: req.body.email,
            password: hash,
        });
        //Enregistre l'objet user avec renvoi d'erreur si ça ne fonctionne pas, et statut 201 de création si ça fonctionne
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
            .catch(error => res.status(409).json({ message: 'Cette adresse mail est déjà utilisée'}));
    })
    //Renvoi d'erreur 500 si le hash ne fonctionne pas
    .catch(error => res.status(500).json({ error }));
};

//Connexion
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        //S'il n'existe pas, on renvoie une erreur
        if(!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }
        //S'il existe, on compare le hash du mot de passe avec celui du password enregistré via bcrypt
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !'});
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    `${process.env.JWT_KEY}`,
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
}