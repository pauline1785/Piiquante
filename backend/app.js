// importer Express
const express = require('express');

// appel de la méthode express() pour créer une application express
const app = express();



// import des routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//import de path pour donner accès au chemin de notre système de fichier
const path = require('path'); 

// import de mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://pauline:melvenn@cluster0.r4f55.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


/* MIDDLEWARE */

// middleware pour contourner les erreurs de CORS. app.use traite toutes les sortes de requêtes (GET, POST,...)
app.use((req, res, next) => {
    // permet d'accéder à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    // permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // permet d'envoyer des requêtes avec les méthiodes mentionnées (GET, ...)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    // appeler next pour passer au middleware suivant
    next(); 
  });

// middlaware pour transformer le corps de la requête en JSON. Il est pour toutes les routes de l'application
app.use(express.json());

// middleware pour dire à l'application de se servir du dossier images
app.use('/images', express.static(path.join(__dirname, 'images')));


// on utilise une seule route qui va chercher les routeurs qui contient toutes les routes
app.use('/api/sauce', sauceRoutes);
app.use('/api/auth', userRoutes);

// exportation de la const app pour y accéder depuis les autres fichiers du projet
module.exports = app;