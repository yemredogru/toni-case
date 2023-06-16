const express = require('express');
const router = express.Router()
const postController = require('../../controllers/post/postController')

router.get('/posts/:id',postController.PostById)
router.get('/posts',postController.AllPosts)
router.get('/posts/user/:id',postController.getPostsByUserId)

module.exports = router;