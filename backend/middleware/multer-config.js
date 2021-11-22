/* MIDDLEWARE MULTER */

// import de multer
const multer = require('multer');

// dictionnaire pour les extensions des fichiers
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// objet de configiuration pour multer
const storage = multer.diskStorage({ // diskstorage = fonction pour dire qu'on l'enregistre sur le disque
    // destination = fonction qui dit à multer où sera enregistré les fichiers
    destination: (req, file, callback) => { 
        //  deux arguments : null = pas d'erreurs, images = le nom du dossier de destination
        callback(null, 'images');
    },
    // filename = explique à multer quel nom de fichier utilisé, pour ne pas avoir deux fois le même nom de fichier par exemple
    filename: (req, file, callback) => {
        // génération du nouveau nom, split et join permette de remplacer les espaces par des _ pour ne pas avoir d'erreurs dans le serveur
        const name = file.originalname.split(' ').join('_');
        // applique une extension aux fichiers
        const extension = MIME_TYPES[file.mimetype];
        // création du nom final du fichier
        callback(null, name + Date.now() + '.' + extension);
    }
});

// export du middleware
module.exports = multer({storage: storage}).single('image');