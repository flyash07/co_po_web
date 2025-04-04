// test-models.js
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt=require('bcrypt')

// Import all models
const Course = require('../models/courseModel');
const Department = require('../models/departmentModel');
const Marks = require('../models/marksModel');
const Professor = require('../models/proffesorModel');
const Section = require('../models/sectionModel');
const Student = require('../models/studentModel');

// // Database connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/education_db')
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

module.exports.test=async function testModels() {
  try {
  // Clear existing data
  await Department.deleteMany({});
  await Professor.deleteMany({});
  await Student.deleteMany({});
  await Course.deleteMany({});
  await Section.deleteMany({});
  await Marks.deleteMany({});

  console.log('Previous data cleared. Populating database...');

  // Create department
  const department = await Department.create({
      name: 'Computer Science and Engineering',
      poStatements: [
          { description: 'Apply knowledge of computing fundamentals, computing specialization, mathematics, and domain knowledge for the solution of complex engineering problems.', number: 1 },
          { description: 'Identify, formulate, research literature, and analyze complex engineering problems.', number: 2 },
          { description: 'Design solutions for complex engineering problems and design system components or processes that meet the specified needs.', number: 3 },
          { description: 'Use research-based knowledge and methods including design of experiments, analysis and interpretation of data.', number: 4 },
          { description: 'Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools.', number: 5 },
          { description: 'Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues.', number: 6 },
          { description: 'Understand the impact of the professional engineering solutions in societal and environmental contexts.', number: 7 },
          { description: 'Apply ethical principles and commit to professional ethics and responsibilities.', number: 8 },
          { description: 'Function effectively as an individual, and as a member or leader in diverse teams.', number: 9 },
          { description: 'Communicate effectively on complex engineering activities with the engineering community and with society at large.', number: 10 },
          { description: 'Demonstrate knowledge and understanding of the engineering and management principles.', number: 11 },
          { description: 'Recognize the need for, and have the preparation and ability to engage in independent and life-long learning.', number: 12 }
      ]
  });

  // Create sections
  const sections = await Section.create([
      { name: 'CSE-A', dept: department._id, program: 'B.Tech', batch: '2023-27', sem: '4' },
      { name: 'CSE-B', dept: department._id, program: 'B.Tech', batch: '2023-27', sem: '4' },
      { name: 'CSE-C', dept: department._id, program: 'B.Tech', batch: '2023-27', sem: '4' }
  ]);

  // Create professors
  const professors = await Professor.create([
      { 
          facultyID: 'CSE001', 
          name: 'Dr. Rajesh Kumar', 
          email: 'rajesh.kumar@university.edu', 
          phoneNo: 9876543210, 
          dept: department._id,
          password: await bcrypt.hash('pass',10)
      },
      { 
          facultyID: 'CSE002', 
          name: 'Dr. Priya Singh', 
          email: 'priya.singh@university.edu', 
          phoneNo: 9876543211, 
          dept: department._id,
          password: await bcrypt.hash('pass',10)
      },
      { 
          facultyID: 'CSE003', 
          name: 'Dr. Amit Sharma', 
          email: 'amit.sharma@university.edu', 
          phoneNo: 9876543212, 
          dept: department._id,
          password: await bcrypt.hash('pass',10)
      },
      { 
          facultyID: 'CSE004', 
          name: 'Dr. Neha Verma', 
          email: 'neha.verma@university.edu', 
          phoneNo: 9876543213, 
          dept: department._id,
          password: await bcrypt.hash('pass',10)
      },
      { 
          facultyID: 'CSE005', 
          name: 'Dr. Suresh Patel', 
          email: 'suresh.patel@university.edu', 
          phoneNo: 9876543214, 
          dept: department._id,
          password: await bcrypt.hash('pass',10)
      }
  ]);

  // Set HOD
  department.hod = professors[0]._id;
  await department.save();

  // Create courses
  const courses = await Course.create([
      {
          courseID: 'CSE201',
          name: 'Data Structures and Algorithms',
          type: 'Theory',
          coordinator: professors[0]._id,
          program: 'B.Tech',
          sem: '4',
          year: 2025,
          oddEven: 'Even',
          coStatements: [
              { description: 'Understand and implement basic data structures', bloomsLevel: 'Apply' },
              { description: 'Analyze algorithm efficiency using Big-O notation', bloomsLevel: 'Analyze' },
              { description: 'Design and implement searching and sorting algorithms', bloomsLevel: 'Create' },
              { description: 'Apply appropriate data structures for problem-solving', bloomsLevel: 'Apply' },
              { description: 'Develop solutions using advanced data structures like graphs and trees', bloomsLevel: 'Create' }
          ],
          dept: department._id,
          ass1: [
              { qNo: 1, part: 'a', co: 1, maxMarks: 5 },
              { qNo: 1, part: 'b', co: 1, maxMarks: 5 },
              { qNo: 2, part: 'a', co: 2, maxMarks: 5 },
              { qNo: 2, part: 'b', co: 2, maxMarks: 5 }
          ],
          ass2: [
              { qNo: 1, part: 'a', co: 2, maxMarks: 5 },
              { qNo: 1, part: 'b', co: 3, maxMarks: 5 },
              { qNo: 2, part: 'a', co: 3, maxMarks: 5 },
              { qNo: 2, part: 'b', co: 3, maxMarks: 5 }
          ],
          ass3: [
              { qNo: 1, part: 'a', co: 4, maxMarks: 5 },
              { qNo: 1, part: 'b', co: 4, maxMarks: 5 },
              { qNo: 2, part: 'a', co: 5, maxMarks: 5 },
              { qNo: 2, part: 'b', co: 5, maxMarks: 5 }
          ],
          midSem: [
              { qNo: 1, part: 'a', co: 1, maxMarks: 5 },
              { qNo: 1, part: 'b', co: 1, maxMarks: 5 },
              { qNo: 2, part: 'a', co: 2, maxMarks: 10 },
              { qNo: 3, part: 'a', co: 3, maxMarks: 10 },
              { qNo: 4, part: 'a', co: 3, maxMarks: 10 }
          ],
          endSem: [
              { qNo: 1, part: 'a', co: 1, maxMarks: 10 },
              { qNo: 1, part: 'b', co: 2, maxMarks: 10 },
              { qNo: 2, part: 'a', co: 3, maxMarks: 10 },
              { qNo: 2, part: 'b', co: 3, maxMarks: 10 },
              { qNo: 3, part: 'a', co: 4, maxMarks: 10 },
              { qNo: 3, part: 'b', co: 4, maxMarks: 10 },
              { qNo: 4, part: 'a', co: 5, maxMarks: 10 },
              { qNo: 4, part: 'b', co: 5, maxMarks: 10 }
          ],
          coPoMapping: [
              { coNum: 1, poNum: 1, value: 3 },
              { coNum: 1, poNum: 2, value: 2 },
              { coNum: 2, poNum: 1, value: 3 },
              { coNum: 2, poNum: 2, value: 3 },
              { coNum: 3, poNum: 3, value: 3 },
              { coNum: 4, poNum: 4, value: 2 },
              { coNum: 5, poNum: 5, value: 3 }
          ],
          coPsoMapping: [
              { coNum: 1, psoNum: 1, value: 3 },
              { coNum: 2, psoNum: 1, value: 3 },
              { coNum: 3, psoNum: 2, value: 2 },
              { coNum: 4, psoNum: 2, value: 3 },
              { coNum: 5, psoNum: 3, value: 3 }
          ]
      },
      {
          courseID: 'CSE202',
          name: 'Database Management Systems',
          type: 'Theory and Lab',
          coordinator: professors[1]._id,
          program: 'B.Tech',
          sem: '4',
          year: 2025,
          oddEven: 'Even',
          coStatements: [
              { description: 'Understand database concepts and models', bloomsLevel: 'Understand' },
              { description: 'Design and normalize relational database schemas', bloomsLevel: 'Create' },
              { description: 'Implement and query databases using SQL', bloomsLevel: 'Apply' },
              { description: 'Analyze and optimize database performance', bloomsLevel: 'Analyze' },
              { description: 'Apply transaction management and concurrency control techniques', bloomsLevel: 'Apply' }
          ],
          dept: department._id,
          ass1: [
              { qNo: 1, part: 'a', co: 1, maxMarks: 5 },
              { qNo: 1, part: 'b', co: 1, maxMarks: 5 },
              { qNo: 2, part: 'a', co: 2, maxMarks: 5 },
              { qNo: 2, part: 'b', co: 2, maxMarks: 5 }
          ],
          ass2: [
              { qNo: 1, part: 'a', co: 3, maxMarks: 5 },
              { qNo: 1, part: 'b', co: 3, maxMarks: 5 },
              { qNo: 2, part: 'a', co: 3, maxMarks: 5 },
              { qNo: 2, part: 'b', co: 3, maxMarks: 5 }
          ],
          ass3: [
              { qNo: 1, part: 'a', co: 4, maxMarks: 5 },
              { qNo: 1, part: 'b', co: 4, maxMarks: 5 },
              { qNo: 2, part: 'a', co: 5, maxMarks: 5 },
              { qNo: 2, part: 'b', co: 5, maxMarks: 5 }
          ],
          midSem: [
              { qNo: 1, part: 'a', co: 1, maxMarks: 5 },
              { qNo: 1, part: 'b', co: 1, maxMarks: 5 },
              { qNo: 2, part: 'a', co: 2, maxMarks: 10 },
              { qNo: 3, part: 'a', co: 3, maxMarks: 10 },
              { qNo: 4, part: 'a', co: 3, maxMarks: 10 }
          ],
          endSem: [
              { qNo: 1, part: 'a', co: 1, maxMarks: 10 },
              { qNo: 1, part: 'b', co: 2, maxMarks: 10 },
              { qNo: 2, part: 'a', co: 3, maxMarks: 10 },
              { qNo: 2, part: 'b', co: 3, maxMarks: 10 },
              { qNo: 3, part: 'a', co: 4, maxMarks: 10 },
              { qNo: 3, part: 'b', co: 4, maxMarks: 10 },
              { qNo: 4, part: 'a', co: 5, maxMarks: 10 },
              { qNo: 4, part: 'b', co: 5, maxMarks: 10 }
          ],
          coPoMapping: [
              { coNum: 1, poNum: 1, value: 3 },
              { coNum: 1, poNum: 2, value: 2 },
              { coNum: 2, poNum: 3, value: 3 },
              { coNum: 3, poNum: 5, value: 3 },
              { coNum: 4, poNum: 4, value: 3 },
              { coNum: 5, poNum: 5, value: 2 }
          ],
          coPsoMapping: [
              { coNum: 1, psoNum: 1, value: 3 },
              { coNum: 2, psoNum: 1, value: 3 },
              { coNum: 3, psoNum: 2, value: 2 },
              { coNum: 4, psoNum: 2, value: 3 },
              { coNum: 5, psoNum: 3, value: 3 }
          ]
      },
      // Additional courses would follow the same pattern...
  ]);

  // Update department courses
  department.courses = courses.map(course => course._id);
  await department.save();

  // Update professor section and course teaching
  for (let i = 0; i < professors.length; i++) {
      const courseTeaching = [];
      const sectionAssignments = [];
      
      for (let j = 0; j < courses.length; j++) {
          courseTeaching.push(courses[j]._id);
          
          // Assign each professor to teach a section for each course
          const sectionIndex = j % sections.length;
          sectionAssignments.push({
              course: courses[j]._id,
              section: sections[sectionIndex]._id
          });
      }
      
      professors[i].currentlyTeaching = courseTeaching;
      professors[i].section = sectionAssignments;
      await professors[i].save();
  }

  // Create students
  const students = [];
  for (let i = 0; i < 30; i++) {
      const sectionIndex = i % sections.length;
      const currentCourses = courses.map(course => course._id);
      
      const student = await Student.create({
          regNo: 2300000 + i,
          name: `Student ${i+1}`,
          section: sections[sectionIndex]._id,
          currentCourses: currentCourses,
          prevCourses: [],
          reRegisteredCourses: []
      });
      
      students.push(student);
  }

  // Create marks for students
  for (let i = 0; i < students.length; i++) {
      for (let j = 0; j < courses.length; j++) {
          // Create realistic marks for each assessment
          const ass1Marks = courses[j].ass1.map(q => ({
              qNo: q.qNo,
              part: q.part,
              co: q.co,
              maxMarks: q.maxMarks
          }));
          
          // Additional assessment marks would follow the same pattern...
          
          // Add student feedback for each CO
          const feedback = [];
          for (let k = 1; k <= 5; k++) {
              feedback.push({
                  coNum: k,
                  value: Math.floor(Math.random() * 5) + 1 // Random value 1-5
              });
          }
          
          await Marks.create({
              student: students[i]._id,
              course: courses[j]._id,
              ass1: ass1Marks,
              // Additional assessment data would be added here...
              feedback: feedback
          });
      }
  }

  console.log('Database populated successfully!');
  return {
      department,
      professors,
      courses,
      sections,
      students,
      message: 'Database populated successfully!'
  };
} catch (error) {
  console.error('Error populating database:', error);
  throw error;
}
}