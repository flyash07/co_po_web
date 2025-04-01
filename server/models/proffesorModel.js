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
    }
})

module.exports=mongoose.model("prof",profSchema)