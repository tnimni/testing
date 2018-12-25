const router = require('express').Router();
const postController = require('../controllers/posts');

router.get('/post', postController.addPost);

module.exports = router;