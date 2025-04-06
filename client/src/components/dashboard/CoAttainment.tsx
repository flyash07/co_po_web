import React, { useEffect, useState } from 'react';
import './CoAttainment.css';

const CoAttainment: React.FC = () => {
    const [coAttainment, setCoAttainment] = useState<number[][]>([]);
    const [overallAttainment, setOverallAttainment] = useState<number[][]>([]);
    const [target, setTarget] = useState<number[]>([]);
    const [achieved, setAchieved] = useState<string[]>([]);

    useEffect(() => {
       //api call here instead of fixed

        setCoAttainment([
            [2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 2.00],  //insem
            [2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 2.00],  //endsem
            [2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 2.00],  //direc
        ]);

        setOverallAttainment([
            [2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 2.00],  //direct
            [2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 2.00],  //indirect
            [2.00, 2.00, 2.00, 0.00, 2.00, 2.00, 2.00, 2.00],  //overall
        ]);

        setTarget([2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 2.00]);
        setAchieved(['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y']);
    }, []);

    const coHeaders = ['CO1', 'CO2', 'CO3', 'CO4', 'CO5', 'CO6', 'CO7', 'CO8'];

    return (
        <div className="co-attainment-container">
            <h2>CO Attainment</h2>
            <table className="attainment-table">
                <thead>
                    <tr>
                        <th>Weight</th>
                        <th>Tools</th>
                        {coHeaders.map(co => (
                            <th key={co}>{co}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>60</td>
                        <td>In Semester</td>
                        {coAttainment[0]?.map((val, idx) => (
                            <td key={`insem-${idx}`}>{val.toFixed(2)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>40</td>
                        <td>End Semester</td>
                        {coAttainment[1]?.map((val, idx) => (
                            <td key={`endsem-${idx}`}>{val.toFixed(2)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>100</td>
                        <td>CO Attainment</td>
                        {coAttainment[2]?.map((val, idx) => (
                            <td key={`final-${idx}`}>{val.toFixed(2)}</td>
                        ))}
                    </tr>
                </tbody>
            </table>

            <h2>Overall Attainment</h2>
            <table className="attainment-table">
                <thead>
                    <tr>
                        <th>Weight (%)</th>
                        {coHeaders.map(co => (
                            <th key={co}>{co}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Direct (80)</td>
                        {overallAttainment[0]?.map((val, idx) => (
                            <td key={`direct-${idx}`}>{val.toFixed(2)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Indirect (20)</td>
                        {overallAttainment[1]?.map((val, idx) => (
                            <td key={`indirect-${idx}`}>{isNaN(val) ? 'NA' : val.toFixed(2)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Overall (100)</td>
                        {overallAttainment[2]?.map((val, idx) => (
                            <td key={`overall-${idx}`}>{val.toFixed(2)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Target Set</td>
                        {target.map((val, idx) => (
                            <td key={`target-${idx}`}>{val.toFixed(2)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Target Achieved (Y/N)</td>
                        {achieved.map((val, idx) => (
                            <td key={`achieved-${idx}`} style={{ color: val === 'Y' ? 'green' : 'red', fontWeight: 'bold' }}>
                                {val}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CoAttainment;
