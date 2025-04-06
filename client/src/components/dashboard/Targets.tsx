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

    // Fetch data when component mounts
    useEffect(() => {
        const fetchTargets = async () => {
            const token = document.cookie.split('; ')
                .find(row => row.startsWith('jwtToken='))
                ?.split('=')[1];

            const courseId = localStorage.getItem('currentCourse'); // Ensure this is set correctly

            if (!token || !courseId) {
                console.error("Missing token or courseId");
                return;
            }


            console.log(token, courseId)

            try {
                const response = await axios.get("http://localhost:8080/course/getTargets", {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`
                    },
                    params: {
                        courseId
                    }
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

    const handleCOChange = (row: 'prev' | 'attained' | 'current', index: number, value: string) => {
        const update = (coArr: string[], setter: (val: { co: string[] }) => void) => {
            const newArr = [...coArr];
            newArr[index] = value;
            setter({ co: newArr });
        };

        if (row === 'prev') update(coPrev.co, setCoPrev);
        else if (row === 'attained') update(coAttained.co, setCoAttained);
        else if (row === 'current') update(coCurrent.co, setCoCurrent);
    };

    const handlePOChange = (index: number, value: string) => {
        const newArr = [...poTargets];
        newArr[index] = value;
        setPoTargets(newArr);
    };

    const handleSave = async () => {
        const token = document.cookie.split('; ')
            .find(row => row.startsWith('jwtToken='))?.split('=')[1];
        const courseId = localStorage.getItem('currentCourse');

        if (!token || !courseId) {
            console.error("Missing token or courseId");
            return;
        }

        try {
            // POST to /course/postTargets
            const response = await axios.post(
                "http://localhost:8080/course/postTargets",
                {
                    courseId,
                    coTargets: coCurrent.co.map(val => parseInt(val) || 0),
                    poTargets: poTargets.slice(0, 12).map(val => parseInt(val) || 0),
                    psoTargets: poTargets.slice(12).map(val => parseInt(val) || 0),
                },
                {
                    headers: {
                        Authorization: `${token}`
                    }
                }
            );

            console.log(response.data.message); // Should log "Target Updated"

            // Fetch updated targets
            const getResponse = await axios.get("http://localhost:8080/course/getTargets", {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                },
                params: {
                    courseId
                }
            });

            const data = getResponse.data;
            if (data) {
                setCoPrev({ co: data.coPrevTargets.map(String) });
                setCoAttained({ co: data.coPrevAttained.map(String) });
                setCoCurrent({ co: data.coTargets.map(String) });
                const fullPoTargets = [...data.poTargets, ...data.psoTargets].map(String);
                setPoTargets(fullPoTargets);
            }

        } catch (error) {
            console.error("Error saving targets:", error);
        }
    };

    const resetAll = () => {
        setCoPrev(defaultCOPrev);
        setCoAttained(defaultCOAttained);
        setCoCurrent(defaultCOCurrent);
        setPoTargets(defaultPO);
    };

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
                            <td key={`prev-co-${idx}`}>
                                <input type="number" value={val} onChange={(e) => handleCOChange('prev', idx, e.target.value)} />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td>Attained values in the previous cycle</td>
                        {coAttained.co.map((val, idx) => (
                            <td key={`attained-co-${idx}`}>
                                <input type="number" value={val} onChange={(e) => handleCOChange('attained', idx, e.target.value)} />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td>Target for the current semester</td>
                        {coCurrent.co.map((val, idx) => (
                            <td key={`current-co-${idx}`}>
                                <input type="number" value={val} onChange={(e) => handleCOChange('current', idx, e.target.value)} />
                            </td>
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
                            <td key={`po-${idx}`}>
                                <input type="number" value={val} onChange={(e) => handlePOChange(idx, e.target.value)} />
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
            <div className='button-row'>
                <button className="reset-button" onClick={resetAll}>Reset All</button>
                <button className="save-button" onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default Targets;
