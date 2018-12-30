const router = require('express').Router();
const postController = require('../controllers/posts');

router.get('/post', postController.getPosts);
router.get('/post/:id', postController.getPostById);
router.post('/post', postController.addPost);
router.post('/post/:id', postController.upVote);
router.post('/post/:id', postController.downVote);
router.put('/post/:id', postController.editPost);
router.delete('/post/:id', postController.deletePost);

module.exports = router;