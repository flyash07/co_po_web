const express=require('express')
const { authUser } = require('../middlewares/isAuthUser')
const { viewFaculty, viewStudents } = require('../controllers/hodController')
const router=express.Router()

router.get('/viewfaculty', authUser, viewFaculty)
router.get('/viewstudents', authUser, viewStudents)

module.exports=router