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
        // Utilisez l'extension d'origine de l'image
        const ext = MIME_TYPES[file.mimetype];
        callback(null, name.split('.')[0] + Date.now() + '.' + ext);
    }
}); // Utilisez multer.memoryStorage() pour stocker l'image en mémoire RAM

// Créez l'objet Multer en utilisant la configuration de stockage pour une seule image
const upload = multer({ storage }).single('image');

// Middleware pour redimensionner, compresser et convertir l'image et l'enregistrer sur le disque
const optimizedImg = (req, res, next) => {
    if (!req.file) {
        return next();
    }
    
    const { originalname } = req.file;
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `${originalname.split('.')[0]}_${uniqueSuffix}.webp`;

    sharp(req.file.buffer)
        .resize(400, 500, { fit: 'inside' })
        .webp({ quality: 80 })
        .toFile(`assets/${filename}`)
        .then(() => {
            // Mettre à jour le nom de fichier dans req.file
            req.file.filename = filename;
            next();
        })
        .catch((error) => {
            console.error("Une erreur est survenue lors du traitement de l'image :", error);
            next();
        });
};

module.exports = { upload, optimizedImg };