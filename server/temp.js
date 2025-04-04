// const express=require('express')
// const app=express()

// const cookieParser=require('cookie-parser')

// const cors=require('cors')
// const corsParams={
//     origin:"http://localhost:5173"
// }
// app.use(cors(corsParams))
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use(cookieParser());
// app.get("/test-get", (req, res) => {
//     res.json({ message: "GET request successful!" });
// });

// app.post("/test-post", (req, res) => {
//     console.log("Received POST data:", req.body);
//     res.json({ message: "POST request successful!", receivedData: req.body });
// });

// app.listen(8080);
const XLSX = require('xlsx');
const path = require('path');

// Load the Excel file
const workbook = XLSX.readFile('demoInput.xlsx');

// Get the first sheet name
const sheetName = workbook.SheetNames[0];

// Get the sheet
const sheet = workbook.Sheets[sheetName];

// Convert to JSON
const jsonData = XLSX.utils.sheet_to_json(sheet);

// Output to console
console.log(JSON.stringify(jsonData, null, 2));

