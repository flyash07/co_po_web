const courseModel = require("../models/courseModel")

module.exports.getTargets=async (req,res)=>{
    try{
        const courseId=req.body.courseId
        const course=await courseModel.findById(courseId)
        data={
            coTargets:[],
            coPrevTargets:[],
            coPrevAttained:[],
            poTargets:[],
            psoTargets:[]
        }
        for(let i=0;i<8;i++){
            data.coTargets.push(course.coAttainment[i].targetSet)
            data.coPrevTargets.push(0)
            data.coPrevAttained.push(0)
        }
        for(let i=0;i<12;i++){
            data.poTargets.push(course.poAttainment[i].targetSet)
        }
        for(let i=0;i<4;i++){
            data.psoTargets.push(course.psoAttainment[i].targetSet)
        }
        res.status(200).json(data)
    }catch(err){
        console.error(err)
        res.status(500).json({'error':"InternalServerError"})
    }
}