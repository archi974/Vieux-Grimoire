const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: '.env.local'})
const path = require('path');

const userController = require('./controllers/userController');
const bookController = require('./controllers/bookController');
const { upload, optimizedImg } = require('./middleware/multer-config');
const auth = require('./middleware/auth');
const verification = require('./middleware/validator');

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWD}@${process.env.DB_CLUSTER}.mongodb.net/book-notation?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
})

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD')
    next();
})

app.use(express.json());

app.post('/api/auth/signup', verification.validateUser, userController.createUser);
app.post('/api/auth/login', userController.loginUser);
app.post('/api/books', auth, upload, optimizedImg, bookController.createBook);
app.get('/api/books', bookController.readAllBook);
app.get('/api/books/bestrating', bookController.getBestThreeBook);
app.get('/api/books/:id', bookController.readOneBook);
app.put('/api/books/:id', auth, upload, optimizedImg, bookController.updateOneBook);
app.delete('/api/books/:id', bookController.deleteOneBook);
app.post('/api/books/:id/rating', bookController.addRatingBook);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

module.exports = app;