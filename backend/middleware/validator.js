exports.validateUser = (req, res, next) => {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Email invalide' });
    }
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Mot de passe invalide' });
    }
    next();
}