const mongoose=require('mongoose')

const courseSectionSchema=mongoose.Schema({
    courseId:{
        type:mongoose.Types.ObjectId,
        ref:"course"
    },
    sectionId:{
        type:mongoose.Types.ObjectId,
        ref:"section"
    },
    coAttainment:{
        type: [
            {
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
                attained: {type:Number, default:0}
            }
        ],
        default: () => Array.from({ length: 12 }, () => ({ targetSet: 0 }))
    },
    psoAttainment: {
        type: [
            {
                attained: {type:Number, default:0}
            }
        ],
        default: () => Array.from({ length: 4 }, () => ({ targetSet: 0 }))
    },
    coActionPlans:[{
        stat:String
    }
    ],
    poActionPlans:[{
        stat:String
    }
    ],
    psoActionPlans:[{
        stat:String
    }
    ],
    rootCauseCo:String,
    rootCausePo:String,
    rootCausePso:String,
})

module.exports=mongoose.model("courseSection",courseSectionSchema)