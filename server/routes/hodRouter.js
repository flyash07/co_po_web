const express=require('express')
const { authUser } = require('../middlewares/isAuthUser')
const { viewFaculty, viewStudents } = require('../controllers/hodController')
const router=express.Router()

router.get('/viewfaculty', viewFaculty)
router.get('/viewstudents', viewStudents)

module.exports=router