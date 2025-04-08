const mongoose=require('mongoose')

const courseSchema=mongoose.Schema({
    courseID:String,
    name:String,
    type:String,
    coordinator:{
        type:mongoose.Schema.ObjectId,
        default:null,
        ref:"prof"
    },
    program:String,
    sem:String,
    year:Number,
    oddEven:String,
    coStatements:{
        type:[
            {
                description: { type: String, default: null },
                bloomsLevel: { type: String, default: null }
            }
        ],
        default: () => Array.from({ length: 8 }, () => ({
            description: null,
            bloomsLevel: null
        }))
    },
    coPoMapping:[
        {
            coNum:Number,
            poNum:Number,
            value:Number,
        }
    ],
    coPsoMapping:[
        {
            coNum:Number,
            psoNum:Number,
            value:Number
        }
    ],
    dept:{
        type:mongoose.Schema.ObjectId,
        ref:"dept"
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
})

module.exports=mongoose.model("course",courseSchema)