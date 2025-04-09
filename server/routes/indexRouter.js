const express=require('express')
const router=express.Router()
const indexController=require('../controllers/indexController')

router.post('/login',indexController.login)
router.post('/logout',indexController.logout)
router.get('/courseDet',indexController.courseDet)
module.exports=router