const Book = require('../models/Book');
const fs = require('fs');

exports.createBook = (req, res) => {
    const bookObject = JSON.parse(req.body.book);

    const book = new Book({
        ...bookObject,
        imageUrl: `${req.protocol}://${req.get("host")}/${req.file.path}`
    });

    book.save()
        .then(() => res.status(201).json({ message: 'Livre créé avec succès.' }))
        .catch(error => res.status(500).json({ message: 'Une erreur est survenue lors de la création du livre.', error }));

};

exports.readAllBook = (req, res) => {
    Book.find()
        .then(books => {
            res.status(200).json(books);
        })
        .catch(error => {
            res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des livres.', error });
        });
}

exports.readOneBook = (req, res) => {
    Book.findOne({ _id: req.params.id })
        .then(book => {
            res.status(200).json(book);
        })
        .catch(error => {
            res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des livres.', error });
        });
}

exports.getBestThreeBook = (req, res) => {
    Book.find().sort({ averageRating: -1 }).limit(3)
        .then(books => {
            res.status(200).json(books);
        })
        .catch(error => {
            res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des livres.', error });
        });
}

exports.deleteOneBook = (req, res) => {
    const bookId = req.params.id;

    Book.deleteOne({ _id: bookId })
        .then(deletedBook => {
            if (deletedBook) {
                const imagePath = deletedBook.imageUrl;
                fs.unlink(imagePath, err => {
                    if (err) {
                        console.error(err);
                    }
                });
                res.status(200).json({ message: 'Livre supprimé avec succès.' });
            } else {
                // Aucun livre trouvé avec l'ID spécifié
                res.status(404).json({ message: 'Aucun livre trouvé avec cet ID.' });
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du livre.', error });
        });
}

exports.addRatingBook = (req, res) => {
    console.log("Route : /api/books/:id/rating ajout d'une étoile");
}

exports.updateOneBook = (req, res) => {
    console.log("PUT");
    console.log(Book);
}