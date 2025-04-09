const mongoose=require('mongoose')

const profSchema=mongoose.Schema({
    facultyID:String,
    name:String,
    email:String,
    phoneNo:Number,
    designation:String,
    dept:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"dept",
        default:null
    },
    hasTaught:{
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"courses"
        }],
        default:[]
    },
    password:String,
    section:[
        {
            course:{
                type:mongoose.Schema.ObjectId,
                ref:"course"
            },
            section:{
                type:mongoose.Schema.ObjectId,
                ref:"section"
            },
            role:String,
        }
    ]
})

module.exports=mongoose.model("prof",profSchema)