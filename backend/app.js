// importer d'Express
const express = require('express');

// import de mongoose
const mongoose = require('mongoose');

//import de path pour donner accès au chemin de notre système de fichier
const path = require('path'); 

// import des routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// charge les variables d'environnement  pour se connecter à la BDD
require('dotenv').config();

mongoose.connect(process.env.DB_URL,
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

// appel de la méthode express() pour créer une application express
const app = express();



// middleware pour contourner les erreurs de CORS. app.use traite toutes les sortes de requêtes (GET, POST,...)
app.use((req, res, next) => {
    // permet d'accéder à l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    // permet d'ajouter les headers mentionnés aux requêtes envoyées vers l'API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // permet d'envoyer des requêtes avec les méthodes mentionnées (GET, ...)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    // appeler next pour passer au middleware suivant
    next(); 
  });

// middlaware pour transformer le corps de la requête en JSON. Il est pour toutes les routes de l'application
app.use(express.json());

// middleware pour dire à l'application de se servir du dossier images
app.use('/images', express.static(path.join(__dirname, 'images')));

// on utilise une seule route qui va chercher les routeurs qui contient toutes les routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

// exportation de la const app pour y accéder depuis les autres fichiers du projet
module.exports = app;