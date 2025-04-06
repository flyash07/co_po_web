import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CourseFeedback.css';
import * as XLSX from 'xlsx';

type StudentFeedback = {
    name: string;
    regNo: string | number;
    coValues: { [key: number]: number };
};

type FeedbackResponse = {
    coSummary: COSummaryRow[];
    courseCF: string;
    courseAttainment: string;
    studentFeedbackData: StudentFeedback[];
};

const CO_HEADERS = Array.from({ length: 8 }, (_, i) => `CO${i + 1}`);

const CourseFeedback: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [coSummary, setCoSummary] = useState([]);
    const [courseCF, setCourseCF] = useState();
    const [courseAttainment, setCourseAttainment] = useState('');
    const [studentFeedback, setStudentFeedback] = useState<StudentFeedback[]>([]);
    const [excelFile, setExcelFile] = useState<File | null>(null);

    const courseId = localStorage.getItem('currentCourse');
    const token = document.cookie.split('; ')
        .find(row => row.startsWith('jwtToken='))?.split('=')[1];

    const fetchFeedback = async () => {
        try {
            const res = await axios.get("http://localhost:8080/feedback/getFeedback", {
                headers: {
                    Authorization: `${token}`,
                },
                params: {
                    courseId,
                },
            });

            const data = res.data;
            setCoSummary(data.coSummary);
            setCourseCF(data.courseCF);
            setCourseAttainment(data.courseAttainment);
            setStudentFeedback(data.studentFeedbackData || []);

            console.log(coSummary)
            console.log(data.coSummary)
        } catch (err) {
            console.error('Error fetching feedback:', err);
        }
    };

    useEffect(() => {
        fetchFeedback();
    }, [courseId, token]);

    const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (evt) => {
            try {
                const bstr = evt.target?.result;
                const workbook = XLSX.read(bstr, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                const payload = {
                    data: jsonData,
                    courseId: courseId,
                };

                const res = await axios.post('http://localhost:8080/feedback/postFeedback', payload, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`,
                    },
                });
                console.log(res.data.message)
                alert(res.data.message || 'Upload successful');
                fetchFeedback(); // Refresh the data

            } catch (error) {
                console.error('Error uploading file', error);
                alert('Upload failed');
            }
        };
        reader.readAsBinaryString(file);
    };

    return (
        <div className="feedback-container">
            <h1 className="feedback-title">MANIPAL INSTITUTE OF TECHNOLOGY, MANIPAL</h1>
            <h2 className="feedback-subtitle">Course Feedback (Course End Survey(CES))</h2>

            <table className="feedback-table">
                <tbody>
                    <tr>
                        <td className="label">Department:</td>
                        <td>Computer Science and Engineering</td>
                        <td className="label">Program:</td>
                        <td>B.Tech</td>
                    </tr>
                    <tr>
                        <td className="label">Faculty Name:</td>
                        <td>Manamohana Krishna</td>
                        <td className="label">Semester:</td>
                        <td>IV</td>
                    </tr>
                    <tr>
                        <td className="label">Course Code:</td>
                        <td>{courseId}</td>
                        <td className="label">Section:</td>
                        <td>C</td>
                    </tr>
                    <tr>
                        <td className="label">Course Name:</td>
                        <td>Embedded Systems</td>
                        <td className="label">Odd/Even:</td>
                        <td>ODD</td>
                    </tr>
                    <tr>
                        <td className="label">Type Of Course:</td>
                        <td>CORE</td>
                        <td className="label">Year:</td>
                        <td>2023-24</td>
                    </tr>
                </tbody>
            </table>

            <table className="ces-table">
                <thead>
                    <tr>
                        <th colSpan={4} className="ces-header">
                            Course Feedback (CES) ATTAINMENT LEVEL
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        ['Level 3', '3.5', 'Course Feedback Weighted Average: CF ≥ 3.5'],
                        ['Level 2', '2.5', 'Course Feedback Weighted Average: 2.5 ≤ CF < 3.5'],
                        ['Level 1', '1', 'Course Feedback Weighted Average: 1 ≤ CF < 2.5'],
                    ].map(([level, score, desc], i) => (
                        <tr key={i}>
                            <td className="level-yellow">{level}</td>
                            <td className="score-red">{score}</td>
                            <td colSpan={2}>{desc}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <table className="ces-data-table">
                <thead>
                    <tr>
                        <th></th>
                        {CO_HEADERS.map((co, i) => (
                            <th key={i}>{co}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {coSummary.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className="label-cell">{row.label}</td>
                            { row.values && row.values.length ? (
                                row.values.map((val, i) => (
                                    <td
                                        key={i}
                                        className={
                                            row.label.includes('Average')
                                                ? 'cf-average-cell'
                                                : row.label.includes('Attainment')
                                                    ? 'cf-attainment-cell'
                                                    : ''
                                        }
                                        style={{
                                            backgroundColor:
                                                row.label.includes('Attainment') && val === 'NA' ? 'yellow' : undefined,
                                            color:
                                                typeof val === 'string' && val === 'NA'
                                                    ? 'red'
                                                    : undefined,
                                        }}
                                    >
                                        {val}
                                    </td>
                                ))
                            ) : (
                                <td colSpan={CO_HEADERS.length}></td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="excel-upload-container">
                <label htmlFor="excel-upload" className="upload-label">
                    Upload Excel File:
                </label>
                <input
                    type="file"
                    id="excel-upload"
                    accept=".xlsx"
                    className="excel-input"
                    onChange={handleExcelUpload}
                    onClick={(e) => (e.currentTarget.value = '')}
                />
                <button className="hint-button" onClick={() => setShowModal(true)}>
                    Hint
                </button>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2 className="modal-title">Ideal Excel Format</h2>
                        {/* <img src="/example.png" alt="Format" className="modal-image" /> */}
                        <button className="close-button" onClick={() => setShowModal(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            <h2 className="section-title">Course Feedback (CES): Individual Student Responses</h2>
            <table className="student-response-table">
                <thead>
                    <tr>
                        <th>Sl. No</th>
                        <th>Name</th>
                        <th>Reg Number</th>
                        <th>Time Stamp</th>
                        {CO_HEADERS.map((co, i) => (
                            <th key={i}>{co}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {studentFeedback.map((student, idx) => (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.regNo}</td>
                            <td>–</td>
                            {CO_HEADERS.map((_, i) => (
                                <td key={i}>{student.coValues[i + 1] ?? 0}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseFeedback;
