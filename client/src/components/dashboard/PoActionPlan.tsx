import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PoActionPlan.css';

const PoActionPlan: React.FC = () => {
    const initialPO = [
        { name: "PO1", statement: "Engineering Problems" },
        { name: "PO2", statement: "Problem Analysis" },
        { name: "PO3", statement: "Design/Development of Solution" },
        { name: "PO4", statement: "Conduct Investigation of Complex problems" },
        { name: "PO5", statement: "Modern Tool Usage" },
        { name: "PO6", statement: "The engineer and soceity" },
        { name: "PO7", statement: "Environment and sustainibility" },
        { name: "PO8", statement: "Ethics" },
        { name: "PO9", statement: "Individual and teamwork" },
        { name: "PO10", statement: "Communication" },
        { name: "PO11", statement: "Project management and finance" },
        { name: "PO12", statement: "Life long learning" }
    ];

    const initialPSO = [
        { name: "PSO1", statement: "Analyse and solve real world problems by applying a combination of hardware and software." },
        { name: "PSO2", statement: "Formulate & build optimised solutions for systems level software & computationally intensive applications." },
        { name: "PSO3", statement: "Design & model applications for various domains using standard software engineering practices." },
        { name: "PSO4", statement: "Design & develop solutions for distributed processing & communication." }
    ];

    const [poData, setPOData] = useState<any[]>([]);
    const [psoData, setPSOData] = useState<any[]>([]);
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('jwtToken='))
        ?.split('=')[1];

    const courseId = localStorage.getItem('currentCourse');

    if (!token || !courseId) {
        console.error("Missing token or courseId");
        alert("You're missing token or courseId. Please re-authenticate or refresh.");
        return;
    }
    useEffect(() => {
        const fetchActionPlan = async () => {
    

            try {
                const response = await axios.get('http://localhost:8080/final/getPoPlan', {
                    headers: {
                        Authorization: `${token}`
                    },
                    params: {
                        courseId
                    }
                });

                const responseData = response.data;
                //console.log(responseData[1].action.stat)
                const mappedPO = initialPO.map((po, i) => ({
                    ...po,
                    target: responseData[i].targetSet,
                    attained: responseData[i].attained,
                    achieved: (responseData[i].attained) >= (responseData[i].targetSet) ? "Y" : "N",
                    actionPlan: responseData[i] ? responseData[i] : " "
                }));

                const mappedPSO = initialPSO.map((pso, i) => ({
                    ...pso,
                    target: responseData[i + 12].targetSet,
                    attained: responseData[i + 12].attained,
                    achieved: (responseData[i + 12].attained) >= (responseData[i + 12].targetSet) ? "Y" : "N",
                    actionPlan: responseData[i] ? responseData[i] : " "
                }));

                setPOData(mappedPO);
                setPSOData(mappedPSO);
            } catch (error) {
                console.error("Error fetching action plan data:", error);
                alert("Failed to fetch data. Please try again later.");
            }
        };

        fetchActionPlan();
    }, []);

    const handleActionPlanChange = (type: "PO" | "PSO", index: number, value: string) => {
        if (type === "PO") {
            const updated = [...poData];
            updated[index].actionPlan = value;
            setPOData(updated);
        } else {
            const updated = [...psoData];
            updated[index].actionPlan = value;
            setPSOData(updated);
        }
    };

    const handleSave = async () => {
        const updates = [...poData, ...psoData].map(item => item.actionPlan);
        console.log(updates)
        try {
            const response = await axios.post('http://localhost:8080/final/postPoPlan', {
                "updates":updates,
                "courseId":courseId
            }, {
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.data?.message) {
                alert(response.data.message); 
            } else {
                alert("Saved, but no confirmation message received.");
            }
        } catch (error) {
            console.error("Error saving action plans:", error);
            alert("Failed to save action plans. Please try again.");
        }
    };
    
    return (
        <div className="course-targets-container">
            <h1>PO & PSO Action Plan</h1>

            <h2>Program Outcomes (PO)</h2>
            <table className="targets-table">
                <thead>
                    <tr>
                        <th>PO</th>
                        <th>PO Statement</th>
                        <th>Target Set</th>
                        <th>Target Attained</th>
                        <th>Target Achieved (Y/N)</th>
                        <th>Action Plan</th>
                    </tr>
                </thead>
                <tbody>
                    {poData.map((po, index) => (
                        <tr key={index}>
                            <td>{po.name}</td>
                            <td>{po.statement}</td>
                            <td>{po.target}</td>
                            <td>{po.attained}</td>
                            <td>{po.achieved}</td>
                            <td>
                                <input
                                    type="text"
                                    value={po.actionPlan}
                                    onChange={(e) => handleActionPlanChange("PO", index, e.target.value)}
                                    placeholder="Enter action plan"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Program Specific Outcomes (PSO)</h2>
            <table className="targets-table">
                <thead>
                    <tr>
                        <th>PSO</th>
                        <th>PSO Statement</th>
                        <th>Target Set</th>
                        <th>Target Attained</th>
                        <th>Target Achieved (Y/N)</th>
                        <th>Action Plan</th>
                    </tr>
                </thead>
                <tbody>
                    {psoData.map((pso, index) => (
                        <tr key={index}>
                            <td>{pso.name}</td>
                            <td>{pso.statement}</td>
                            <td>{pso.target}</td>
                            <td>{pso.attained}</td>
                            <td>{pso.achieved}</td>
                            <td>
                                <input
                                    type="text"
                                    value={pso.actionPlan}
                                    onChange={(e) => handleActionPlanChange("PSO", index, e.target.value)}
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

export default PoActionPlan;
