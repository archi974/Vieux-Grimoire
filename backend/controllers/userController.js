const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' })

exports.createUser = (req, res) => {
    const { email, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        const user = new User({
            email: email,
            password: hashedPassword
        });
        user.save()
            .then(() => res.status(201).json({ message: 'registered user' }))
            .catch((error) => res.status(400).json({ message: "Error with post sign-up : " + error }))
    })
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.status(200).json({ token, userId: user._id, email: user.email });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}