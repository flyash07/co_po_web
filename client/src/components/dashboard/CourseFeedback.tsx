import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CourseFeedback.css';
import * as XLSX from 'xlsx';

type StudentFeedback = {
    name: string;
    regNo: string | number;
    coValues: { [key: number]: number };
};

type COSummary = {
    counts: { [rating: number]: number };
    totalStudents: number;
    weightedScore: string;
    attainmentLevel: string;
};

type COSummaryRow = {
    label: string;
    values: (number | string)[];
};

type FeedbackResponse = {
    coSummary: COSummary[];
    courseCF: string;
    courseAttainment: string;
    studentFeedbackData: StudentFeedback[];
};

const CO_HEADERS = Array.from({ length: 8 }, (_, i) => `CO${i + 1}`);

const CourseFeedback: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [coSummaryRows, setCoSummaryRows] = useState<COSummaryRow[]>([]);
    const [courseCF, setCourseCF] = useState('');
    const [courseAttainment, setCourseAttainment] = useState('');
    const [studentFeedback, setStudentFeedback] = useState<StudentFeedback[]>([]);

    const courseId = localStorage.getItem('currentCourse');
    const token = document.cookie.split('; ').find(row => row.startsWith('jwtToken='))?.split('=')[1];

    const fetchFeedback = async () => {
        try {
            const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
            const res = await axios.get<FeedbackResponse>(`${BACKEND_URL}/feedback/getFeedback`, {
                headers: { Authorization: `${token}` },
                params: { courseId },
            });

            const { coSummary, courseCF, courseAttainment, studentFeedbackData } = res.data;
            const ratingLabels = [1, 2, 3, 4, 5];

            const summaryRows: COSummaryRow[] = [];

            // Ratings 1-5
            ratingLabels.forEach((rating) => {
                summaryRows.push({
                    label: `No. of Students graded ${rating}`,
                    values: coSummary.map(co => co.counts[rating] ?? 0),
                });
            });

            summaryRows.push(
                {
                    label: 'Total Students',
                    values: coSummary.map(co => co.totalStudents),
                },
                {
                    label: 'Weighted Average',
                    values: coSummary.map(co => parseFloat(co.weightedScore).toFixed(2)),
                },
                {
                    label: 'Attainment Level',
                    values: coSummary.map(co => co.attainmentLevel || 'NA'),
                }
            );

            setCoSummaryRows(summaryRows);
            setCourseCF(courseCF);
            setCourseAttainment(courseAttainment);
            setStudentFeedback(studentFeedbackData || []);
        } catch (err) {
            console.error('Error fetching feedback:', err);
        }
    };

    useEffect(() => {
        if (courseId && token) {
            fetchFeedback();
        }
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

                const payload = { data: jsonData, courseId };
                const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
                const res = await axios.post(`${BACKEND_URL}/feedback/postFeedback`, payload, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`,
                    },
                });

                alert(res.data.message || 'Upload successful');
                fetchFeedback();
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('Upload failed');
            }
        };

        reader.readAsBinaryString(file);
    };

    return (
        <div className="feedback-container">
            <h1 className="feedback-title">MANIPAL INSTITUTE OF TECHNOLOGY, MANIPAL</h1>
            <h2 className="feedback-subtitle">Course Feedback (Course End Survey(CES))</h2>


            {/* Attainment Level Table */}
            <table className="ces-table">
                <thead>
                    <tr><th colSpan={4} className="ces-header">Course Feedback (CES) ATTAINMENT LEVEL</th></tr>
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

            {/* CO Summary Table */}
            <table className="ces-data-table">
                <thead>
                    <tr><th></th>{CO_HEADERS.map((co, i) => <th key={i}>{co}</th>)}</tr>
                </thead>
                <tbody>
                    {coSummaryRows.map((row, idx) => (
                        <tr key={idx}>
                            <td className="label-cell">{row.label}</td>
                            {row.values.map((val, i) => (
                                <td
                                    key={i}
                                    className={
                                        row.label.includes('Average') ? 'cf-average-cell' :
                                        row.label.includes('Attainment') ? 'cf-attainment-cell' : ''
                                    }
                                    style={{
                                        backgroundColor: row.label.includes('Attainment') && val === 'NA' ? 'yellow' : undefined,
                                        color: val === 'NA' ? 'red' : undefined,
                                    }}
                                >
                                    {val}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Excel Upload Section */}
            <div className="excel-upload-container">
                <label htmlFor="excel-upload" className="upload-label">Upload Excel File:</label>
                <input
                    type="file"
                    id="excel-upload"
                    accept=".xlsx"
                    className="excel-input"
                    onChange={handleExcelUpload}
                    onClick={(e) => (e.currentTarget.value = '')}
                />
                <button className="hint-button" onClick={() => setShowModal(true)}>Hint</button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2 className="modal-title">Ideal Excel Format</h2>
                        {/* <img src="/example.png" alt="Format" className="modal-image" /> */}
                        <button className="close-button" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}

            {/* Individual Student Responses */}
            <h2 className="section-title">Course Feedback (CES): Individual Student Responses</h2>
            <table className="student-response-table">
                <thead>
                    <tr>
                        <th>Sl. No</th>
                        <th>Name</th>
                        <th>Reg Number</th>
                        {CO_HEADERS.map((co, i) => <th key={i}>{co}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {studentFeedback.map((student, idx) => (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.regNo}</td>
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
