const marksModel = require("../models/marksModel");
const studentModel = require("../models/studentModel");
const courseModel = require("../models/courseModel")

module.exports.getFeedback=async (req,res)=>{
    const { courseId } = req.query;

    const secObj = req.user.section.find(sec => sec.course == courseId);
    const sectionId = secObj ? secObj.section : null;
    cs=await courseSection.findOne({
        courseId,
        sectionId
    })

    const students = await studentModel.find({ section: sectionId });
    const stuIds = students.map(student => ({
        id: student._id,
        regNo: student.regNo,
        name: student.name
    }));

    let coStats = {}; // Structure: { [coNum]: { counts: {1:0, 2:0,...}, total:0, sum:0 } }

    let studentFeedbackData = [];

    for (let i = 0; i < stuIds.length; i++) {
        const marks = await marksModel.findOne({ course: courseId, student: stuIds[i].id });
        if (!marks || !marks.feedback) continue;
        let coValues = {};
        for (let fb of marks.feedback) {
            const { coNum, value } = fb;
            if (!coStats[coNum]) {
                coStats[coNum] = {
                    counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
                    total: 0,
                    sum: 0
                };
            }

            if (value >= 1 && value <= 5) {
                coStats[coNum].counts[value]++;
                coStats[coNum].total++;
                coStats[coNum].sum += value;
            }
            coValues[coNum] = value;
        }
        studentFeedbackData.push({
            name: stuIds[i].name,
            regNo: stuIds[i].regNo,
            coValues
        });
    }

    // Final calculation
    let summary = [];
    let cfSum = 0;

    for (let coNum in coStats) {
        const stats = coStats[coNum];
        const weightedScore = stats.total ? (stats.sum / stats.total) : 0;
        cfSum += weightedScore;

        let attainmentLevel = 0;
        if (weightedScore >= 3.5) attainmentLevel = 3;
        else if (weightedScore >= 2.5) attainmentLevel = 2;
        else if (weightedScore >= 1) attainmentLevel = 1;

        summary.push({
            coNum: Number(coNum),
            counts: stats.counts,
            totalStudents: stats.total,
            weightedScore: weightedScore.toFixed(2),
            attainmentLevel
        });
    }

    let course=await courseModel.findById(courseId)
    for(let i=0;i<summary.length;i++){
      console.log(summary[i].coNum)
      cs.coAttainment[summary[i].coNum-1].overall.endSem=summary[i].attainmentLevel
    }
    await cs.save()

    // Course Weighted Average (CF)
    const courseCF = summary.length ? (cfSum / summary.length).toFixed(2) : 0;

    let courseAttainment = 0;
    if (courseCF >= 3.5) courseAttainment = 3;
    else if (courseCF >= 2.5) courseAttainment = 2;
    else if (courseCF >= 1) courseAttainment = 1;

    // Final result
    const result = {
        coSummary: summary,
        courseCF,
        courseAttainment,
        studentFeedbackData
    };

    res.status(200).json(result);
}

// module.exports.postFeedback = async (req, res) => {
//     const { data, courseId } = req.body;
  
//     const secObj = req.user.section.find(sec => sec.course == courseId);
//     const sectionId = secObj ? secObj.section : null;
  
//       for (let i = 1; i < data.length; i++) {
//         const studentData = data[i];
  
//         const feedback = [];
//         for (let key in studentData) {
//           if (key.startsWith("co")) {
//             const coNum = parseInt(key.replace("co", ""));
//             const value = parseInt(studentData[key]);
//             if (!isNaN(coNum) && !isNaN(value)) {
//               feedback.push({ coNum, value });
//             }
//           }
        
//         await marksModel.findOneAndUpdate(
//           { student: studentData.regno, course: courseId },
//           { $set: { feedback } },
//           { new: true, upsert: false } // upsert false to avoid creating new if not found
//         );
//       }
//     }
  
//       res.status(200).json({ message: "Feedback submitted successfully." });
// }

module.exports.postFeedback = async (req, res) => {
    const { data, courseId } = req.body;
  
    const secObj = req.user.section.find(sec => sec.course == courseId);
    const sectionId = secObj ? secObj.section : null;
  
    try {
      for (let i = 1; i < data.length; i++) {
        const studentData = data[i];
  
        // Get the student object using regNo
        const student = await studentModel.findOne({ regNo: studentData.regno });
        if (!student) {
          console.warn(`Student with regNo ${studentData.regno} not found. Skipping.`);
          continue;
        }
  
        // Build feedback array from co1 to coN
        const feedback = [];
        for (let key in studentData) {
          if (key.startsWith("co")) {
            const coNum = parseInt(key.replace("co", ""));
            const value = parseInt(studentData[key]);
            if (!isNaN(coNum) && !isNaN(value)) {
              feedback.push({ coNum, value });
            }
          }
        }
  
        // Update marksModel using student._id
        await marksModel.findOneAndUpdate(
          { student: student._id, course: courseId },
          { $set: { feedback } },
          { new: true, upsert: false }
        );
      }
  
      res.status(200).json({ message: "Feedback submitted successfully." });
    } catch (error) {
      console.error("Error in postFeedback:", error);
      res.status(500).json({ error: "Failed to submit feedback." });
    }
  };
  