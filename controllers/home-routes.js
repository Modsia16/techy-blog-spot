const sequelize = require('../config/connection');
const router = require('express').Router();
const { Blogpost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//home page posts
router.get('/', async (req, res) => {
try {
  const blogpostData = await Blogpost.findAll({
    include: [User],
  });
  const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain: true }));
  res.render('all-posts-admin', {blogposts, loggedIn: req.session.loggedIn});
} catch (err) {
  res.status(500).send({ error: 'Could not retrieve blog posts' });
}
});


//single post
router.get("/post/:id", async (req, res) => {
  try {
    const blogpostData = await Blogpost.findOne({
      include: 
      [
        User,
        {
          model: Comment,
          include: [User]
        }
      ],
    });
    if (blogpostData) {
      const blogpost = blogpostData.get({ plain: true });
      res.render("single-post-admin", {blogpost, loggedIn: req.session.loggedIn});
    } else {
      res.status(404).send({ error: 'Could not retrieve blog post' });
    }
  } catch (err) {
    res.status(500).send({ error: 'Could not retrieve blog post' });
  }
});
      
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dash');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dash');
    return;
    }
    res.render('signup');
    });
    
module.exports = router;