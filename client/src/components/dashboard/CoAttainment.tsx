import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CoAttainment.css';

const CoAttainment: React.FC = () => {
    const [coAttainment, setCoAttainment] = useState<number[][]>([]);
    const [overallAttainment, setOverallAttainment] = useState<number[][]>([]);
    const [target, setTarget] = useState<number[]>([]);
    const [achieved, setAchieved] = useState<string[]>([]);

    const coHeaders = ['CO1', 'CO2', 'CO3', 'CO4', 'CO5', 'CO6', 'CO7', 'CO8'];

    useEffect(() => {
        const token = document.cookie.split('; ')
            .find(row => row.startsWith('jwtToken='))
            ?.split('=')[1];
    
        const courseId = localStorage.getItem('currentCourse');
    
        if (!token || !courseId) {
            console.error("Missing token or courseId");
            return;
        }
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        axios.get(`${BACKEND_URL}/final/coAtt`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
            params: { courseId }
        })
            .then(res => {
                const data = res.data;

                const inSem: number[] = [];
                const endSem: number[] = [];
                const finalCo: number[] = [];

                const directOverall: number[] = [];
                const indirectOverall: number[] = [];
                const overall: number[] = [];

                const targetArray: number[] = [];
                const achievedArray: string[] = [];

                data.forEach((item: any) => {
                    const inS = item.direct.inSem ?? 0;
                    const endS = item.direct.endSem ?? 0;
                    const final = item.direct.finalCo ?? 0;

                    const direct = item.overall.direct ?? 0;
                    const indirect = item.overall.inDirect ?? 0;
                    const over = item.overall.overall ?? 0;

                    const tgt = item.target ?? 0;

                    inSem.push(inS);
                    endSem.push(endS);
                    finalCo.push(final);

                    directOverall.push(direct);
                    indirectOverall.push(indirect);
                    overall.push(over);
                    targetArray.push(tgt);

                    if (direct === 0 || indirect === 0) {
                        achievedArray.push('N/A');
                    } else if (over >= tgt) {
                        achievedArray.push('Y');
                    } else {
                        achievedArray.push('N');
                    }
                });

                setCoAttainment([inSem, endSem, finalCo]);
                setOverallAttainment([directOverall, indirectOverall, overall]);
                setTarget(targetArray);
                setAchieved(achievedArray);
            })
            .catch(err => {
                console.error("Failed to fetch CO attainment data:", err);
            });
    }, []);

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
                            <td key={`indirect-${idx}`} >{val === 0 ? 'NA' : val.toFixed(2)}</td>
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
                            <td key={`achieved-${idx}`} style={{ color: val === 'Y' ? 'green' : val === 'N' ? 'red' : 'gray', fontWeight: 'bold' }}>
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
