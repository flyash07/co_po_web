import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './CieMarks.css';

const SeeMarks: React.FC = () => {
    const [assignmentType, setAssignmentType] = useState('ass1');
    const [students, setStudents] = useState<any[]>([]);
    const [summary, setSummary] = useState<any>({});
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        /*
        axios.get('/cie/getCie', {
            headers: {
                'Authorization': 'Bearer JWT'
            },
            params: {
                courseId: 'course_id'
            }
        })
        .then(res => {
            setStudents(res.data.students);
            setSummary(res.data.summary);
        })
        .catch(err => console.error(err));
        */

        const dummySummary = {
            "1": { avgAla: "2.00", level1: 0, level2: 10, level3: 0, count: 10 },
            "2": { avgAla: "2.00", level1: 0, level2: 10, level3: 0, count: 10 },
            "3": { avgAla: "1.00", level1: 10, level2: 0, level3: 0, count: 10 },
            "4": { avgAla: "1.00", level1: 10, level2: 0, level3: 0, count: 10 },
            "5": { avgAla: "1.00", level1: 10, level2: 0, level3: 0, count: 10 },
        };

        const dummyStudents = [
            {
                name: "Vedant Jain",
                regNo: "200905182",
                cie: {
                    "1": { obtained: 5, total: 10, percentage: "50.00", ala: 2 },
                    "2": { obtained: 2.5, total: 5, percentage: "50.00", ala: 2 },
                    "3": { obtained: 2.5, total: 5, percentage: "50.00", ala: 2 },
                    "4": { obtained: 2.5, total: 5, percentage: "50.00", ala: 2 },
                    "5": { obtained: 2.5, total: 5, percentage: "50.00", ala: 2 },
                }
            },
            {
                name: "Soumyajit Saha",
                regNo: "200905378",
                cie: {
                    "1": { obtained: 4, total: 10, percentage: "40.00", ala: 1 },
                    "2": { obtained: 2, total: 5, percentage: "40.00", ala: 1 },
                    "3": { obtained: 2, total: 5, percentage: "40.00", ala: 1 },
                    "4": { obtained: 2, total: 5, percentage: "40.00", ala: 1 },
                    "5": { obtained: 2, total: 5, percentage: "40.00", ala: 1 },
                }
            }
        ];

        setSummary(dummySummary);
        setStudents(dummyStudents);
    }, []);

    const handleAssignmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAssignmentType(e.target.value);
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

        const reader = new FileReader();
        reader.onload = async (evt) => {
            try {
                // const data = evt.target?.result;
                // const workbook = XLSX.read(data, { type: 'binary' });
                // const sheetName = workbook.SheetNames[0];
                // const sheet = workbook.Sheets[sheetName];
                // const jsonData = XLSX.utils.sheet_to_json(sheet);

                // const payload = {
                //     data: jsonData,
                //     courseId: course_id
                //     assignmentType: 'endSem'
                // };

                // const res = await axios.post('/cie/postCie', payload, {
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Authorization': 'Bearer YOUR_JWT_TOKEN'
                //     }
                // });

                // alert(res.data.message || 'Upload successful');
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
