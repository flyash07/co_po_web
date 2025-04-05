const express=require('express')
const { authUser } = require('../middlewares/isAuthUser')
const { getCie, postCie } = require('../controllers/cieController')
const router=express.Router()

router.get('/getCie',authUser,getCie)
router.post('/postCie',authUser,postCie)

module.exports=router