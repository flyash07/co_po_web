const bcrypt=require('bcrypt')
let profModel=require('../models/proffesorModel')
const sectionModel=require('../models/sectionModel')
const { generateToken } = require('../utils/generateToken')
const { getCourseNameById } = require('../utils/getCourseNameById')
const courseModel = require('../models/courseModel')

module.exports.login=async (req,res)=>{
    console.log("hell")
    let {email,password}=req.body
    console.log(email, password)
    let user=await profModel.findOne({email:email})
    if(!user)
        return res.status(401).json({ message: 'Invalid email or password' })
    const result=await bcrypt.compare(password,user.password)
    if(!result)
        return res.status(401).json({ message: 'Invalid email or password' })
    let temp=user.section
    console.log(temp)
    const courseNames=[]
    for (let i = 0; i < temp.length; i++) {
        const courseId = temp[i].course;
        const sectionId=temp[i].section
        const course=await courseModel.findById(courseId)
        const section= await sectionModel.findById(sectionId)
        courseNames.push({ id: courseId, name: course.name,sem:course.sem,secName:section.name,role:temp[i].role});
    }

    output={
        'name':user.name,
        'designation':user.designation,
        'code':user.facultyID,
        'email':user.email,
        'courseNames':courseNames
    }

    let token=generateToken(user)
    res.cookie("token",token)
    console.log(token)
    res.status(200).json({ token, output })
}

module.exports.logout=async (req,res)=>{
    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'None' });
    res.status(200).json({ message: 'Logged out successfully' });
}

module.exports.courseDet=async(req,res)=>{
    const {courseId}=req.query
    const course=await courseModel.findById(courseId)
    data={
        coSet:course.coSet,
        copoSet:course.copoSet
    }
    res.status(200).json(data)
}