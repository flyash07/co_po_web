const userModel=require('../models/proffesorModel')
const jwt=require('jsonwebtoken')

module.exports.authUser=async (req,res,next)=>{
    const token=req.headers.authorization

    if(!token){
        return res.status(401).json({'message':"Unauthorized"})
    }

    try{
        const decoded=jwt.decode(token,process.env.JWT_KEY)
        const user=await userModel.findById(decoded.id)
        req.user=user
        next();
    }catch{
        return res.status(401).json({'message':"Unauthorized"})
    }
}