const express=require('express')
const app=express()

const cookieParser=require('cookie-parser')

const cors=require('cors')
const corsParams={
    origin:"http://localhost:5173"
}
app.use(cors(corsParams))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.get("/test-get", (req, res) => {
    res.json({ message: "GET request successful!" });
});

app.post("/test-post", (req, res) => {
    console.log("Received POST data:", req.body);
    res.json({ message: "POST request successful!", receivedData: req.body });
});

app.listen(8080);
