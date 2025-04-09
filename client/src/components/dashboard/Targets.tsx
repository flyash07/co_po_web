import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Targets.css';

const Targets: React.FC = () => {
    const defaultCOPrev = { co: Array(8).fill('') };
    const defaultCOAttained = { co: Array(8).fill('') };
    const defaultCOCurrent = { co: Array(8).fill('') };
    const defaultPO = Array(16).fill('');

    const [coPrev, setCoPrev] = useState(defaultCOPrev);
    const [coAttained, setCoAttained] = useState(defaultCOAttained);
    const [coCurrent, setCoCurrent] = useState(defaultCOCurrent);
    const [poTargets, setPoTargets] = useState<string[]>(defaultPO);

    useEffect(() => {
        const fetchTargets = async () => {
            const token = document.cookie.split('; ')
                .find(row => row.startsWith('jwtToken='))
                ?.split('=')[1];

            const courseId = localStorage.getItem('currentCourse');

            if (!token || !courseId) {
                console.error("Missing token or courseId");
                return;
            }

            try {
                const response = await axios.get("http://localhost:8080/course/getTargets", {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`
                    },
                    params: { courseId }
                });

                const data = response.data;

                if (data) {
                    setCoPrev({ co: data.coPrevTargets.map(String) });
                    setCoAttained({ co: data.coPrevAttained.map(String) });
                    setCoCurrent({ co: data.coTargets.map(String) });

                    const fullPoTargets = [...data.poTargets, ...data.psoTargets].map(String);
                    setPoTargets(fullPoTargets);
                }

            } catch (error) {
                console.error("Error fetching targets:", error);
            }
        };

        fetchTargets();
    }, []);

    return (
        <div className="course-targets-container">
            <h1>Course Targets</h1>

            <h3>CO Attainment Target for the Current Semester</h3>
            <table className="targets-table">
                <thead>
                    <tr>
                        <th style={{ backgroundColor: 'yellow', color: 'red', padding: '10px', textAlign: 'center' }}>Course Outcomes</th>
                        {Array.from({ length: 8 }, (_, i) => (
                            <th key={`co${i + 1}`}>CO{i + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Target set in the previous cycle</td>
                        {coPrev.co.map((val, idx) => (
                            <td key={`prev-co-${idx}`}>{val}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Attained values in the previous cycle</td>
                        {coAttained.co.map((val, idx) => (
                            <td key={`attained-co-${idx}`}>{val}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Target for the current semester</td>
                        {coCurrent.co.map((val, idx) => (
                            <td key={`current-co-${idx}`}>{val}</td>
                        ))}
                    </tr>
                </tbody>
            </table>

            <h3>PO & PSO Attainment Target Set for the Current Semester</h3>
            <table className="targets-table">
                <thead>
                    <tr>
                        <th>PO & PSO</th>
                        {['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PO12', 'PSO1', 'PSO2', 'PSO3', 'PSO4'].map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Target</td>
                        {poTargets.map((val, idx) => (
                            <td key={`po-${idx}`}>{val}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Targets;
