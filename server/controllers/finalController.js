const courseModel = require("../models/courseModel")

module.exports.getCoAtt=async (req,res)=>{
    const {courseId}=req.body
    let data=[]
    for(let i=0;i<8;i++){
        let course=await courseModel.findById(courseId)
        let temp=(60*course.coAttainment[i].direct.inSem+40*course.coAttainment[i].direct.endSem)/100
        course.coAttainment[i].direct.finalCo=temp
        course.coAttainment[i].overall.inSem=temp
        let temp2=(80*temp+20*course.coAttainment[i].overall.endSem)/100
        course.coAttainment[i].overall.finalCo=temp2

        data.push({
            direct:{
                inSem:course.coAttainment[i].direct.inSem,
                endSem:course.coAttainment[i].direct.endSem,
                finalCo:temp
            },
            overall:{
                direct:temp,
                inDirect:course.coAttainment[i].overall.endSem,
                overall:temp2
            },
            target:course.coAttainment[i].targetSet
        })

        await course.save()
    }

    res.status(200).json(data)
}

module.exports.getCoPlan=async (req,res)=>{
    const {courseId}=req.body
    const course=await courseModel.findById(courseId)

    data=[]
    console.log(course.coStatements)
    for(let i=0;i<8;i++){
        data.push({
            stat:course.coStatements[i].description,
            targetSet:course.coAttainment[i].targetSet,
            attained:(80*course.coAttainment[i].overall.inSem+20*course.coAttainment[i].overall.endSem)/100
        })
    }

    res.status(200).json(data)
}

module.exports.postCoPlan=async (req,res)=>{
    const {courseId,stats}=req.body
    let course=await courseModel.findById(courseId)
    course.coActionPlans=stats
    await course.save()
    res.json({message:"Done"})
}