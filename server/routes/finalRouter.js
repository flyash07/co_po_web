const express=require('express')
const router=express.Router()

const { authUser } = require('../middlewares/isAuthUser')
const { getCoAtt, getCoPlan, postCoPlan, getPoAtt, getPoPlan, postPoPlan } = require('../controllers/finalController')

router.get('/coAtt',authUser,getCoAtt)
router.get('/getCoPlan',authUser,getCoPlan)
router.post('/postAction',authUser,postCoPlan)
router.get('/poAtt',authUser,getPoAtt)
router.get('/getPoPlan',authUser,getPoPlan)
router.post('/postPoPlan',authUser,postPoPlan)
module.exports=router