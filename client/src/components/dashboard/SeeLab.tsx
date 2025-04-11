import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './CieMarks.css';

const SeeLab: React.FC = () => {
    const [students, setStudents] = useState<any[]>([]);
    const [summary, setSummary] = useState<any>({});
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    useEffect(() => {
        fetchSeeData();
    }, []);
    const fetchSeeData = async () => {
        const token = document.cookie.split('; ')
            .find(row => row.startsWith('jwtToken='))
            ?.split('=')[1];
    
        const courseId = localStorage.getItem('currentCourse');
        if (!token || !courseId) {
            console.error("Missing token or courseId");
            return;
        }
    
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    
        try {
            const res = await axios.get(`${BACKEND_URL}/lab/getSee`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                },
                params: {
                    courseId: courseId,
                }
            });
    
            const data = res.data;
            setStudents(data.students || []);
            setSummary(data.alaSummary || {});  // ✅ Correct this to match your response
        } catch (err) {
            console.error("Failed to fetch SEE data:", err);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            alert('Please select a file before submitting.');
            return;
        }
    
        const token = document.cookie.split('; ')
            .find(row => row.startsWith('jwtToken='))
            ?.split('=')[1];
    
        const courseId = localStorage.getItem('currentCourse');
    
        if (!token || !courseId) {
            console.error("Missing token or courseId");
            alert("You're missing token or courseId. Please re-authenticate or refresh.");
            return;
        }
    
        const reader = new FileReader();
        reader.onload = async (evt) => {
            try {
                const data = evt.target?.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);
    
                const payload = {
                    data: jsonData,
                    courseId: courseId,
                };
                const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
                const res = await axios.post(`${BACKEND_URL}/lab/postSee`, payload, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`
                    }
                });
                console.log(res.data.message)
                alert(res.data.message || 'Upload successful');
                await fetchSeeData();
            } catch (error) {
                console.error('Error uploading file', error);
                alert('Upload failed');
            }
        };
    
        reader.readAsBinaryString(selectedFile);
    };

    return (
        <div className="cie-container">
            <h2>Semester End Examination (SEE) - Direct Attainment Level Achieved</h2>

            <table className="cie-table">
                <thead>
                    <tr>
                        <th rowSpan={2}>Sl no.</th>
                        <th rowSpan={2}>Name</th>
                        <th rowSpan={2}>Reg No</th>
                        <th rowSpan={2}>Grade</th>
                        <th>ALA</th>
                    </tr>
                    <tr>
                        <td colSpan={4}>Max Marks</td>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.regNo}>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.regNo}</td>
                            <td>{student.grade}</td>
                            <td>{student.ala}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>CO Summary</h3>
            <table className="summary-table">
                <thead>
                    <tr>
                        <th>Level 1</th>
                        <th>Level 2</th>
                        <th>Level 3</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{summary["1"] ?? 0}</td>
                        <td>{summary["2"] ?? 0}</td>
                        <td>{summary["3"] ?? 0}</td>
                    </tr>
                </tbody>
            </table>


            <div className="excel-ip">

                <input type="file" accept=".xlsx" onChange={handleFileChange} />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default SeeLab;
