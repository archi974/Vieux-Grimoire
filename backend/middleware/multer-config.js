const multer = require('multer');
const sharp = require('sharp');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
  };

// Configuration du stockage pour les images
const storage = multer.memoryStorage({
    filename: (req, file, callback) => {

        const name = file.originalname.split(' ').join('_');
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // Utilisez l'extension d'origine de l'image
        const ext = MIME_TYPES[file.mimetype];
        const filename = name.split('.')[0] + '-' + uniqueSuffix + '.' + ext
        callback(null, filename);
    }
}); // Utilisez multer.memoryStorage() pour stocker l'image en mémoire


// Créez l'objet Multer en utilisant la configuration de stockage pour une seule image
const upload = multer({ storage }).single('image');

// Middleware pour redimensionner, compresser et convertir l'image
const optimizedImg = (req, res, next) => {
    if (!req.file) {
        return next();
    }
    
    sharp(req.file.buffer)
    .resize(400, 500)
    .webp({ quality: 80 })
    .toFile('assets/' + req.file.filename)
    .then(() => {
        next();
    })
    .catch((error) => {
        console.error("Une erreur est survenue lors du traitement de l'image :", error);
        next();
    });
};

module.exports = { upload, optimizedImg };