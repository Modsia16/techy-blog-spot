const router = require('express').Router();
const { User } = require('../../models');

//new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;
            res.json(newUser);
        });
    } catch (err) {
        res.status(500).send({ error: 'Registration failed' });
    }
});

//user login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        if (!user) {
            return res.status(401).send({ error: 'Login failed' });
        }   
        const isPasswordValid = await user.comparePassword(req.body.password);
        if (!isPasswordValid) {
            return res.status(401).send({ error: 'Login failed' });
        }
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;
            res.json({ user, message: 'successfully logged in' });
        });
    } catch (err) {
        res.status(500).send({ error: 'Login failed' });
    }
});

//user logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }   
});

module.exports = router;