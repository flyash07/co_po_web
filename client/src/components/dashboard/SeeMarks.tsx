import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './CieMarks.css';

const SeeMarks: React.FC = () => {
    const [students, setStudents] = useState<any[]>([]);
    const [summary, setSummary] = useState<any>({});
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fetchSeeData= async() =>{
        const token = document.cookie.split('; ')
            .find(row => row.startsWith('jwtToken='))
            ?.split('=')[1];
    
        const courseId = localStorage.getItem('currentCourse'); // Ensure this is set correctly
        console.log(courseId)
        if (!token || !courseId) {
            console.error("Missing token or courseId");
            return;
        }
    
        axios.get('http://localhost:8080/cie/getSee', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
            params: {
                "courseId":courseId,
            }
        })
        .then(res => {
            setStudents(res.data.students || []);
            setSummary(res.data.summary || {});
        })
        .catch(err => {
            console.error("Failed to fetch CIE data:", err);
        });
    };
    useEffect(() => {
        fetchSeeData();
    }, []);

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
                    assignmentType: 'endSem'
                };
    
                const res = await axios.post('http://localhost:8080/cie/postCie', payload, {
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

    const coKeys = students[0] ? Object.keys(students[0].cie) : [];

    const maxTotals = coKeys.reduce((acc: any, co) => {
        acc[co] = students[0]?.cie?.[co]?.total || '-';
        return acc;
    }, {});

    return (
        <div className="cie-container">
            <h2>Semester End Examination (SEE) - Direct Attainment Level Achieved</h2>

            <table className="cie-table">
                <thead>
                    <tr>
                        <th rowSpan={2}>Sl no.</th>
                        <th rowSpan={2}>Name</th>
                        <th rowSpan={2}>Reg No</th>
                        {coKeys.map((co) => (
                            <th key={co} colSpan={3}>CO{co}</th>
                        ))}
                    </tr>
                    <tr>
                        {coKeys.map((co) => (
                            <>
                                <th key={`${co}-obt`}>Obt</th>
                                <th key={`${co}-perc`}>%</th>
                                <th key={`${co}-ala`}>ALA</th>
                            </>
                        ))}
                    </tr>
                    <tr>
                        <td colSpan={3}>Max Marks</td>
                        {coKeys.map((co) => (
                            <>
                                <td key={`${co}-tot-obt`}>{maxTotals[co]}</td>
                                <td>-</td>
                                <td>-</td>
                            </>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.regNo}>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.regNo}</td>
                            {coKeys.map((co) => {
                                const data = student.cie[co] || {};
                                return (
                                    <>
                                        <td>{data.obtained ?? "-"}</td>
                                        <td className="percentage-cell">{data.percentage ?? "-"}</td>
                                        <td>{data.ala ?? "-"}</td>
                                    </>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>CO Summary</h3>
            <table className="summary-table">
                <thead>
                    <tr>
                        <th>CO</th>
                        <th>Avg ALA</th>
                        <th>Level 1</th>
                        <th>Level 2</th>
                        <th>Level 3</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(summary).map(([co, data]: [string, any]) => (
                        <tr key={co}>
                            <td>CO{co}</td>
                            <td>{data.avgAla}</td>
                            <td>{data.level1}</td>
                            <td>{data.level2}</td>
                            <td>{data.level3}</td>
                            <td>{data.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="excel-ip">

                <input type="file" accept=".xlsx" onChange={handleFileChange} />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default SeeMarks;
