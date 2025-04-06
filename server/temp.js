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

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Prof = require("./models/proffesorModel");
const Course = require("./models/courseModel");
const Section = require("./models/sectionModel");
const Dept = require("./models/departmentModel"); // assuming you'll use some dept

async function createProfWithCourseAndSection() {
    try {
        await mongoose.connect("mongodb://localhost:27017/copo");

        // Use an existing dept or create one for demo
        let dept = await Dept.findOne();
        if (!dept) {
            dept = await Dept.create({ name: "CSE" });
        }

        const hashedPassword = await bcrypt.hash("pass", 10);

        // Create professor
        const prof = await Prof.create({
            facultyID: "pp01",
            name: "pp",
            email: "pp@university.edu",
            phoneNo: 1234567890,
            dept: dept._id,
            password: hashedPassword
        });

        // Create course
        const course = await Course.create({
            courseID: "CS101",
            name: "Intro to CS",
            type: "Theory",
            coordinator: prof._id,
            program: "B.Tech",
            sem: "2",
            year: 2025,
            oddEven: "Even",
            dept: dept._id
        });

        // Add course to dept and prof
        dept.courses.push(course._id);
        await dept.save();

        prof.currentlyTeaching.push(course._id);
        prof.hasTaught.push(course._id);
        await prof.save();

        // Create section
        const section = await Section.create({
            name: "A",
            dept: dept._id,
            program: "B.Tech",
            batch: "2024",
            sem: "2"
        });

        // Link section to prof
        prof.section.push({
            course: course._id,
            section: section._id
        });
        await prof.save();

        console.log("Professor, course, and section created successfully.");
        mongoose.disconnect();
    } catch (err) {
        console.error("Error:", err);
        mongoose.disconnect();
    }
}

createProfWithCourseAndSection();

