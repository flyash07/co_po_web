const express=require('express')
const { authUser } = require('../middlewares/isAuthUser')
const { getTargets } = require('../controllers/courseController')
const router=express.Router()

router.get('/getTargets',authUser,getTargets)

module.exports=router