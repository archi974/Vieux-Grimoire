const User = require('../models/User');

exports.createUser = (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    user.save()
    .then(() => res.status(201).json({message: 'registered user'}))
    .catch((error) => res.status(400).json({message: "Error with post sign-up : " + error}))
};

// exports.readUser = (req, res) => {

// }