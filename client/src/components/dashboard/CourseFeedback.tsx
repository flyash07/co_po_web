import React, { useState } from 'react';
import './CourseFeedback.css';

const CourseFeedback = () => {

    const [showModal, setShowModal] = useState(false);

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
                        <td>CSE2223</td>
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
                    <tr>
                        <td className="level-yellow">Level 3</td>
                        <td className="score-red">3.5</td>
                        <td colSpan={2}>Course Feedback Weighted Average: CF ≥ 3.5</td>
                    </tr>
                    <tr>
                        <td className="level-yellow">Level 2</td>
                        <td className="score-red">2.5</td>
                        <td colSpan={2}>Course Feedback Weighted Average: 2.5 ≤ CF &lt; 3.5</td>
                    </tr>
                    <tr>
                        <td className="level-yellow">Level 1</td>
                        <td className="score-red">1</td>
                        <td colSpan={2}>Course Feedback Weighted Average: 1 ≤ CF &lt; 2.5</td>
                    </tr>
                </tbody>
            </table>

            <table className="ces-data-table">
                <thead>
                    <tr>
                        <th></th>
                        {["CO1", "CO2", "CO3", "CO4", "CO5", "CO6", "CO7", "CO8"].map((co, i) => (
                            <th key={i}>{co}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {[
                        "Number of Students Graded 1",
                        "Number of Students Graded 2",
                        "Number of Students Graded 3",
                        "Number of Students Graded 4",
                        "Number of Students Graded 5",
                        "",
                        "Total Number of Students Responded",
                        "Total Number of Students",
                        "Course Feedback Weighted Total",
                        "Maximum Score",
                        "Course Feedback Weighted Average (CF)",
                        "Course Feedback (CES) Attainment"
                    ].map((label, rowIndex) => {
                        const values = [
                            [1, 3, 3, 4, 2, 4, 0, 0],
                            [5, 3, 4, 5, 6, 5, 0, 0],
                            [8, 5, 8, 12, 10, 12, 0, 0],
                            [26, 32, 30, 21, 24, 23, 0, 0],
                            [29, 26, 24, 27, 27, 25, 0, 0],
                            [],
                            [69, 69, 69, 69, 69, 69, 0, 0],
                            [69, 69, 69, 69, 69, 69, 69, 69],
                            [284, 282, 275, 269, 275, 267, 0, 0],
                            [5, 5, 5, 5, 5, 5, 5, 5],
                            ["4.12", "4.09", "3.99", "3.90", "3.99", "3.87", "NA", "NA"],
                            ["3", "3", "3", "3", "3", "3", "NA", "NA"]
                        ][rowIndex];

                        return (
                            <tr key={rowIndex}>
                                <td className="label-cell">{label}</td>
                                {values?.length ? (
                                    values.map((val, i) => (
                                        <td
                                            key={i}
                                            className={
                                                rowIndex === 10
                                                    ? 'cf-average-cell'
                                                    : rowIndex === 11
                                                        ? 'cf-attainment-cell'
                                                        : ''
                                            }
                                            style={{
                                                backgroundColor: val === "NA" && rowIndex === 11 ? 'yellow' : undefined,
                                                color:
                                                    rowIndex === 10 || rowIndex === 11
                                                        ? val === "NA"
                                                            ? 'red'
                                                            : 'inherit'
                                                        : undefined
                                            }}
                                        >
                                            {val}
                                        </td>
                                    ))
                                ) : (
                                    <td colSpan={8}></td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Excel Upload Section */}
            <div className="excel-upload-container">
                <label htmlFor="excel-upload" className="upload-label">
                    Upload Excel File:
                </label>
                <input type="file" id="excel-upload" accept=".xlsx" className="excel-input" />
                <button className="hint-button" onClick={() => setShowModal(true)}>
                    Hint
                </button>
            </div>

            {/* Hint Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2 className="modal-title">Ideal Excel Format</h2>
                        {/* <img src={} alt="Excel format hint" className="modal-image" /> */}
                        <button className="close-button" onClick={() => setShowModal(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>

    );
};

export default CourseFeedback;
