import React, { useState } from 'react';
import './targets.css';

const Targets: React.FC = () => {
    // Default empty values for CO Attainment table
    const defaultCOPrev = { co: Array(8).fill('') };
    const defaultCOAttained = { co: Array(8).fill('') };
    const defaultCOCurrent = { co: Array(8).fill('') };

    const [coPrev, setCoPrev] = useState(defaultCOPrev);
    const [coAttained, setCoAttained] = useState(defaultCOAttained);
    const [coCurrent, setCoCurrent] = useState(defaultCOCurrent);

    const defaultPO = Array(16).fill('');
    const [poTargets, setPoTargets] = useState<string[]>(defaultPO);

    const handleCOChange = (row: 'prev' | 'attained' | 'current', index: number, value: string) => {
        if (row === 'prev') {
            const newArr = [...coPrev.co];
            newArr[index] = value;
            setCoPrev({ co: newArr });
        } else if (row === 'attained') {
            const newArr = [...coAttained.co];
            newArr[index] = value;
            setCoAttained({ co: newArr });
        } else if (row === 'current') {
            const newArr = [...coCurrent.co];
            newArr[index] = value;
            setCoCurrent({ co: newArr });
        }
    };

    const handlePOChange = (index: number, value: string) => {
        const newArr = [...poTargets];
        newArr[index] = value;
        setPoTargets(newArr);
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
                <button className="save-button">Save</button>
            </div>
        </div>
    );
};

export default Targets;
