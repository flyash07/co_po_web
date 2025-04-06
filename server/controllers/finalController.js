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

module.exports.getPoAtt=async (req,res)=>{
    const {courseId}=req.query
    const course=await courseModel.findById(courseId)

    const directCo=[]
    const overallCo=[]
    const po=[]
    const pso=[]
    const targetPo=[]
    const targetPso=[]
    const directPo=[]
    const overallPo=[]
    const directPso=[]
    const overallPso=[]

    for(let i=0;i<8;i++){
        directCo.push(course.coAttainment[i].direct.finalCo)
        overallCo.push(course.coAttainment[i].overall.finalCo)
    }

    for(let i=0;i<8;i++){
        let temp=[]
        for(let j=0;j<12;j++){
            temp.push(course.coPoMapping[i*12+j].value)
        }
        po.push(temp)
    }

    for(let i=0;i<8;i++){
        let temp=[]
        for(let j=0;j<4;j++){
            console.log(i*4+j)
            temp.push(course.coPsoMapping[i*4+j].value)
        }
        pso.push(temp)
    }

    for(let i=0;i<12;i++){
        targetPo.push(course.poAttainment[i].targetSet)
    }

    for(let i=0;i<4;i++){
        targetPso.push(course.psoAttainment[i].targetSet)
    }

    for(let i=0;i<12;i++){
        let mulP=0,cP=0,mulPs=0
        for(let j=0;j<8;j++){
            mulP=mulP+directCo[j]*po[j][i]
            mulPs=mulPs+overallCo[j]*po[j][i]
            cP=cP+po[j][i]
        }
        directPo.push(mulP/cP)
        overallPo.push(mulPs/cP)
        course.poAttainment[i].attained=mulPs/cP
        await course.save()
    }

    for(let i=0;i<4;i++){
        let mulP=0,cP=0,mulPs=0
        for(let j=0;j<8;j++){
            mulP=mulP+directCo[j]*po[j][i]
            mulPs=mulPs+overallCo[j]*po[j][i]
            cP=cP+po[j][i]
        }
        directPso.push(mulP/cP)
        overallPso.push(mulPs/cP)
        course.psoAttainment[i].attained=mulPs/cP
        await course.save()
    }

    res.status(200).json({
        directCo,
        overallCo,
        po,
        pso,
        targetPo,
        targetPso,
        directPo,
        overallPo,
        directPso,
        overallPso
    })
}