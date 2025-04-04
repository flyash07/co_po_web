const courseModel = require("../models/courseModel");
const marksModel = require("../models/marksModel")
const studentModel = require("../models/studentModel")

// module.exports.getCie=async(req,res)=>{
//     const {courseId}=req.body

//     const secObj=req.user.section.find(sec=> sec.course==courseId)
//     const sectionId=secObj?secObj.section:null
//     console.log(sectionId)

//     const students=await studentModel.find({section:sectionId});
//     const stuIds = students.map(student => ({
//         id: student._id,
//         regNo: student.regNo,
//         name: student.name
//     }))
//     const stuIdList = stuIds.map(s => s.id);

//     const marks = await marksModel.find({
//         course: courseId,
//         student: { $in: stuIdList }
//     });

//     const result = [];

//     marks.forEach(entry => {
//         const studentId = entry.student.toString();

//         const coTotals = {};

//         const assessments = [
//             ...entry.ass1,
//             ...entry.ass2,
//             ...entry.ass3,
//             ...entry.ass4,
//             ...entry.midSem
//         ];

//         assessments.forEach(q => {
//             const co = q.co;
//             if (!coTotals[co]) {
//             coTotals[co] = 0;
//             }
//             coTotals[co] += q.maxMarks || 0;
//         });

//         result.push({
//                 name: stuIds[studentId]?.name || "Unknown",
//                 regNo: stuIds[studentId]?.regNo || "Unknown",
//                 coMarks: coTotals
//         });
//     });

//     res.json(result)
// }

module.exports.getCie = async (req, res) => {
        const { courseId } = req.body;

        const secObj = req.user.section.find(sec => sec.course == courseId);
        const sectionId = secObj ? secObj.section : null;

        const students = await studentModel.find({ section: sectionId });
        const stuIds = students.map(student => ({
        id: student._id,
        regNo: student.regNo,
        name: student.name
        }));
        const stuIdList = stuIds.map(s => s.id);

        const course = await courseModel.findById(courseId);
        const allAssKeys = ["ass1", "ass2", "ass3", "ass4", "midSem"];

        const maxPerCO = {};
        allAssKeys.forEach(key => {
        course[key]?.forEach(q => {
            if (!maxPerCO[q.co]) maxPerCO[q.co] = 0;
            maxPerCO[q.co] += q.maxMarks || 0;
        });
        });
    
        const marks = await marksModel.find({
        course: courseId,
        student: { $in: stuIdList }
        });
    
        const studentMap = {};
        stuIds.forEach(s => {
        studentMap[s.id.toString()] = {
            name: s.name,
            regNo: s.regNo
        };
        });
    
        const result = [];
        const alaSums = {};
        const levelCounts = {};
        const coStudentCounts = {};
    
        marks.forEach(entry => {
            const studentId = entry.student.toString();
            const coTotals = {};
        
            allAssKeys.forEach(key => {
                entry[key]?.forEach(q => {
                    if (!coTotals[q.co])
                        coTotals[q.co] = 0;
                    coTotals[q.co] += q.maxMarks || 0;
                });
            });
            console.log("++++++++++++++++++++")
            console.log(coTotals)
            console.log("++++++++++++++++++++")
            const coResult = {};
        
            Object.keys(maxPerCO).forEach(co => {
                const obtained = coTotals[co] || 0;
                const total = maxPerCO[co];
                const percentage = (obtained / total) * 100;
                let ala = 1;
                if (percentage >= 75) ala = 3;
                else if (percentage >= 50) ala = 2;
        
                coResult[co] = {
                    obtained,
                    total,
                    percentage: percentage.toFixed(2),
                    ala
                };
        
                if (!alaSums[co])
                    alaSums[co] = 0;
                alaSums[co] += ala;
        
                if (!levelCounts[co])
                    levelCounts[co] = { 1: 0, 2: 0, 3: 0 };
                levelCounts[co][ala] += 1;
        
                if (!coStudentCounts[co]) coStudentCounts[co] = 0;
                coStudentCounts[co] += 1;
            });
        
            result.push({
                name: studentMap[studentId]?.name || "Unknown",
                regNo: studentMap[studentId]?.regNo || "Unknown",
                cie: coResult
            });
        });
    
        const summary = {};
        Object.keys(maxPerCO).forEach(co => {
        summary[co] = {
                avgAla: (alaSums[co] / coStudentCounts[co]).toFixed(2),
                level1: levelCounts[co][1],
                level2: levelCounts[co][2],
                level3: levelCounts[co][3],
                count:coStudentCounts[co]
            };
        });
    
        res.json({ students: result, summary });
};