const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//get and serialize all comments
router.get('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [User],
        });
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        res.render('single-blogpost', {comments, loggedIn: req.session.loggedIn});
    } catch (err) {
        console.log(err);
        res.render('error/500');
    }
});

//post a comment
router.post('/', withAuth, async (req, res) => {
    const body = req.body;
    try {
        const newComment = await Comment.create({
    ...body,
    user_id: req.session.user_id,
});
res.json(newComment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;