const Book = require('../models/Book');
const fs = require('fs');

exports.createBook = (req, res) => {
    const bookObject = JSON.parse(req.body.book);

    const yearRegex = /^(18[0-9]{2}|19[0-9]{2}|20[0-9]{2}|2100)$/;
    const year = bookObject.year.toString();
    if (!yearRegex.test(year)) {
        return res.status(400).json({ message: "L'année doit être un nombre de 4 chiffres entre 1800 et 2100." });
    }

    const book = new Book({
        ...bookObject,
        year: parseInt(year, 10),
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

exports.updateOneBook = (req, res) => {
    const bookObject = req.file ?
        {
            ...JSON.parse(req.body.book),
            imageUrl: `${req.protocol}://${req.get("host")}/${req.file.path}`,
        } : { ...req.body, };
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                return res.status(404).json({ message: "Livre non trouvé." });
            }
            const imagePath = book.imageUrl.split('/assets/')[1];
            fs.unlink(`assets/${imagePath}`, () => {
                Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
                    .then(res.status(200).json({ message: 'Livre modifié! ' }))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch((error) =>
            res.status(500).json({
                message: "Une erreur est survenue lors de la mise à jour du livre.",
                error,
            })
        );
};

exports.deleteOneBook = (req, res) => {
    const bookId = req.params.id;

    Book.findOne({ _id: bookId })
        .then(book => {
            if (!book) {
                return res.status(404).json({ message: 'Aucun livre trouvé avec cet ID.' });
            }

            const imagePath = book.imageUrl.split('/assets/')[1];
            fs.unlink(`assets/${imagePath}`, () => {
                Book.deleteOne({ _id: bookId })
                    .then(() => {
                        res.status(200).json({ message: 'Livre supprimé avec succès.' });
                    })
                    .catch(err => {
                        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du livre.', err });
                    });
            });
        })
        .catch(error => {
            res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du livre.', error });
        });
}

exports.addRatingBook = (req, res) => {
    const ratingObject = req.body;
    ratingObject.grade = ratingObject.rating;
    delete ratingObject.rating;

    Book.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { ratings: ratingObject } },
        { new: true }
    )
        .then((updatedBook) => {
            if (!updatedBook) {
                return res.status(404).json({ message: "Livre inconnu" });
            }

            // Calculer la nouvelle moyenne des notes
            const totalRatings = updatedBook.ratings.length;
            const totalGrade = updatedBook.ratings.reduce(
                (acc, rating) => acc + rating.grade,
                0
            );
            const averageRating = totalGrade / totalRatings;

            // Mettre à jour la moyenne des notes dans le livre
            updatedBook.averageRating = averageRating;

            // Sauvegarder les modifications du livre
            updatedBook.save()
                .then((savedBook) => {
                    res.status(200).json(savedBook);
                })
                .catch((error) => {
                    res.status(500).json({ message: "Erreur lors de la sauvegarde du livre", error });
                });
        })
        .catch((error) => {
            res.status(500).json({ message: "Erreur lors de la mise à jour du livre", error });
        });
};