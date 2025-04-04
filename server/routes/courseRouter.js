const express=require('express')
const { authUser } = require('../middlewares/isAuthUser')
const { getTargets, postTargets } = require('../controllers/courseController')
const router=express.Router()

router.get('/getTargets',authUser,getTargets)
router.post('/postTargets',authUser,postTargets)
module.exports=router