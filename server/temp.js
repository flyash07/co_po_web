// const express=require('express')
// const app=express()

// const cookieParser=require('cookie-parser')

// const cors=require('cors')
// const corsParams={
//     origin:"http://localhost:5173"
// }
// app.use(cors(corsParams))
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use(cookieParser());
// app.get("/test-get", (req, res) => {
//     res.json({ message: "GET request successful!" });
// });

// app.post("/test-post", (req, res) => {
//     console.log("Received POST data:", req.body);
//     res.json({ message: "POST request successful!", receivedData: req.body });
// });

// app.listen(8080);


//Excel
// const XLSX = require('xlsx');
// const path = require('path');

// // Load the Excel file
// const workbook = XLSX.readFile('tempfeedback.xlsx');

// // Get the first sheet name
// const sheetName = workbook.SheetNames[0];

// // Get the sheet
// const sheet = workbook.Sheets[sheetName];

// // Convert to JSON
// const jsonData = XLSX.utils.sheet_to_json(sheet);

// // Output to console
// console.log(JSON.stringify(jsonData, null, 2));



//DB

// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const Prof = require("./models/proffesorModel");
// const Course = require("./models/courseModel");
// const Section = require("./models/sectionModel");
// const Dept = require("./models/departmentModel"); // assuming you'll use some dept

// async function createProfWithCourseAndSection() {
//     try {
//         await mongoose.connect("mongodb://localhost:27017/copo");

//         // Use an existing dept or create one for demo
//         let dept = await Dept.findOne();
//         if (!dept) {
//             dept = await Dept.create({ name: "CSE" });
//         }

//         const hashedPassword = await bcrypt.hash("pass", 10);

//         // Create professor
//         const prof = await Prof.create({
//             facultyID: "pp01",
//             name: "pp",
//             email: "pp@university.edu",
//             phoneNo: 1234567890,
//             dept: dept._id,
//             password: hashedPassword
//         });

//         // Create course
//         const course = await Course.create({
//             courseID: "CS101",
//             name: "Intro to CS",
//             type: "Theory",
//             coordinator: prof._id,
//             program: "B.Tech",
//             sem: "2",
//             year: 2025,
//             oddEven: "Even",
//             dept: dept._id,
//             coStatements: [
//               { description: "Understand basic programming concepts", bloomsLevel: "L1" },
//               { description: "Apply logic to solve computational problems", bloomsLevel: "L2" },
//               { description: "Analyze algorithms for efficiency", bloomsLevel: "L3" },
//               { description: "Design simple software applications", bloomsLevel: "L4" },
//               { description: "Evaluate different data structures", bloomsLevel: "L5" },
//               { description: "Implement modular programming techniques", bloomsLevel: "L3" },
//               { description: "Communicate technical ideas clearly", bloomsLevel: "L2" },
//               { description: "Work effectively in team-based environments", bloomsLevel: "L1" }
//           ]
//         });

//         const course2 = await Course.create({
//           courseID: "CS102",
//           name: "ES",
//           type: "Theory",
//           coordinator: prof._id,
//           program: "B.Tech",
//           sem: "2",
//           year: 2025,
//           oddEven: "Even",
//           dept: dept._id,
//           coStatements: [
//             { description: "Understand basic programming concepts", bloomsLevel: "L1" },
//             { description: "Apply logic to solve computational problems", bloomsLevel: "L2" },
//             { description: "Analyze algorithms for efficiency", bloomsLevel: "L3" },
//             { description: "Design simple software applications", bloomsLevel: "L4" },
//             { description: "Evaluate different data structures", bloomsLevel: "L5" },
//             { description: "Implement modular programming techniques", bloomsLevel: "L3" },
//             { description: "Communicate technical ideas clearly", bloomsLevel: "L2" },
//             { description: "Work effectively in team-based environments", bloomsLevel: "L1" }
//         ]
//       });

//         // Add course to dept and prof
//         dept.courses.push(course._id,course2._id);
//         await dept.save();

//         prof.currentlyTeaching.push(course._id,course2._id);
//         prof.hasTaught.push(course._id);
//         await prof.save();

//         // Create section
//         const section = await Section.create({
//             name: "A",
//             dept: dept._id,
//             program: "B.Tech",
//             batch: "2024",
//             sem: "2"
//         });

//         // Link section to prof
//         prof.section.push({
//             course: course._id,
//             section: section._id
//         },{
//           course: course2._id,
//           section: section._id
//       }
//       );
//         await prof.save();

//         console.log("Professor, course, and section created successfully.");
//         mongoose.disconnect();
//     } catch (err) {
//         console.error("Error:", err);
//         mongoose.disconnect();
//     }
// }

// createProfWithCourseAndSection();

// const mongoose = require('mongoose')
// const Course = require("./models/courseModel"); // adjust path as needed
// mongoose.connect("mongodb://localhost:27017/copo");
// const updateCourseWithCOs = async () => {
//     const courseId = "67f169134671cad48f7ba7e5"; // Replace with actual ObjectId
//     const randomDescriptions = [
//         "Understand basic programming concepts",
//         "Apply logic to solve computational problems",
//         "Analyze algorithms for efficiency",
//         "Design simple software applications",
//         "Evaluate different data structures",
//         "Implement modular programming techniques",
//         "Communicate technical ideas clearly",
//         "Work effectively in team-based environments"
//     ];

//     const bloomsLevels = ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"];

//     const coStatements = randomDescriptions.map(desc => ({
//         description: desc,
//         bloomsLevel: bloomsLevels[Math.floor(Math.random() * bloomsLevels.length)]
//     }));

//     await Course.findByIdAndUpdate(courseId, { coStatements });

//     console.log("Course updated with CO statements!");
// };

// updateCourseWithCOs()
//   .then(() => mongoose.disconnect())
//   .catch(err => {
//     console.error(err);
//     mongoose.disconnect(); // Ensure disconnection even on error
//   });

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Course = require("./models/courseModel");
const Section = require("./models/sectionModel");
const Prof = require("./models/proffesorModel");
const Dept = require("./models/departmentModel");

const DB_URI = "mongodb://localhost:27017/copo"; // <-- change to your DB

async function populate() {
    await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // 1. Create Department
    const cseDept = await Dept.create({
        name: "CSE",
        hod: null,
        courses: [],
        psoStatements: Array.from({ length: 4 }, (_, i) => ({
            number: i + 1,
            description: `Program Outcome ${i + 1}`
        }))
    });

    // 2. Create Sections
    // const sectionNames = ["A", "B", "C", "D"];
    // const sections = await Promise.all(sectionNames.map(name =>
    //     Section.create({
    //         name,
    //         dept: cseDept._id,
    //         program: "BTech CSE",
    //         batch: "2022-2026",
    //         sem: "4"
    //     })
    // ));

    // // 3. Create Professors
    // const profData = [
    //     { facultyID: "P001", name: "Dr. Alice", email: "alice@univ.edu", phoneNo: 1234567890, designation: "Associate Professor" },
    //     { facultyID: "P002", name: "Dr. Bob", email: "bob@univ.edu", phoneNo: 1234567891, designation: "Assistant Professor" },
    //     { facultyID: "P003", name: "Dr. Carol", email: "carol@univ.edu", phoneNo: 1234567892, designation: "Professor" },
    //     { facultyID: "P004", name: "Dr. Dave", email: "dave@univ.edu", phoneNo: 1234567893, designation: "Lecturer" }
    // ];

    // const hashedProfs = await Promise.all(profData.map(async (prof) => {
    //     const password = await bcrypt.hash("password123", 10);
    //     return Prof.create({
    //         ...prof,
    //         dept: cseDept._id,
    //         password,
    //         section: []
    //     });
    // }));

    // // 4. Create Course with 8 COs
    // const coStatements = Array.from({ length: 8 }, (_, i) => ({
    //     description: `CO${i + 1} - Understand concept ${i + 1}`,
    //     bloomsLevel: ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"][i % 6]
    // }));

    // const course = await Course.create({
    //     courseID: "CS401",
    //     name: "Operating Systems",
    //     type: "Core",
    //     coordinator: hashedProfs[0]._id,
    //     program: "BTech CSE",
    //     sem: "4",
    //     year: 2025,
    //     oddEven: "Even",
    //     dept: cseDept._id,
    //     coStatements
    // });

    // // 5. Update department with the course
    // cseDept.courses.push(course._id);
    // await cseDept.save();

    // // 6. Assign each professor to a section
    // for (let i = 0; i < sections.length; i++) {
    //     const role = i === 0 ? "coordinator" : "professor";
    //     hashedProfs[i].section.push({
    //         course: course._id,
    //         section: sections[i]._id,
    //         role
    //     });
    //     await hashedProfs[i].save();
    // }

    // // Final output
    // console.log("\n🎓 Department:");
    // console.log(await Dept.findById(cseDept._id).populate("courses"));

    // console.log("\n📚 Course:");
    // console.log(await Course.findById(course._id).populate("coordinator"));

    // console.log("\n👨‍🏫 Professors:");
    // for (let prof of hashedProfs) {
    //     console.log(await Prof.findById(prof._id).populate("section.course section.section"));
    // }

    // console.log("\n🏫 Sections:");
    // console.log(await Section.find({ dept: cseDept._id }));

    await mongoose.disconnect();
}

populate().catch(err => {
    console.error("Error populating data:", err);
});

