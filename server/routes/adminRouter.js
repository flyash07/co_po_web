const express=require('express')
const { authUser } = require('../middlewares/isAuthUser')
const { addFaculty, addSection, addCourse, addStudents, courseAllocation } = require('../controllers/adminController')
const router=express.Router()

router.post('/uploadFaculties',  addFaculty)
router.post('/uploadSections',addSection)
router.post('/uploadCourses', addCourse)
router.post('/uploadStudents', addStudents)
router.post('/uploadCourseAllocations', courseAllocation)

module.exports=router