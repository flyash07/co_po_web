const courseSection = require("../models/courseSection");

module.exports.getRootCo=async (req,res)=>{
    const {courseId}=req.query
    const secObj = req.user.section.find(sec => sec.course == courseId);
    const sectionId = secObj ? secObj.section : null;

    const cs = await courseSection.findOne({ courseId, sectionId });
    return res.status(200).json({
        statCo:cs.rootCauseCo
    })
}

module.exports.postRootCo=async (req,res)=>{
    const {courseId,statCo}=req.body
    const secObj = req.user.section.find(sec => sec.course == courseId);
    const sectionId = secObj ? secObj.section : null;

    const cs = await courseSection.findOne({ courseId, sectionId });
    cs.rootCauseCo=statCo
    await cs.save()
    res.status(200).json({message:"Done"})
}

module.exports.getRootPo=async (req,res)=>{
    const {courseId}=req.query
    const secObj = req.user.section.find(sec => sec.course == courseId);
    const sectionId = secObj ? secObj.section : null;

    const cs = await courseSection.findOne({ courseId, sectionId });
    return res.status(200).json({
        statPo:cs.rootCausePo,
        statPso:cs.rootCausePso
    })
}

module.exports.postRootPo=async (req,res)=>{
    const {courseId,statPo,statPso}=req.body
    const secObj = req.user.section.find(sec => sec.course == courseId);
    const sectionId = secObj ? secObj.section : null;

    const cs = await courseSection.findOne({ courseId, sectionId });
    cs.rootCausePo=statPo
    cs.rootCausePso=statPso
    await cs.save()
    res.status(200).json({message:"Done"})
}