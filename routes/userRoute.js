const express = require('express');
const router = express.Router()
const userController = require('../../controllers/user/userController')


router.post('/login',userController.Login)
router.post('/register',userController.Register)
router.get('/user/:id',userController.UserById)
router.get('/users',userController.AllUsers)


module.exports = router;