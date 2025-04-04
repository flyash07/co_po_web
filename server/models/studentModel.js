const mongoose=require('mongoose')

const studentSchema=mongoose.Schema({
    regNo:Number,
    name:String,
    section:{
        type:mongoose.Schema.ObjectId,
        ref:"section",
        default:null
    },
    prevCourses:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"course"
        }
    ],
    currentCourses:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"course"
        }
    ],
    reRegisteredCourses:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"course"
        }
    ],
})

module.exports=mongoose.model("student",studentSchema)