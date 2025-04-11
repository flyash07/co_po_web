const express=require('express')
const { authUser } = require('../middlewares/isAuthUser')
const { getRootCo, postRootCo, getRootPo, postRootPo } = require('../controllers/rootCause')
const router=express.Router()

router.get('/getCo',authUser,getRootCo)
router.post('/postCo',authUser,postRootCo)
router.get('/getPo',authUser,getRootPo)
router.post('/postPo',authUser,postRootPo)

module.exports=router