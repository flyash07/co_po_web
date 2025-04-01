const mongoose=require('mongoose')

const courseSchema=mongoose.Schema({
    courseID:String,
    name:String,
    type:String,
    coordinator:{
        type:mongoose.Schema.ObjectId,
        default:""
    },
    program:String,
    sem:String,
    year:Number,
    oddEven:String,
    coStatements:[
        {
            description:{type:String},
            bloomsLevel:{type:String}
        }
    ]
})

module.exports=mongoose.model("course",courseSchema)