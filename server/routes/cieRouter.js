const express=require('express')
const { authUser } = require('../middlewares/isAuthUser')
const { getCie, postCie, getSee } = require('../controllers/cieController')
const router=express.Router()

router.get('/getCie',authUser,getCie)
router.post('/postCie',authUser,postCie)
router.get('/getSee',authUser,getSee)

module.exports=router