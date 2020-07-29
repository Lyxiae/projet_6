const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');

const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

const app = express();

//Connection à la base de donnée MongoDB via mongoose
mongoose.connect('mongodb+srv://website_access:mejw8uY0uYuCKnrB@cluster0.ridn0.mongodb.net/pecocko?retryWrites=true&w=majority',
{useNewUrlParser: true,
useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'))

app.use(helmet());

//Configuration des headers pour éviter les erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//parser des données récupérées
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

//Importation des routes depuis sauces.js
app.use('/api/sauces', sauceRoutes);

//Importation des routes depuis user.js
app.use('/api/auth', userRoutes);

module.exports = app;