const mongoose=require('mongoose')

const profSchema=mongoose.Schema({
    facultyID:String,
    name:String,
    email:String,
    phoneNo:Number,
    dept:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"dept",
        default:""
    },
    hasTaught:{
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"courses"
        }],
        default:[]
    },
    currentlyTeaching:{
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
            }
        }
    ]
})

module.exports=mongoose.model("prof",profSchema)