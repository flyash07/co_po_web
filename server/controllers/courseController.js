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
        data.coTargets.push(course.coTargetSet[i]);
        data.coPrevTargets.push(0);
        data.coPrevAttained.push(0);
      }
  
      for (let i = 0; i < 12; i++) {
        data.poTargets.push(course.poTargetSet[i]);
      }
  
      for (let i = 0; i < 4; i++) {
        data.psoTargets.push(course.psoTargetSet[i]);
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

        for (let i = 0; i < course.coTargetSet.length; i++) {
          course.coTargetSet[i] = coTargets[i];
        }

        for (let i = 0; i < course.poTargetSet.length; i++) {
          course.poTargetSet[i] = poTargets[i];
        }

        for (let i = 0; i < course.psoTargetSet.length; i++) {
          course.psoTargetSet[i] = psoTargets[i];
        }
        
        course.coSet=true

        await course.save()
        res.status(200).json({message:"Target Updated"})
    }catch(err){
        console.log(err)
        res.status(500).json({'error':"InternalServerError"})
    }
}

module.exports.getCoPo=async (req,res)=>{
  const {courseId}=req.query
  const course=await courseModel.findById(courseId)
  console.log(courseId)
  const coPoMap={};
    course.coPoMapping.forEach(mapping => {
      const { coNum, value } = mapping;
      if (!coPoMap[coNum]) coPoMap[coNum] = [];
      coPoMap[coNum].push(value);
  });

  // Group PSO values by CO number
  const coPsoMap = {};
  course.coPsoMapping.forEach(mapping => {
      const { coNum, value } = mapping;
      if (!coPsoMap[coNum]) coPsoMap[coNum] = [];
      coPsoMap[coNum].push(value);
  });

  // Get all distinct COs from both mappings
  const coSet = new Set([
      ...Object.keys(coPoMap),
      ...Object.keys(coPsoMap)
  ]);

  // Build the final array
  const result = Array.from(coSet)
      .sort((a, b) => a - b) // optional: sort by coNum
      .map(coNum => {
          const poValues = coPoMap[coNum] || [];
          const psoValues = coPsoMap[coNum] || [];
          return [...poValues, ...psoValues];
      });

  res.json(result);
}

module.exports.postCoPo=async(req,res)=>{
  const { courseId,inputArray } = req.body; // Expecting array of arrays
console.log(inputArray)
  if (!Array.isArray(inputArray)) {
      return res.status(400).json({ message: 'Invalid input format' });
  }

  const coPoMapping = [];
  const coPsoMapping = [];

  inputArray.forEach((row, index) => {
      const coNum = index + 1;

      // Validate each row
      if (!Array.isArray(row) || row.length < 16) {
          throw new Error(`Row ${index + 1} must have at least 16 values`);
      }

      // First 12 are PO values
      for (let i = 0; i < 12; i++) {
          coPoMapping.push({
              coNum,
              poNum: i + 1,
              value: row[i]
          });
      }

      // Next 4 are PSO values
      for (let i = 12; i < 16; i++) {
          coPsoMapping.push({
              coNum,
              psoNum: i - 11,
              value: row[i]
          });
      }
  });

  // Update the course document
  const course = await courseModel.findByIdAndUpdate(
      courseId,
      {
          coPoMapping,
          coPsoMapping
      },
      { new: true, upsert: true }
  );

  course.copoSet=true
  course.save()
  res.json({ message: 'Mappings saved successfully'});
}