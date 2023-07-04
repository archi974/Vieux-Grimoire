const multer = require('multer');

// Configuration du stockage pour les images
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // Spécifiez le répertoire de destination où les images seront stockées
        callback(null, 'assets');
    },
    filename: (req, file, callback) => {
        // Retire les espaces dans le nom du fichier pour le récupérer
        const name = file.originalname.split(' ').join('_');
        // Générez un nom de fichier unique pour l'image téléchargée (par exemple, un horodatage)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // Utilisez l'extension d'origine de l'image
        const ext = file.originalname.split('.').pop();
        callback(null, name.split('.')[0] + '-' + uniqueSuffix + '.' + ext);
    },
});

// Créez l'objet Multer en utilisant la configuration de stockage pour une seule image
const upload = multer({ storage }).single('image');

module.exports = upload;