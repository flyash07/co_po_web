const Professor = require('../models/proffesorModel')
const Dept = require('../models/departmentModel');
const Section =require('../models/sectionModel');
const Course =require('../models/courseModel');
const Students =require('../models/studentModel');
const courseSection =require('../models/courseSection');
const bcrypt=require('bcrypt')

//Adding new faculty using Excel
module.exports.addFaculty =  async (req, res) => {
    try
    {
        const facultyData = req.body;

        // Validate input format
        if (!Array.isArray(facultyData)) {
            return res.status(400).json({
                error: 'Invalid request format - expected array of faculty objects',
            });
        }

        const processedFaculty = await Promise.all(facultyData.map(async (faculty) => {
            // Validate required fields
            const requiredFields = ['facultyID', 'email', 'name', 'dept', 'password'];
            const missingFields = requiredFields.filter(field => !(field in faculty));
            
            if (missingFields.length > 0) {
                throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
            }

            // Convert department code to ObjectId
            const department = await Dept.findOne({ name: faculty.dept });
            if (!department) {
                throw new Error(`Invalid department name: ${faculty.dept}`);
            }

            // Check for existing faculty
            const existingFaculty = await Professor.findOne({
                $or: [
                    { facultyID: faculty.facultyID },
                    { email: faculty.email }
                ]
            });

            if (existingFaculty) {
                throw new Error(`Faculty with ID ${faculty.facultyID} or email ${faculty.email} already exists`);
            }

            // Prepare new faculty document
            return new Professor({
                facultyID: faculty.facultyID,
                name: faculty.name,
                email: faculty.email.toLowerCase(),
                phoneNo: faculty.phoneNo,
                designation: faculty.designation,
                dept: department._id,
                password: await bcrypt.hash(faculty.password,10),
                section: [],
                hasTaught: []
            });
        }));

        // Insert all faculty members
        const result = await Professor.insertMany(processedFaculty);
        console.log("faculty members added successfully");
        res.status(201).json({
            message: `${result.length} faculty members added successfully`,
        });
    }catch(err){
        console.log(err)
        res.status(500).json({'error':"InternalServerError"})
    } 
};

//Adding new section using Excel
module.exports.addSection =  async (req, res) => {
    try
    {
        const sectionData = req.body;

        // Validate input format
        if (!Array.isArray(sectionData)) {
            return res.status(400).json({
                error: 'Invalid request format - expected array of section objects',
            });
        }

        const processedSection = await Promise.all(sectionData.map(async (section) => {
            // Validate required fields
            const requiredFields = ['name', 'dept', 'program', 'batch', 'sem'];
            const missingFields = requiredFields.filter(field => !(field in section));
            
            if (missingFields.length > 0) {
                throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
            }

            // Convert department code to ObjectId
            const department = await Dept.findOne({ name: section.dept });
            if (!department) {
                throw new Error(`Invalid department name: ${section.dept}`);
            }

            // Check for existing faculty
            const existingSection = await Section.findOne({
                    name: section.name ,
                    batch: section.batch,
                    sem: section.sem,
            });

            if (existingSection) {
                throw new Error(`Section ${section.name} in semester ${section.sem} for batch ${section.batch} already exists`);
            }

            // Prepare new faculty document
            return new Section({
                name: section.name,
                dept: department._id,
                program: section.program,
                batch: section.batch,
                sem: section.sem,
            });
        }));

        // Insert all faculty members
        const result = await Section.insertMany(processedSection);
        console.log("sections added successfully");
        res.status(201).json({
            message: `${result.length} sections added successfully`,
        });
    }catch(err){
        console.log(err)
        res.status(500).json({'error':"InternalServerError"})
    } 
};

//Adding new courses using Excel
module.exports.addCourse =  async (req, res) => {
    try
    {
        const courseData = req.body;

        // Validate input format
        if (!Array.isArray(courseData)) {
            return res.status(400).json({
                error: 'Invalid request format - expected array of course objects',
            });
        }

        const processedCourse = await Promise.all(courseData.map(async (course) => {
            // Validate required fields
            const requiredFields = ['name', 'courseID', 'type', 'program', 'sem', 'year', 'oddEven', 'dept', 'coStatements'];
            const missingFields = requiredFields.filter(field => !(field in course));
            
            if (missingFields.length > 0) {
                throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
            }

            // Convert department code to ObjectId
            const department = await Dept.findOne({ name: course.dept });
            if (!department) {
                throw new Error(`Invalid department name: ${course.dept}`);
            }

            // Check for existing course
            const existingCourse = await Course.findOne({
                $or: [
                    { courseID: course.courseID },
                ]
            });

            if (existingCourse) {
                throw new Error(`Course with ID ${course.courseID} already exists`);
            }

            //pre-processing for CO-Statements
            //format: statement-blooms, statement-blooms, ....
            const processedStatements = processCOStatements(course.coStatements);

            // Prepare new course document
            return new Course({
                name: course.name,
                courseID: course.courseID,
                type: course.type,
                program: course.program,
                sem: course.sem,
                year: course.year,
                oddEven: course.oddEven,
                dept: department._id,
                coStatements: processedStatements
            });
        }));

        // Insert all courses
        const result = await Course.insertMany(processedCourse);
        console.log("courses added successfully");
        res.status(201).json({
            message: `${result.length} courses added successfully`,
        });
    }catch(err){
        console.log(err)
        res.status(500).json({'error':"InternalServerError"})
    } 
};

//helper for pre-processing CO statments for course
const processCOStatements = (inputString) => {
    try {
        let processed = [];
        
        // Only process if valid string input
        if (typeof inputString === 'string' && inputString.trim()) {
            processed = inputString.split(', ')
                .map(pair => {
                    const [description, bloomsLevel] = pair.split('-');
                    return {
                        description: (description || '').trim(),
                        bloomsLevel: (bloomsLevel || '').trim()
                    };
                })
                .filter(item => item.description && item.bloomsLevel);
        }

        // Ensure minimum 8 pairs with empty defaults
        while (processed.length < 8) {
            processed.push({ 
                description: '', 
                bloomsLevel: '' 
            });
        }

        return processed;
    } catch (error) {
        console.error('Error processing CO statements:', error);
        // Return empty array with 8 pairs even on error
        return Array(8).fill({ description: '', bloomsLevel: '' });
    }
};

//Adding new students using Excel
module.exports.addStudents =  async (req, res) => {
    try
    {
        const studentsData = req.body;

        // Validate input format
        if (!Array.isArray(studentsData)) {
            return res.status(400).json({
                error: 'Invalid request format - expected array of student objects',
            });
        }

        const processedStudent = await Promise.all(studentsData.map(async (student) => {
            // Validate required fields
            const requiredFields = ['name', 'regNo', 'dept', 'program', 'batch', 'sem', 'section', 'courses'];
            const missingFields = requiredFields.filter(field => !(field in student));
            
            if (missingFields.length > 0) {
                throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
            }

            // Convert department code to ObjectId
            const department = await Dept.findOne({ name: student.dept });
            if (!department) {
                throw new Error(`Invalid department name: ${student.dept}`);
            }

            const section = await Section.findOne({
                program: student.program,
                batch: String(student.batch),  
                sem: String(student.sem),      
                name: student.section          
            }).lean();


            if (!section) {
                throw new Error(`Section does not exist`);
            }

            const courseCodes = student.courses.split(',').map(code => code.trim()).filter(code => code !== '');
            
            const current_courses = []
            for(let i = 0; i < courseCodes.length; i++)
            {
                courseCode = courseCodes[i];
                const course = await Course.findOne({ courseID: courseCode });
                if (!course) {
                    throw new Error(`Course not found for code: ${courseCode}`);
                }
                current_courses.push(
                    course._id,
                );
            }

            // Prepare new student document
            return new Students({
                name: student.name,
                regNo: student.regNo,
                dept: department._id,
                program: student.program,
                batch: student.batch,
                sem: student.sem,
                section: section._id,
                currentCourses: current_courses
            });
        }));

        // Insert all students
        const result = await Students.insertMany(processedStudent);
        console.log("students added successfully");
        res.status(201).json({
            message: `${result.length} students added successfully`,
        });
    }catch(err){
        console.log(err)
        res.status(500).json({'error':"InternalServerError"})
    } 
};

//course allocation using Excel
module.exports.courseAllocation =  async (req, res) => {
    try
    {
        const allocationData = req.body;

        // Validate input format
        if (!Array.isArray(allocationData)) {
            return res.status(400).json({
                error: 'Invalid request format - expected array of objects',
            });
        }

        const processedCourseSection = await Promise.all(allocationData.map(async (allocation) => {
            // Validate required fields
            const requiredFields = ['facultyID', 'name', 'courseID', 'section', 'dept', 'program', 'batch', 'sem', 'role'];
            const missingFields = requiredFields.filter(field => !(field in allocation));
            
            if (missingFields.length > 0) {
                throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
            }

            // Convert department code to ObjectId
            const department = await Dept.findOne({ name: allocation.dept });
            if (!department) {
                throw new Error(`Invalid department name: ${student.dept}`);
            }

            const section = await Section.findOne({
                program: allocation.program,
                batch: String(allocation.batch),  
                sem: String(allocation.sem),      
                name: allocation.section,
                dept: department._id,          
            }).lean();
            if (!section) {
                throw new Error(`Section does not exist`);
            }

            const course = await Course.findOne({ courseID: allocation.courseID });
            if (!course) {
                throw new Error(`Course not found for code: ${courseCode}`);
            }

            const prof = await Professor.findOne({ facultyID: allocation.facultyID });
            if (!prof) {
                throw new Error(`Faculty not found for ID: ${allocation.facultyID}`);
            }

            const newSectionEntry = {
                course: course._id,
                section: section._id,
                role: allocation.role
            };

            // Check for existing entry to avoid duplicates
            const exists = prof.section.some(entry => 
                entry.course.equals(course._id) &&
                entry.section.equals(section._id) &&
                entry.role === allocation.role
            );

            if (!exists) {
                prof.section.push(newSectionEntry);
                await prof.save();
            }

            // Prepare new courseSection document
            return new courseSection({
                courseId: course._id,
                sectionId: section._id,
            });
        }));

        // Insert all courseSections
        const result = await courseSection.insertMany(processedCourseSection);
        console.log("courseSections added successfully");
        res.status(201).json({
            message: `${result.length} courseSections added successfully`,
        });
    }catch(err){
        console.log(err)
        res.status(500).json({'error':"InternalServerError"})
    } 
};

