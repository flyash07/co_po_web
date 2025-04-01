const express=require('express')
const app=express()

const dotenv=require('dotenv')
dotenv.config()

const db=require('./config/mongoose-connection')

const cors=require('cors')
const corsParams={
    origin:"http://localhost:5173"
}
app.use(cors(corsParams))

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.listen(8080)