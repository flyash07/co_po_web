const express=require('express')
const { authUser } = require('../middlewares/isAuthUser')
const { getCieLab, postCieLab, getSeeLab, postSeeLab } = require('../controllers/labController')
const router=express.Router()

router.get('/getCie',authUser,getCieLab)
router.post('/postCie',authUser,postCieLab)
router.get('/getSee',authUser,getSeeLab)
router.post('/postSee',authUser,postSeeLab)
module.exports=router