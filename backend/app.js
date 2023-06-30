const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: '.env.local'})
// const Book = require('./models/Book');
const User = require('./models/User');

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
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD')
    next();
})

app.use(express.json());

app.post('/api/auth/signup', (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    user.save()
    .then(() => res.status(201).json({message: 'registered user'}))
    .catch((error) => res.status(400).json({message: "Error with post sign-up : " + error}))
})

module.exports = app;