const XLSX = require('xlsx');
const path = require('path');

// Load the Excel file
const workbook = XLSX.readFile('tempendsem.xlsx');

// Get the first sheet name
const sheetName = workbook.SheetNames[0];

// Get the sheet
const sheet = workbook.Sheets[sheetName];

// Convert to JSON
const jsonData = XLSX.utils.sheet_to_json(sheet);

// Output to console
console.log(JSON.stringify(jsonData, null, 2));