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
const finalRouter=require('./routes/finalRouter')
const rootRouter=require('./routes/rootcauseRouter')

//for admin and hod
const adminRouter = require('./routes/adminRouter')
const hodRouter = require('./routes/hodRouter')

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
app.use('/final',finalRouter)

//for admin and hod
app.use('/admin', adminRouter)
app.use('/hod', hodRouter)

app.use('/root',rootRouter)

app.listen(8080)