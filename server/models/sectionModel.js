const mongoose=require('mongoose')

const sectionSchema=mongoose.Schema({
    name:String,
    dept:{
        type:mongoose.Schema.ObjectId,
        ref:"dept"
    },
    program:String,
    batch:String,
    sem:String
})

module.exports=mongoose.model("section",sectionSchema)