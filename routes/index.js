const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const {isAuthenticated} = require('../config/auth')
router.get('/',async(req,res)=>{
    res.send('welcome')
})
router.post('/signup',userController.signup)
router.post('/login',userController.login)

router.get('/user',isAuthenticated,userController.getUserData)
router.post('/forget-password',userController.forgetPassword)

// render password change page
router.get('/update-password/:userId',userController.changepasswordPage,)
router.post('/change-password/:userId',userController.updatePassword)
module.exports=router
