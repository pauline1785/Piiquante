/* CONTROLLERS UTILISATEURS */

// import du model user
const User =  require('../models/User');

// import package cryptage de mot de passe (à installer avant)
const bcrypt = require ('bcrypt');

// import du package pour les tokens (à installer avant)
const jwt = require('jsonwebtoken');


/* CONTROLLERS */

// fonction pour l'enregistrement de nouveaux utilisateurs
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) //req.body.passssword = récupération du mot de passe saisi dans le frontend, 10 = salt = le nombre de tour de l'algorithme pour sécurisé, plus on fait de tour plus c'est long
        // on récupère le mail et le hash du mot de passe pour créer un nouvel utilisateur
        .then(hash => { 
            const user = new User({
                email: req.body.email,
                password: hash
            });
            // on enregistre ce nouvel utilisateur dans la base de données
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        // s'il y a une erreur
        .catch(error => res.status(500).json({ error })); 
};

// fonction pour connecter des utilisateurs existants
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // findOne pour trouver l'utilisateur dans la base de données
        // vérifie si on a récupérer un user ou non dans la base
        .then(user => {
            // si on n'a pas trouvé de user
            if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            // si on a un user, on compare le mot de passe envoyé par le frontend et le mot de passe dans la base de données
            bcrypt.compare(req.body.password, user.password)
            // savoir si la comparaison des mots de passse est valable ou non 
            .then(valid => {
                // si ce n'est pas le bon mot de passe
                if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                // si la comparaison est bonne, on renvoit un objet json avec l'id de l'user et un token
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign( // fonction sign pour encoder un nouveau token
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET', // chaîne secrète de développement temporaire
                        { expiresIn: '24h' } // durée de validité du token
                    )
                });
            })
            // si il y a une erreur serveur
            .catch(error => res.status(500).json({ error }));
        })
        // si il y a un problème de connexion à la base de données
        .catch(error => res.status(500).json({ error }));
  };