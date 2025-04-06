const express=require('express')
const app=express()

const dotenv=require('dotenv')
dotenv.config()

const cookieParser=require('cookie-parser')

const db=require('./config/mongoose-connection')
const {test}=require("./utils/testModel")
const indexRouter=require('./routes/indexRouter')
const courseRouter=require('./routes/courseRouter')
const cieRouter=require('./routes/cieRouter')
const feedbackRouter=require('./routes/feedbackRouter')

const cors=require('cors')
const corsParams={
    origin:"http://localhost:5173"
}
app.use(cors(corsParams))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// app.get("/",(req,res)=>{
//     res.send("Hello")
// })

// test(); //To test the Schema
app.use('/index',indexRouter)
app.use('/course',courseRouter)
app.use('/cie',cieRouter)
app.use('/feedback',feedbackRouter)
app.listen(8080)