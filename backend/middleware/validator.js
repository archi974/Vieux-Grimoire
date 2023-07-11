exports.validateUser = (req, res, next) => {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Email invalide' });
        return;
    }
    if (!passwordRegex.test(password)) {
        res.status(400).json({ message: 'Mot de passe invalide' });
        return;
    }
    next();
}