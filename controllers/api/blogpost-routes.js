const router = require('express').Router();
const { Blogpost } = require('../../models/');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Blogpost.create({
        ...req.body,
        user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Blogpost.destroy({
        where: {
            id: req.params.id,
            user_id: req.session.user_id,
        },
    });
    if (!postData) {
        res.status(404).json({
        message: 'Post not found',
        });
        return;
    }
    res.status(200).json(postData);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;

            