const User = require("../models/userModel");
const bcrypt = require("bcrypt");

async function UserLogin(req, res) {
    try {
        const { email, password } = req.body;
        console.log('Tentative de connexion pour l\'utilisateur avec l\'email:', email);
        
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json("Email ou mot de passe incorrect !");
        }

        const result = await bcrypt.compare(password, user.password);

        if (result) {
            if (user.lockUntil && user.lockUntil >= Date.now()) {
                return res.status(401).json("Le compte est verrouillé pendant 2 MIN !!!");
            }

            user.loginAttempts = 0;
            user.lockUntil = undefined;
            await user.save();

            console.log('Connexion réussie pour l\'utilisateur avec l\'email:', email);
            return res.status(200).send("Connexion réussie");
        } else {
            user.loginAttempts++;
            if (user.loginAttempts >= 3) {
                user.lockUntil = Date.now() + 20 * 60 * 1000;
            }
            await user.save();
            return res.status(401).json("Email ou mot de passe incorrect !");
        }
    } catch (error) {
        console.error('Erreur lors de la tentative de connexion:', error);
        return res.status(500).json("Erreur lors de la tentative de connexion");
    }
}

module.exports = {
    UserLogin
};
