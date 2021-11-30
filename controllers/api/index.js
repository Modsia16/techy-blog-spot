const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const blogpostRoutes = require('./blogpost-routes.js');
const commentRoutes = require('./comment-routes.js');

router.use('/user', userRoutes);
router.use('/blogpost', blogpostRoutes);
router.use('/comment', commentRoutes);

module.exports = router;