router = require('express').Router();
const { Blogpost } = require('../../models/');
const withAuth = require('../../utils/auth');

//post a blogpost
router.post('/', withAuth, async (req, res) => {
    const body = req.body;
    try {
        newBlogpost = await Blogpost.create({...body, user_id: req.session.user_id});
        res.json(newBlogpost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//update a blogpost
router.put('/:id', withAuth, async (req, res) => {
    try {
        const [affectedRows] = await Blogpost.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (affectedRows) {
            res.json({
                message: 'Blogpost successfully updated',
            });
        } else {
            res.status(404).json({ message: 'No blogpost found with this id' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }           
});

// delete a blogpost
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const [affectedRows] = await Blogpost.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (affectedRows) {
            res.json({
                message: 'Blogpost successfully deleted',
            });
        } else {
            res.status(404).json({ message: 'No blogpost found with this id' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;

            