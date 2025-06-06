const courseModel = require("../models/courseModel");
const courseSection = require("../models/courseSection");
const marksModel = require("../models/marksModel")
const studentModel = require("../models/studentModel")

module.exports.getCie = async (req, res) => {
        const { courseId } = req.query;

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

        asswise=[]
        marks.forEach(markEntry => {
            const studentId = markEntry.student.toString();
            const studentInfo = studentMap[studentId];

            const coWiseMarks = {};

            allAssKeys.forEach(assignKey => {
                const responses = markEntry[assignKey] || [];

                responses.forEach(q => {
                const co = `CO${q.co}`;
                if (!coWiseMarks[assignKey]) coWiseMarks[assignKey] = {};
                if (!coWiseMarks[assignKey][co]) coWiseMarks[assignKey][co] = 0;
                coWiseMarks[assignKey][co] += q.maxMarks || 0;  // Use actual scored marks if available
                });
            });

            asswise.push({
                regNo: studentInfo.regNo,
                name: studentInfo.name,
                coWiseMarks
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

        let cs=await courseSection.findOne({
            courseId:courseId,
            sectionId:sectionId
        })
        if(!cs){
            const newCourseSection = await courseSection.create({
                courseId:courseId,
                sectionId:sectionId
            });
        }
        cs=await courseSection.findOne({
            courseId,
            sectionId
        })
        console.log(cs)
        console.log("Updating coursee")
        Object.keys(summary).forEach(co => {
            const index = parseInt(co);
            const coData = summary[co];
        
            // Make sure index is in bounds
            if (index >= 0 && index < cs.coAttainment.length) {
                console.log(index)
                cs.coAttainment[index-1].direct.inSem = parseFloat(coData.avgAla); // or coData.level1, etc.
            }
        });
        
        await cs.save();
        await course.save()

        res.json({ students: result, summary,asswise });
};

module.exports.getSee = async (req, res) => {
    const { courseId } = req.query;

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
    const allAssKeys = ["endSem"];

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
            cie: coResult,
            grade: entry["grade"]
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

    cs=await courseSection.findOne({
        courseId,
        sectionId
    })

    Object.keys(summary).forEach(co => {
        const index = parseInt(co);
        const coData = summary[co];
    
        // Make sure index is in bounds
        if (index >= 0 && index < cs.coAttainment.length) {
            console.log(index)
            cs.coAttainment[index-1].direct.endSem = parseFloat(coData.avgAla); // or coData.level1, etc.
        }
    });
    
    await course.save();
    await cs.save()
    res.json({ students: result, summary });
};

module.exports.postCie=async(req,res)=>{
    //console.log(req.body)
    const {data,courseId,assignmentType}=req.body
    if (!['ass1', 'ass2', 'ass3', 'ass4', 'midSem', 'endSem'].includes(assignmentType)) {
        throw new Error('Invalid assignment type');
    }

    const maxMarksRow = data[0];
    console.log(maxMarksRow)
    const qnosRow = data[1];
    const partsExist = Object.values(qnosRow).some(val => typeof val === 'string' && /[a-zA-Z]/.test(val));
    console.log(req.user)
    const secObj = req.user.section.find(sec => sec.course == courseId);
    const sectionId = secObj ? secObj.section : null;

    const course = await courseModel.findById(courseId); // Don't forget `await` here

    const maxMarksC = [];

    for (const key in maxMarksRow) {
        if (!key.startsWith('co')) continue;

        const coMatch = key.match(/co(\d+)/);
        if (!coMatch) continue;

        const co = parseInt(coMatch[1]);
        const maxMarks = maxMarksRow[key];
        const qRaw = qnosRow[key];

        let qNo, part = '';

        if (partsExist && typeof qRaw === 'string') {
            const match = qRaw.match(/^(\d+)([a-zA-Z]*)$/);
            qNo = parseInt(match[1]);
            part = match[2] || '';
        } else {
            qNo = parseInt(qRaw);
        }

        maxMarksC.push({
            qNo,
            part,
            co,
            maxMarks
        });
    }

    // Save this structure to the course object under the relevant assignmentType
    course[assignmentType] = maxMarksC;
    await course.save();

    for (let i = 2; i < data.length; i++) {
        const row = data[i];
        const regno = row.regno;
        const name = row.name || `Student_${regno}`;
        let student = await studentModel.findOne({ regNo: regno });

        // Create student if not found
        if (!student) {
            student = new studentModel({
                regNo: regno,
                name,
                section: sectionId,
                currentCourses: [courseId]
            });
            await student.save();
        } else {
            // Ensure course is in currentCourses
            if (!student.currentCourses.includes(courseId)) {
                student.currentCourses.push(courseId);
                await student.save();
            }
        }

        const marksData = [];

        for (const key in row) {
            if (!key.startsWith('co')) continue;

            const coMatch = key.match(/co(\d+)/);
            if (!coMatch) continue;

            const co = parseInt(coMatch[1]);
            const maxMarks = row[key];
            //const maxMarks = maxMarksRow[key] ?? 0;
            const qRaw = qnosRow[key];

            let qNo, part = '';

            if (partsExist && typeof qRaw === 'string') {
                const match = qRaw.match(/^(\d+)([a-zA-Z]*)$/);
                qNo = parseInt(match[1]);
                part = match[2] || '';
            } else {
                qNo = parseInt(qRaw);
            }

            marksData.push({
                qNo,
                part,
                co,
                maxMarks
            });
        }

        // Find or create marks document
        let marksDoc = await marksModel.findOne({ student: student._id, course: courseId });
        if (!marksDoc) {
            marksDoc = new marksModel({
                student: student._id,
                course: courseId
            });
        }

        marksDoc[assignmentType] = marksData;
        if(assignmentType=="endSem"){
            marksDoc["grade"] = row.grade
        }
        await marksDoc.save();
    }

    res.status(200).json({message:"Updated DB"})
}