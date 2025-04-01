const mongoose=require('mongoose')
console.log(process.env.MONGODB_URL)
mongoose
.connect(`${process.env.MONGODB_URL}/copo`)
.then(function(){
    console.log("connected");
})
.catch(function(err){
    console.log(err);
});
module.exports=mongoose.connection;