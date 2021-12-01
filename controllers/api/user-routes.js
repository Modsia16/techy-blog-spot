const router = require('express').Router();
const { User } = require('../../models');

//new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

//user login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });
            if (!userData) {
                res.status(400).json({
                    message: 'Incorrect username or password'
                });
                return;
            }

            const validPassword = await userData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({
                    message: 'Incorrect username or password'
                });
                return;
            }
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.loggedIn = true;
                res.json({ user: userData, message: 'You are now logged in'});
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).json({ message: 'You are now logged out' });
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;