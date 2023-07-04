const Book = require('../models/Book');

exports.createBook = (req, res) => {
    const bookObject = JSON.parse(req.body.book);

    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/${req.file.path}`,
        ratings: [],
        averageRating: 0
    });

    book.save()
        .then(() => res.status(201).json({ message: 'Livre créé avec succès.' }))
        .catch(error => res.status(400).json({ message: 'Une erreur est survenue lors de la création du livre.', error }));

};