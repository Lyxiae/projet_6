const mongoose = require('mongoose');

//Importation du plugin mongoose pour la vérification des mails uniques
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email:{ type: String, required: true, unique: true },
    password:{ type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema)