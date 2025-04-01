// test-models.js
const mongoose = require('mongoose');
require('dotenv').config();

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
    // Clear previous test data
    await Department.deleteMany({});
    await Course.deleteMany({});
    await Professor.deleteMany({});
    await Section.deleteMany({});
    await Student.deleteMany({});
    await Marks.deleteMany({});

    console.log('Creating complex meaningful test data...');

    // Create Departments
    const csDepartment = new Department({
      name: 'Computer Science & Engineering',
      poStatements: [
        { description: 'Apply knowledge of computing fundamentals, algorithmic principles, and computer science theory', number: 1 },
        { description: 'Design and conduct experiments, as well as analyze and interpret data', number: 2 },
        { description: 'Design a system, component, or process to meet desired needs within realistic constraints', number: 3 },
        { description: 'Function effectively on multi-disciplinary teams', number: 4 },
        { description: 'Identify, formulate, and solve engineering problems', number: 5 },
        { description: 'Understand professional and ethical responsibility', number: 6 },
        { description: 'Communicate effectively with a range of audiences', number: 7 },
        { description: 'Recognize the need for and ability to engage in life-long learning', number: 8 }
      ]
    });
    await csDepartment.save();
    
    const eceDepartment = new Department({
      name: 'Electronics & Communication Engineering',
      poStatements: [
        { description: 'Apply knowledge of mathematics, science, and engineering', number: 1 },
        { description: 'Design and conduct experiments, as well as analyze and interpret data', number: 2 },
        { description: 'Design a system, component, or process to meet desired needs', number: 3 },
        { description: 'Identify, formulate, and solve engineering problems', number: 4 },
        { description: 'Use techniques, skills, and modern engineering tools', number: 5 }
      ]
    });
    await eceDepartment.save();
    
    const mechDepartment = new Department({
      name: 'Mechanical Engineering',
      poStatements: [
        { description: 'Apply knowledge of mathematics, science, and engineering', number: 1 },
        { description: 'Design and conduct experiments, as well as analyze and interpret data', number: 2 },
        { description: 'Design mechanical systems within realistic constraints', number: 3 },
        { description: 'Identify and solve mechanical engineering problems', number: 4 }
      ]
    });
    await mechDepartment.save();

    // Create professors with varied roles and departments
    const professors = [
      {
        facultyID: 'CSE001',
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh.kumar@university.edu',
        phoneNo: 9876543210,
        dept: csDepartment._id,
        password: 'hashed_password_here',
      },
      {
        facultyID: 'CSE002',
        name: 'Dr. Priya Sharma',
        email: 'priya.sharma@university.edu',
        phoneNo: 9876543211,
        dept: csDepartment._id,
        password: 'hashed_password_here',
      },
      {
        facultyID: 'CSE003',
        name: 'Dr. Vikram Singh',
        email: 'vikram.singh@university.edu',
        phoneNo: 9876543212,
        dept: csDepartment._id,
        password: 'hashed_password_here',
      },
      {
        facultyID: 'ECE001',
        name: 'Dr. Ananya Mishra',
        email: 'ananya.mishra@university.edu',
        phoneNo: 9876543213,
        dept: eceDepartment._id,
        password: 'hashed_password_here',
      },
      {
        facultyID: 'ECE002',
        name: 'Dr. Rajeev Gupta',
        email: 'rajeev.gupta@university.edu',
        phoneNo: 9876543214,
        dept: eceDepartment._id,
        password: 'hashed_password_here',
      },
      {
        facultyID: 'MECH001',
        name: 'Dr. Sanjay Verma',
        email: 'sanjay.verma@university.edu',
        phoneNo: 9876543215,
        dept: mechDepartment._id,
        password: 'hashed_password_here',
      }
    ];
    
    const professorDocs = await Professor.insertMany(professors);
    
    // Set HODs for departments
    csDepartment.hod = professorDocs[0]._id;
    await csDepartment.save();
    
    eceDepartment.hod = professorDocs[3]._id;
    await eceDepartment.save();
    
    mechDepartment.hod = professorDocs[5]._id;
    await mechDepartment.save();
    
    // Create courses for Computer Science
    const csCourses = [
      {
        courseID: 'CS201',
        name: 'Data Structures and Algorithms',
        type: 'Theory with Lab',
        coordinator: professorDocs[0]._id,
        program: 'B.Tech',
        sem: '3',
        year: 2024,
        oddEven: 'Odd',
        dept: csDepartment._id,
        coStatements: [
          { description: 'Understand basic data structures and their implementations', bloomsLevel: 'Understanding' },
          { description: 'Implement advanced data structures like trees and graphs', bloomsLevel: 'Application' },
          { description: 'Analyze time and space complexity of algorithms', bloomsLevel: 'Analysis' },
          { description: 'Apply appropriate data structures to solve computational problems', bloomsLevel: 'Application' },
          { description: 'Design efficient algorithms using appropriate data structures', bloomsLevel: 'Creating' }
        ],
        coAttainment: [
          { 
            targetSet: 70,
            direct: { inSem: 65, endSem: 72, finalCo: 68 },
            overall: { inSem: 67, endSem: 74, finalCo: 70 }
          }
        ],
        coPoMapping: [
          { coNum: 1, poNum: 1, value: 3 },
          { coNum: 2, poNum: 3, value: 2 },
          { coNum: 3, poNum: 5, value: 3 },
          { coNum: 4, poNum: 1, value: 2 },
          { coNum: 5, poNum: 3, value: 3 }
        ],
        coPsoMapping: [
          { coNum: 1, psoNum: 1, value: 2 },
          { coNum: 2, psoNum: 2, value: 3 }
        ],
        ass1: [
          { qNo: 1, part: 'A', co: 1, maxMarks: 5 },
          { qNo: 2, part: 'A', co: 2, maxMarks: 5 },
          { qNo: 3, part: 'A', co: 3, maxMarks: 10 }
        ],
        ass2: [
          { qNo: 1, part: 'A', co: 3, maxMarks: 5 },
          { qNo: 1, part: 'B', co: 4, maxMarks: 5 },
          { qNo: 2, part: 'A', co: 5, maxMarks: 10 }
        ],
        midSem: [
          { qNo: 1, part: 'A', co: 1, maxMarks: 10 },
          { qNo: 1, part: 'B', co: 2, maxMarks: 15 },
          { qNo: 2, part: 'A', co: 3, maxMarks: 15 },
          { qNo: 2, part: 'B', co: 4, maxMarks: 10 }
        ],
        endSem: [
          { qNo: 1, part: 'A', co: 1, maxMarks: 10 },
          { qNo: 1, part: 'B', co: 2, maxMarks: 10 },
          { qNo: 2, part: 'A', co: 3, maxMarks: 15 },
          { qNo: 2, part: 'B', co: 4, maxMarks: 15 },
          { qNo: 3, part: 'A', co: 5, maxMarks: 10 }
        ]
      },
      {
        courseID: 'CS301',
        name: 'Database Management Systems',
        type: 'Theory with Lab',
        coordinator: professorDocs[1]._id,
        program: 'B.Tech',
        sem: '5',
        year: 2024,
        oddEven: 'Odd',
        dept: csDepartment._id,
        coStatements: [
          { description: 'Understand database concepts and models', bloomsLevel: 'Understanding' },
          { description: 'Design and implement database schemas using ER modeling', bloomsLevel: 'Creating' },
          { description: 'Implement and query databases using SQL', bloomsLevel: 'Application' },
          { description: 'Apply transaction management and concurrency control', bloomsLevel: 'Application' }
        ],
        ass1: [
          { qNo: 1, part: 'A', co: 1, maxMarks: 10 },
          { qNo: 2, part: 'A', co: 2, maxMarks: 10 }
        ],
        midSem: [
          { qNo: 1, part: 'A', co: 1, maxMarks: 15 },
          { qNo: 1, part: 'B', co: 2, maxMarks: 15 },
          { qNo: 2, part: 'A', co: 3, maxMarks: 20 }
        ]
      },
      {
        courseID: 'CS401',
        name: 'Machine Learning',
        type: 'Theory with Lab',
        coordinator: professorDocs[2]._id,
        program: 'B.Tech',
        sem: '7',
        year: 2024,
        oddEven: 'Odd',
        dept: csDepartment._id,
        coStatements: [
          { description: 'Understand fundamental machine learning concepts', bloomsLevel: 'Understanding' },
          { description: 'Implement supervised and unsupervised learning algorithms', bloomsLevel: 'Application' },
          { description: 'Evaluate and compare performance of different ML models', bloomsLevel: 'Evaluation' },
          { description: 'Apply appropriate ML techniques to real-world problems', bloomsLevel: 'Application' }
        ]
      }
    ];
    
    // Create courses for ECE Department
    const eceCourses = [
      {
        courseID: 'EC201',
        name: 'Digital Electronics',
        type: 'Theory with Lab',
        coordinator: professorDocs[3]._id,
        program: 'B.Tech',
        sem: '3',
        year: 2024,
        oddEven: 'Odd',
        dept: eceDepartment._id,
        coStatements: [
          { description: 'Understand digital logic and number systems', bloomsLevel: 'Understanding' },
          { description: 'Design combinational logic circuits', bloomsLevel: 'Creating' },
          { description: 'Analyze and design sequential logic circuits', bloomsLevel: 'Analysis' },
          { description: 'Implement digital circuits using standard ICs', bloomsLevel: 'Application' }
        ]
      },
      {
        courseID: 'EC301',
        name: 'Communication Systems',
        type: 'Theory',
        coordinator: professorDocs[4]._id,
        program: 'B.Tech',
        sem: '5',
        year: 2024,
        oddEven: 'Odd',
        dept: eceDepartment._id,
        coStatements: [
          { description: 'Understand fundamentals of analog and digital communication', bloomsLevel: 'Understanding' },
          { description: 'Analyze communication systems in time and frequency domains', bloomsLevel: 'Analysis' },
          { description: 'Design modulation and demodulation circuits', bloomsLevel: 'Creating' }
        ]
      }
    ];
    
    // Create courses for Mechanical Department
    const mechCourses = [
      {
        courseID: 'ME201',
        name: 'Thermodynamics',
        type: 'Theory',
        coordinator: professorDocs[5]._id,
        program: 'B.Tech',
        sem: '3',
        year: 2024,
        oddEven: 'Odd',
        dept: mechDepartment._id,
        coStatements: [
          { description: 'Understand laws of thermodynamics', bloomsLevel: 'Understanding' },
          { description: 'Apply thermodynamic principles to engineering problems', bloomsLevel: 'Application' },
          { description: 'Analyze thermodynamic cycles and their efficiency', bloomsLevel: 'Analysis' }
        ]
      }
    ];
    
    // Insert all courses
    const allCourses = [...csCourses, ...eceCourses, ...mechCourses];
    const courseDocs = await Course.insertMany(allCourses);
    
    // Update departments with courses
    csDepartment.courses = courseDocs.slice(0, 3).map(course => course._id);
    await csDepartment.save();
    
    eceDepartment.courses = courseDocs.slice(3, 5).map(course => course._id);
    await eceDepartment.save();
    
    mechDepartment.courses = [courseDocs[5]._id];
    await mechDepartment.save();
    
    // Update professors with courses
    professorDocs[0].currentlyTeaching = [courseDocs[0]._id];
    professorDocs[0].hasTaught = [courseDocs[1]._id];
    await professorDocs[0].save();
    
    professorDocs[1].currentlyTeaching = [courseDocs[1]._id];
    await professorDocs[1].save();
    
    professorDocs[2].currentlyTeaching = [courseDocs[2]._id];
    await professorDocs[2].save();
    
    professorDocs[3].currentlyTeaching = [courseDocs[3]._id];
    await professorDocs[3].save();
    
    professorDocs[4].currentlyTeaching = [courseDocs[4]._id];
    await professorDocs[4].save();
    
    professorDocs[5].currentlyTeaching = [courseDocs[5]._id];
    await professorDocs[5].save();
    
    // Create sections across departments and years
    const sections = [
      // CS Department
      {
        name: 'CSE-2A',
        dept: csDepartment._id,
        program: 'B.Tech',
        batch: '2023',
        sem: '3'
      },
      {
        name: 'CSE-2B',
        dept: csDepartment._id,
        program: 'B.Tech',
        batch: '2023',
        sem: '3'
      },
      {
        name: 'CSE-3A',
        dept: csDepartment._id,
        program: 'B.Tech',
        batch: '2022',
        sem: '5'
      },
      {
        name: 'CSE-4A',
        dept: csDepartment._id,
        program: 'B.Tech',
        batch: '2021',
        sem: '7'
      },
      // ECE Department
      {
        name: 'ECE-2A',
        dept: eceDepartment._id,
        program: 'B.Tech',
        batch: '2023',
        sem: '3'
      },
      {
        name: 'ECE-3A',
        dept: eceDepartment._id,
        program: 'B.Tech',
        batch: '2022',
        sem: '5'
      },
      // Mechanical Department
      {
        name: 'ME-2A',
        dept: mechDepartment._id,
        program: 'B.Tech',
        batch: '2023',
        sem: '3'
      }
    ];
    
    const sectionDocs = await Section.insertMany(sections);
    
    // Create students with different scenarios
    const students = [
      // 2nd year CS students
      {
        regNo: 20230001,
        name: 'Ankit Patel',
        section: sectionDocs[0]._id,
        currentCourses: [courseDocs[0]._id],
        prevCourses: []
      },
      {
        regNo: 20230002,
        name: 'Neha Singh',
        section: sectionDocs[0]._id,
        currentCourses: [courseDocs[0]._id],
        prevCourses: []
      },
      {
        regNo: 20230025,
        name: 'Rahul Verma',
        section: sectionDocs[1]._id,
        currentCourses: [courseDocs[0]._id],
        prevCourses: []
      },
      
      // 3rd year CS students
      {
        regNo: 20220010,
        name: 'Priya Mehta',
        section: sectionDocs[2]._id,
        currentCourses: [courseDocs[1]._id],
        prevCourses: [courseDocs[0]._id]
      },
      {
        regNo: 20220011,
        name: 'Arjun Kumar',
        section: sectionDocs[2]._id,
        currentCourses: [courseDocs[1]._id],
        prevCourses: [courseDocs[0]._id]
      },
      
      // 4th year CS students
      {
        regNo: 20210005,
        name: 'Sneha Gupta',
        section: sectionDocs[3]._id,
        currentCourses: [courseDocs[2]._id],
        prevCourses: [courseDocs[0]._id, courseDocs[1]._id]
      },
      
      // ECE students
      {
        regNo: 20230100,
        name: 'Vikrant Sharma',
        section: sectionDocs[4]._id,
        currentCourses: [courseDocs[3]._id],
        prevCourses: []
      },
      {
        regNo: 20220100,
        name: 'Anjali Patel',
        section: sectionDocs[5]._id,
        currentCourses: [courseDocs[4]._id],
        prevCourses: [courseDocs[3]._id]
      },
      
      // ME student
      {
        regNo: 20230200,
        name: 'Rajat Singh',
        section: sectionDocs[6]._id,
        currentCourses: [courseDocs[5]._id],
        prevCourses: []
      },
      
      // Special cases - backlog/re-registered student
      {
        regNo: 20220050,
        name: 'Karan Malhotra',
        section: sectionDocs[2]._id,
        currentCourses: [courseDocs[1]._id],
        prevCourses: [],
        reRegisteredCourses: [courseDocs[0]._id]
      }
    ];
    
    const studentDocs = await Student.insertMany(students);
    
    // Create marks for students with varied performance
    const marksEntries = [
      // First year student - good performance
      {
        student: studentDocs[0]._id,
        course: courseDocs[0]._id,
        ass1: [
          { qNo: 1, part: 'A', co: 1, maxMarks: 5 },
          { qNo: 2, part: 'A', co: 2, maxMarks: 4 },
          { qNo: 3, part: 'A', co: 3, maxMarks: 9 }
        ],
        ass2: [
          { qNo: 1, part: 'A', co: 3, maxMarks: 4 },
          { qNo: 1, part: 'B', co: 4, maxMarks: 5 },
          { qNo: 2, part: 'A', co: 5, maxMarks: 9 }
        ],
        midSem: [
          { qNo: 1, part: 'A', co: 1, maxMarks: 9 },
          { qNo: 1, part: 'B', co: 2, maxMarks: 13 },
          { qNo: 2, part: 'A', co: 3, maxMarks: 14 },
          { qNo: 2, part: 'B', co: 4, maxMarks: 9 }
        ],
        feedback: [
          { coNum: 1, value: 5 },
          { coNum: 2, value: 4 },
          { coNum: 3, value: 5 },
          { coNum: 4, value: 4 },
          { coNum: 5, value: 5 }
        ]
      },
      
      // First year student - average performance
      {
        student: studentDocs[1]._id,
        course: courseDocs[0]._id,
        ass1: [
          { qNo: 1, part: 'A', co: 1, maxMarks: 3 },
          { qNo: 2, part: 'A', co: 2, maxMarks: 4 },
          { qNo: 3, part: 'A', co: 3, maxMarks: 7 }
        ],
        ass2: [
          { qNo: 1, part: 'A', co: 3, maxMarks: 3 },
          { qNo: 1, part: 'B', co: 4, maxMarks: 3 },
          { qNo: 2, part: 'A', co: 5, maxMarks: 6 }
        ],
        midSem: [
          { qNo: 1, part: 'A', co: 1, maxMarks: 6 },
          { qNo: 1, part: 'B', co: 2, maxMarks: 10 },
          { qNo: 2, part: 'A', co: 3, maxMarks: 9 },
          { qNo: 2, part: 'B', co: 4, maxMarks: 6 }
        ],
        feedback: [
          { coNum: 1, value: 3 },
          { coNum: 2, value: 4 },
          { coNum: 3, value: 3 },
          { coNum: 4, value: 3 },
          { coNum: 5, value: 4 }
        ]
      },
      
      // Third year student taking DBMS
      {
        student: studentDocs[3]._id,
        course: courseDocs[1]._id,
        ass1: [
          { qNo: 1, part: 'A', co: 1, maxMarks: 8 },
          { qNo: 2, part: 'A', co: 2, maxMarks: 9 }
        ],
        midSem: [
          { qNo: 1, part: 'A', co: 1, maxMarks: 12 },
          { qNo: 1, part: 'B', co: 2, maxMarks: 13 },
          { qNo: 2, part: 'A', co: 3, maxMarks: 17 }
        ],
        feedback: [
          { coNum: 1, value: 4 },
          { coNum: 2, value: 5 },
          { coNum: 3, value: 4 },
          { coNum: 4, value: 4 }
        ]
      },
      
      // Student with backlog
      {
        student: studentDocs[9]._id,
        course: courseDocs[0]._id, // DSA (backlog)
        ass1: [
          { qNo: 1, part: 'A', co: 1, maxMarks: 2 },
          { qNo: 2, part: 'A', co: 2, maxMarks: 1 },
          { qNo: 3, part: 'A', co: 3, maxMarks: 5 }
        ],
        midSem: [
          { qNo: 1, part: 'A', co: 1, maxMarks: 5 },
          { qNo: 1, part: 'B', co: 2, maxMarks: 7 },
          { qNo: 2, part: 'A', co: 3, maxMarks: 6 },
          { qNo: 2, part: 'B', co: 4, maxMarks: 4 }
        ],
        feedback: [
          { coNum: 1, value: 2 },
          { coNum: 2, value: 3 },
          { coNum: 3, value: 2 },
          { coNum: 4, value: 2 },
          { coNum: 5, value: 3 }
        ]
      },
      
      // Same student current course
      {
        student: studentDocs[9]._id,
        course: courseDocs[1]._id, // DBMS (current)
        ass1: [
          { qNo: 1, part: 'A', co: 1, maxMarks: 7 },
          { qNo: 2, part: 'A', co: 2, maxMarks: 6 }
        ],
        midSem: [
          { qNo: 1, part: 'A', co: 1, maxMarks: 11 },
          { qNo: 1, part: 'B', co: 2, maxMarks: 10 },
          { qNo: 2, part: 'A', co: 3, maxMarks: 14 }
        ],
        feedback: [
          { coNum: 1, value: 3 },
          { coNum: 2, value: 4 },
          { coNum: 3, value: 3 },
          { coNum: 4, value: 4 }
        ]
      }
    ];
    
    await Marks.insertMany(marksEntries);
    
    // Add section handling to professors
    professorDocs[0].section = [
      {
        course: courseDocs[0]._id,
        section: sectionDocs[0]._id
      },
      {
        course: courseDocs[0]._id,
        section: sectionDocs[1]._id
      }
    ];
    await professorDocs[0].save();
    
    professorDocs[1].section = [
      {
        course: courseDocs[1]._id,
        section: sectionDocs[2]._id
      }
    ];
    await professorDocs[1].save()
}