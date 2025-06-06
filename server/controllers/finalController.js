const courseModel = require("../models/courseModel");
const courseSection = require("../models/courseSection");

module.exports.getCoAtt=async (req,res)=>{
    const {courseId}=req.query
    const secObj = req.user.section.find(sec => sec.course == courseId);
    const sectionId = secObj ? secObj.section : null;
    const course=await courseModel.findById(courseId)
    let data=[]
    for(let i=0;i<8;i++){
        cs=await courseSection.findOne({
            courseId,
            sectionId
        })
        let temp=(60*cs.coAttainment[i].direct.inSem+40*cs.coAttainment[i].direct.endSem)/100
        cs.coAttainment[i].direct.finalCo=temp
        cs.coAttainment[i].overall.inSem=temp
        let temp2=(80*temp+20*cs.coAttainment[i].overall.endSem)/100
        cs.coAttainment[i].overall.finalCo=temp2

        data.push({
            direct:{
                inSem:cs.coAttainment[i].direct.inSem,
                endSem:cs.coAttainment[i].direct.endSem,
                finalCo:temp
            },
            overall:{
                direct:temp,
                inDirect:cs.coAttainment[i].overall.endSem,
                overall:temp2
            },
            target:course.coTargetSet[i]
        })

        await cs.save()
    }

    res.status(200).json(data)
}

module.exports.getCoPlan=async (req,res)=>{
    const {courseId}=req.query
    const course=await courseModel.findById(courseId)

    const secObj = req.user.section.find(sec => sec.course == courseId);
    const sectionId = secObj ? secObj.section : null;
    cs=await courseSection.findOne({
        courseId,
        sectionId
    })

    data=[]
    console.log(course.coStatements)
    for(let i=0;i<8;i++){
        data.push({
            stat:course.coStatements[i].description,
            targetSet:course.coTargetSet[i],
            attained:(80*cs.coAttainment[i].overall.inSem+20*cs.coAttainment[i].overall.endSem)/100,
            action:cs.coActionPlans[i]
        })
    }

    res.status(200).json(data)
}

module.exports.getPoPlan=async (req,res)=>{
    const {courseId}=req.query
    const course=await courseModel.findById(courseId)

    const secObj = req.user.section.find(sec => sec.course == courseId);
    const sectionId = secObj ? secObj.section : null;
    cs=await courseSection.findOne({
        courseId,
        sectionId
    })

    data=[]
    for(let i=0;i<12;i++){
        console.log(cs.poActionPlans[i])
        data.push({
            targetSet:course.poTargetSet[i],
            attained:cs.poAttainment[i].attained,
            action:cs.poActionPlans[i]
        })
    }
    for(let i=0;i<4;i++){
        data.push({
            targetSet:course.psoTargetSet[i],
            attained:cs.psoAttainment[i].attained,
            action:cs.psoActionPlans[i]
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
    const { courseId, stats } = req.body;
    const secObj = req.user.section.find(sec => sec.course == courseId);
    const sectionId = secObj ? secObj.section : null;
    cs=await courseSection.findOne({
        courseId,
        sectionId
    })
    try {
        let course = await courseModel.findById(courseId);

        if (!course) return res.status(404).json({ message: "Course not found" });

        // Ensure proper format
        cs.coActionPlans = stats.map(s => typeof s === 'string' ? { stat: s } : s);

        await cs.save();
        res.json({ message: "Done" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports.postPoPlan=async(req,res)=>{
        const { courseId, updates } = req.body;

        const secObj = req.user.section.find(sec => sec.course == courseId);
        const sectionId = secObj ? secObj.section : null;
        cs=await courseSection.findOne({
            courseId,
            sectionId
        })

        if (!Array.isArray(updates) || updates.length !== 16) {
            return res.status(400).json({ message: 'Expected array of 16 strings' });
        }

        const poActionPlans = [];
        const psoActionPlans = [];

        // First 12 for PO
        for (let i = 0; i < 12; i++) {
            poActionPlans.push({ stat: updates[i] });
        }

        // Next 4 for PSO
        for (let i = 12; i < 16; i++) {
            psoActionPlans.push({ stat: updates[i] });
        }

        const updatedCourse = await courseSection.findOneAndUpdate(
            { courseId: courseId, sectionId: sectionId },  // filter by course & section
            {
            $set: {
                poActionPlans,
                psoActionPlans
            }
            },
            { new: true }  // returns the updated document
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ message: 'Action plans updated successfully'});
}

module.exports.getPoAtt=async (req,res)=>{
    const {courseId}=req.query
    const course=await courseModel.findById(courseId)

    const secObj = req.user.section.find(sec => sec.course == courseId);
    const sectionId = secObj ? secObj.section : null;
    cs=await courseSection.findOne({
        courseId,
        sectionId
    })

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
        directCo.push(cs.coAttainment[i].direct.finalCo)
        overallCo.push(cs.coAttainment[i].overall.finalCo)
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
        targetPo.push(course.poTargetSet[i])
    }

    for(let i=0;i<4;i++){
        targetPso.push(course.psoTargetSet[i])
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
        cs.poAttainment[i].attained=mulPs/cP
        await cs.save()
    }

    for(let i=0;i<4;i++){
        let mulP=0,cP=0,mulPs=0
        for(let j=0;j<8;j++){
            mulP=mulP+directCo[j]*pso[j][i]
            mulPs=mulPs+overallCo[j]*pso[j][i]
            cP=cP+pso[j][i]
        }
        directPso.push(mulP/cP)
        overallPso.push(mulPs/cP)
        cs.psoAttainment[i].attained=mulPs/cP
        await cs.save()
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