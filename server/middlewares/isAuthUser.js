const userModel=require('../models/proffesorModel')
const jwt=require('jsonwebtoken')

module.exports.authUser=async (req,res,next)=>{
    const token=req.cookie.token||req.headers.authorization?.split(' ')[1]

    if(!token){
        return res.status(401).json({'message':"Unauthorized"})
    }

    try{
        const decoded=jwt.decode(token,process.env.JWT_KEY)
        const user=userModel.findById(decoded._id)
        req.user=user
        next();
    }catch{
        return res.status(401).json({'message':"Unauthorized"})
    }
}