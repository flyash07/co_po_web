const express=require('express')
const { authUser } = require('../middlewares/isAuthUser')
const router=express.Router

router.get('/getTargets',authUser)