const courseModel = require("../models/courseModel")

module.exports.getTargets=async (req,res)=>{
    const courseId=req.courseId
    const course=await courseModel.findById(courseId)
    res.json(course)
}