/* MIDDLEWARE D'AUTHENTIFICATION */

// import le package qui vérifie les tokens
const jwt = require('jsonwebtoken');

// export du middleware
module.exports = (req, res, next) => {
    try {
        // récupération du token dans le header de la requête, ça nous retourne un tableu et on récupère le deuxième élément du tableau (le 1)
        const token = req.headers.authorization.split(' ')[1];
        // décoder le token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // récupération de l'user Id dans le décodage du tokken (qui est un objet js)
        const userId = decodedToken.userId;
        // si on a un user Id dans le body de la requête et qu'il est différent de l'user id du token
        if (req.body.userId && req.body.userId !== userId) {
        throw 'Invalid user ID';
        // si l'user Id du body correspond à celui du token, on passe au prochain middleware
        } else {
        next();
        }
    } catch {
        res.status(401).json({
        error: new Error('Invalid request!')
        });
    }
};