const express = require('express');
const router = express.Router()
const postController = require('../controllers/post/postController')
const authMiddleware = require('../middlewares/verifyToken')

router.get('/posts/:id',postController.PostById)
router.get('/posts',postController.AllPosts)
router.post('/newpost',authMiddleware.verifyToken,postController.newPost)
router.get('/posts/user/:id',postController.getPostsByUserId)


module.exports = router;