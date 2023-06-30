const Book = require('../models/Book');

exports.createBook = (req, res) => {
    
    const { userId, title, author, year, genre } = req.body;
    const imageUrl = req.file.path;
    
    const book = new Book({
        userId,
        title,
        author,
        imageUrl,
        year,
        genre,
        ratings: [],
        averageRating: 0
    });

    book.save()
        .then(() => res.status(201).json({ message: 'Livre créé avec succès.' }))
        .catch(error => res.status(400).json({ message: 'Une erreur est survenue lors de la création du livre.', error }));

};