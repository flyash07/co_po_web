let courseModel=require('../models/courseModel')

module.exports.getCourseNameById=async (id)=>{
    let course=await courseModel.findById(id).select("name")
    return course? course.name:"Unknown"
}