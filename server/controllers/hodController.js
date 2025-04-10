
const Professor = require('../models/proffesorModel')
const Dept = require('../models/departmentModel');
const Section =require('../models/sectionModel');
const Course =require('../models/courseModel');
const Students =require('../models/studentModel');

module.exports.viewFaculty =  async (req, res) => {
    try
    {
        const department = req.user.dept;
        const allfaculty = await Professor.find({dept: department})
        allfacultynames = []
        for(let i = 0; i < allfaculty.length; i++)
        {
            allfacultynames.push({
                facultyID: allfaculty[i].facultyID,
                name: allfaculty[i].name
            });
        }
        res.status(200).json(allfacultynames);
    }catch(err){
        console.log(err)
        res.status(500).json({'error':"InternalServerError"})
    } 
};


module.exports.viewStudents = async(req, res) => {
    try
    {
        const department = req.user.dept;
        const allsections = await Section.find({dept: department});
        const sectionIds = allsections.map(sect => sect._id);

        // Find students whose 'section' field matches any of these IDs
        const departmentStudents = await Students.find({
        section: { $in: sectionIds }
        }).exec();

        allStudentNames = []
        for(let i = 0; i < departmentStudents.length; i++)
        {
            allStudentNames.push({
                regNo: departmentStudents[i].regNo,
                name: departmentStudents[i].name
            });
        }

        res.status(200).json(allStudentNames);

    }catch(err)
    {
        console.log(err);
        res.status(500).json({'error': "InternalServerError"})
    }
};