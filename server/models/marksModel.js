const mongoose=require('mongoose')

const marksSchema=mongoose.Schema({
    student:{
        type:mongoose.Schema.ObjectId,
        ref:"student"
    },
    course:{
        type:mongoose.Schema.ObjectId,
        ref:"course"
    },
    status: {
        ass1: { type: Boolean, default: false },
        ass2: { type: Boolean, default: false },
        ass3: { type: Boolean, default: false },
        ass4: { type: Boolean, default: false },
        midSem: { type: Boolean, default: false },
        endSem: { type: Boolean, default: false }
    },
    ass1:[
        {
            qNo:Number,
            part:String,
            co:Number,
            maxMarks:Number
        }
    ],
    ass2:[
        {
            qNo:Number,
            part:String,
            co:Number,
            maxMarks:Number
        }
    ],
    ass3:[
        {
            qNo:Number,
            part:String,
            co:Number,
            maxMarks:Number
        }
    ],
    ass4:[
        {
            qNo:Number,
            part:String,
            co:Number,
            maxMarks:Number
        }
    ],
    midSem:[
        {
            qNo:Number,
            part:String,
            co:Number,
            maxMarks:Number
        }
    ],
    endSem:[
        {
            qNo:Number,
            part:String,
            co:Number,
            maxMarks:Number
        }
    ],
    feedback:[
        {
            coNum:Number,
            value:Number
        }
    ],
    grade:{
        type:String,
        default:" "
    }
})

module.exports=mongoose.model("marks",marksSchema)