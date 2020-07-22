const passwordSchema = require('../models/Password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        console.log('mot de passe trop simple');
        res.status(400).json({error: 'mot de passe trop simple!' });
    } else {
        next();
    }
};