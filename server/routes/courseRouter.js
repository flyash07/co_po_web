const express=require('express')
const { authUser } = require('../middlewares/isAuthUser')
const { getTargets, postTargets, getCoPo, postCoPo } = require('../controllers/courseController')
const router=express.Router()

router.get('/getTargets',authUser,getTargets)
router.post('/postTargets',authUser,postTargets)
router.get('/getCoPo',authUser,getCoPo)
router.post('/postPoCo',authUser,postCoPo)
module.exports=router