const mongoose=require('mongoose')

const departmentScheme=mongoose.Schema({
    name:String,
    hod:{
        type:mongoose.Schema.ObjectId
    },
    courses:[
        {
            type:mongoose.Schema.ObjectId
        }
    ],
    poStatements:[
        {
            description:{type:String},
            number:{type:Number}
        }
    ],
})

module.exports=mongoose.model("dept",departmentScheme)