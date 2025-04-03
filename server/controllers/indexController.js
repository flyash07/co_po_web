const bcrypt=require('bcrypt')
let profModel=require('../models/proffesorModel')
const { generateToken } = require('../utils/generateToken')
const { getCourseNameById } = require('../utils/getCourseNameById')

module.exports.login=async (req,res)=>{
    console.log("hell")
    let {email,password}=req.body
    let user=await profModel.findOne({email:email})
    if(!user)
        return res.status(401).json({ message: 'Invalid email or password' })
    const result=await bcrypt.compare(password,user.password)
    if(!result)
        return res.status(401).json({ message: 'Invalid email or password' })
    let temp=user.currentlyTeaching
    console.log(temp)
    const courseNames=[]
    for(let i=0;i<temp.length;i++){
        courseNames.push(await getCourseNameById(temp[i]));
    }

    output={
        'name':user.name,
        'email':user.email,
        'courseNames':courseNames
    }

    let token=generateToken(user)
    res.cookie("token",token)
    res.status(200).json({ token, output })
}
