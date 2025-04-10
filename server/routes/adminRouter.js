const express=require('express')
const { authUser } = require('../middlewares/isAuthUser')
const { addFaculty, addSection, addCourse, addStudents, courseAllocation } = require('../controllers/adminController')
const router=express.Router()

router.post('/addfaculty', authUser, addFaculty)
router.post('/addsection', authUser, addSection)
router.post('/addcourse', authUser, addCourse)
router.post('/addstudents', authUser, addStudents)
router.post('/course-allocation', authUser, courseAllocation)

module.exports=router