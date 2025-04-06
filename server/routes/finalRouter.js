const express=require('express')
const router=express.Router()

const { authUser } = require('../middlewares/isAuthUser')
const { getCoAtt, getCoPlan, postCoPlan } = require('../controllers/finalController')

router.get('/coAtt',authUser,getCoAtt)
router.get('/getCoPlan',authUser,getCoPlan)
router.post('/postAction',authUser,postCoPlan)
module.exports=router