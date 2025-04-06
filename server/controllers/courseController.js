const courseModel = require("../models/courseModel")

// 
module.exports.getTargets = async (req, res) => {
    console.log("TEST SERVER POSTS")
    try {
      const courseId = req.query.courseId;
      console.log("Received GET /getTargets with courseId:", courseId);
  
      const course = await courseModel.findById(courseId);
      if (!course) return res.status(404).json({ message: "Course not found" });
  
      const data = {
        coTargets: [],
        coPrevTargets: [],
        coPrevAttained: [],
        poTargets: [],
        psoTargets: []
      };
  
      for (let i = 0; i < 8; i++) {
        data.coTargets.push(course.coAttainment[i].targetSet);
        data.coPrevTargets.push(0);
        data.coPrevAttained.push(0);
      }
  
      for (let i = 0; i < 12; i++) {
        data.poTargets.push(course.poAttainment[i].targetSet);
      }
  
      for (let i = 0; i < 4; i++) {
        data.psoTargets.push(course.psoAttainment[i].targetSet);
      }
  
      return res.status(200).json(data);
    } catch (err) {
      console.error("Error in getTargets:", err);
      return res.status(500).json({ error: "InternalServerError" });
    }
  };
  
module.exports.postTargets=async (req,res)=>{
    try{
        console.log(req.body)
        const {courseId, coTargets, poTargets, psoTargets}=req.body

        if(!coTargets||!poTargets||!psoTargets)
            res.status(401).json({message:"No data"})

        const course=await courseModel.findById(courseId)

        if(!course)
            res.status(404).json({message:"Course Not Found"})

        course.coAttainment.forEach((item,index)=>{
            item.targetSet=coTargets[index]
        })

        course.poAttainment.forEach((item,index)=>{
            item.targetSet=poTargets[index]
        })

        course.psoAttainment.forEach((item,index)=>{
            item.targetSet=psoTargets[index]
        })

        await course.save()
        res.status(200).json({message:"Target Updated"})
    }catch(err){
        console.log(err)
        res.status(500).json({'error':"InternalServerError"})
    }
}