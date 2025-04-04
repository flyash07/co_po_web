const express=require('express')
const { authUser } = require('../middlewares/isAuthUser')
const { getCie } = require('../controllers/cieController')
const router=express.Router()

router.get('/getCie',authUser,getCie)

module.exports=router