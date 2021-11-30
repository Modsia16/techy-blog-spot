const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blogpost, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const blogpostData = await Blogpost.findAll({
            where: {'user_id': req.session.user_id},
            include: [User],
        });
        const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain: true }));
        res.render('all-posts-admin', {
            layout: 'dash',
            blogposts,
        });
    } catch (err) {
        res.redirect('login');


        }
    });

router.get('/new', withAuth, (req, res) => {
    res.render('new-post-admin', {
        layout: 'dash',
    });
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const blogpost = await Blogpost.findByPk(req.params.id)
        if (blogpostData) {
            const blogpost = blogpostData.get({ plain: true });
            res.render('edit-post-admin', {
                layout: 'dash',
                blogpost,
            });
        } else {
            res.redirect('/dash');
        }
    } catch (err) {
        res.redirect('/login');
    }
});

module.exports = router;

    