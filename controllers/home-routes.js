const router = require('express').Router();
const { Blogpost, User } = require('../models');
const withAuth = require('../utils/auth');

//home page posts
router.get('/', async (req, res) => {
    try {
        const postData = await Blogpost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
              ],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('home', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});


router.get ('/post/:id', async (req, res) => {
  try {
    const postData = await Blogpost.findByPk(req.session.user_id, {
      include: [{ model: User, attributes: ['name'] 
    }],
    });
    const post = postData.get({ plain: true });
    res.render('post', {
      ...post,
      loggedIn: req.session.loggedIn
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/profile', withAuth, async (req, res) => {
try {
  const userData = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ['password'] },
    include: [{ model: Blogpost }],
  });
  const user = userData.get({ plain: true });
  res.render('profile', {
    ...user,
    loggedIn: true
  });
} catch (error) {
  console.log(error);
  res.status(500).json(error);
}
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/profile');
  return;
  }
  res.render('login');
});

module.exports = router;