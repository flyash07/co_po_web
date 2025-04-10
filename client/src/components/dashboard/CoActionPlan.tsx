import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CoActionPlan.css';

interface CODataItem {
    name: string;
    statement: string;
    attained: number;
    target: number;
    achieved: string;
    actionPlan: string;
}

const CoActionPlan: React.FC = () => {
    const [coData, setCOData] = useState<CODataItem[]>([]);

    useEffect(() => {
        const token = document.cookie.split('; ')
            .find(row => row.startsWith('jwtToken='))
            ?.split('=')[1];
    
        const courseId = localStorage.getItem('currentCourse');
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        axios.get(`${BACKEND_URL}/final/getCoPlan`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
            params: { courseId }
        })  
            .then(res => {
                const data = res.data;

                const mappedCOs: CODataItem[] = data.map((item: any, index: number) => {
                    const target = item.targetSet ?? 0;
                    const attained = item.attained ?? 0;

                    return {
                        name: `CO${index + 1}`,
                        statement: item.stat ,
                        attained,
                        target,
                        achieved: attained >= target ? 'Y' : 'N',
                        actionPlan: item.action ? item.action.stat : " ",
                    };
                });

                setCOData(mappedCOs);
            })
            .catch(err => {
                console.error("Error fetching CO data:", err);
            });
    }, []);

    const handleActionPlanChange = (index: number, value: string) => {
        const updated = [...coData];
        updated[index].actionPlan = value;
        setCOData(updated);
    };

    const handleSave = async () => {
        const token = document.cookie.split('; ')
            .find(row => row.startsWith('jwtToken='))
            ?.split('=')[1];
        const courseId = localStorage.getItem('currentCourse');
        const payload = {
            stats: coData.map(co => co.actionPlan),
            courseId: courseId, 
        };
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        const res=await axios.post(`${BACKEND_URL}/final/postAction`, payload, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            }
        });
        console.log(res.data.message)
    };
    

    return (
        <div className="course-targets-container">
            <h1>CO Action Plan</h1>
            <table className="targets-table">
                <thead>
                    <tr>
                        <th>CO</th>
                        <th>CO Statement</th>
                        <th>Target Set</th>
                        <th>Target Attained</th>
                        <th>Target Achieved (Y/N)</th>
                        <th>Action Plan</th>
                    </tr>
                </thead>
                <tbody>
                    {coData.map((co, index) => (
                        <tr key={index}>
                            <td>{co.name}</td>
                            <td>{co.statement}</td>
                            <td>{co.target.toFixed(2)}</td>
                            <td>{co.attained.toFixed(2)}</td>
                            <td style={{ color: co.achieved === 'Y' ? 'green' : 'red', fontWeight: 'bold' }}>
                                {co.achieved}
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={co.actionPlan}
                                    onChange={(e) => handleActionPlanChange(index, e.target.value)}
                                    placeholder="Enter action plan"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-row">
                <button className="save-button" onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default CoActionPlan;
