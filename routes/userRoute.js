const express = require('express');
const router = express.Router()
const userController = require('../controllers/user/userController')
const friendRequestVerify = require('../middlewares/friendRequestVerify')
const authMiddleware = require('../middlewares/verifyToken')

router.post('/login',userController.Login)
router.post('/register',userController.Register)
router.get('/user/:id',userController.UserById)
router.get('/users',userController.AllUsers)
router.post('/add-friend/:id',authMiddleware.verifyToken,friendRequestVerify.ifRequest,userController.sendRequest)
router.post('/accept/:id',authMiddleware.verifyToken,friendRequestVerify.verifyRequest,userController.AcceptRequest)
router.post('/reject/:id',authMiddleware.verifyToken,friendRequestVerify.verifyRequest,userController.RejectRequest)

module.exports = router;