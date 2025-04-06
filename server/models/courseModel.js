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
    coStatements:[
        {
            description:String,
            bloomsLevel:String
        }
    ],
    coAttainment:{
        type: [
            {
                targetSet: { type: Number, default: 0 },
                direct: {
                    inSem: { type: Number, default: 0 },
                    endSem: { type: Number, default: 0 },
                    finalCo: { type: Number, default: 0 }
                },
                overall: {
                    inSem: { type: Number, default: 0 },
                    endSem: { type: Number, default: 0 },
                    finalCo: { type: Number, default: 0 }
                }
            }
        ],
        default: () => Array.from({ length: 8 }, () => ({
            targetSet: 0,
            direct: { inSem: 0, endSem: 0, finalCo: 0 },
            overall: { inSem: 0, endSem: 0, finalCo: 0 }
        }))
    },
    poAttainment: {
        type: [
            {
                targetSet: { type: Number, default: 0 }
            }
        ],
        default: () => Array.from({ length: 12 }, () => ({ targetSet: 0 }))
    },
    psoAttainment: {
        type: [
            {
                targetSet: { type: Number, default: 0 }
            }
        ],
        default: () => Array.from({ length: 4 }, () => ({ targetSet: 0 }))
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
    coActionPlans:[{
        stat:String
    }
    ]
})

module.exports=mongoose.model("course",courseSchema)