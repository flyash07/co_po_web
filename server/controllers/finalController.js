const courseModel = require("../models/courseModel")

module.exports.getCoAtt=async (req,res)=>{
    const {courseId}=req.query
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
    const {courseId}=req.query
    const course=await courseModel.findById(courseId)

    data=[]
    console.log(course.coStatements)
    for(let i=0;i<8;i++){
        data.push({
            stat:course.coStatements[i].description,
            targetSet:course.coAttainment[i].targetSet,
            attained:(80*course.coAttainment[i].overall.inSem+20*course.coAttainment[i].overall.endSem)/100,
            action:course.coActionPlans[i]
        })
    }

    res.status(200).json(data)
}

// module.exports.postCoPlan=async (req,res)=>{
//     const {courseId,stats}=req.body
//     let course=await courseModel.findById(courseId)
//     course.coActionPlans=stats
//     await course.save()
//     res.json({message:"Done"})
// }

module.exports.postCoPlan = async (req, res) => {
    try {
        const { courseId, stats } = req.body;
        let course = await courseModel.findById(courseId);

        if (!course) return res.status(404).json({ message: "Course not found" });

        // Ensure proper format
        course.coActionPlans = stats.map(s => typeof s === 'string' ? { stat: s } : s);

        await course.save();
        res.json({ message: "Done" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};
