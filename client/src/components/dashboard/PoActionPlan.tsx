import React, { useState, useEffect } from 'react';
import './PoActionPlan.css';

const PoActionPlan: React.FC = () => {
    //get api call

    // temp stuff
    const tempPO= [
        { name: "PO1", statement: "temp po1", attained: 2.0, target: 2.0, achieved: "Y", actionPlan: "" },
        { name: "PO2", statement: "temp po2", attained: 2.0, target: 2.0, achieved: "Y", actionPlan: "" },
        { name: "PO3", statement: "temp po3", attained: 2.0, target: 2.0, achieved: "Y", actionPlan: "" },
        { name: "PO4", statement: "temp po4", attained: 2.0, target: 2.0, achieved: "Y", actionPlan: "" },
        { name: "PO5", statement: "temp po5", attained: 2.0, target: 2.0, achieved: "Y", actionPlan: "" },
        { name: "PO6", statement: "temp po6", attained: 2.0, target: 2.0, achieved: "Y", actionPlan: "" },
        { name: "PO7", statement: "temp po7", attained: 2.0, target: 2.0, achieved: "Y", actionPlan: "" },
        { name: "PO8", statement: "temp po8", attained: 2.0, target: 2.0, achieved: "Y", actionPlan: "" },
        { name: "PO9", statement: "temp po9", attained: 2.0, target: 2.0, achieved: "Y", actionPlan: "" },
        { name: "PO10", statement: "temp po10", attained: 2.0, target: 2.0, achieved: "Y", actionPlan: "" },
        { name: "PO11", statement: "temp po11", attained: 2.0, target: 2.0, achieved: "Y", actionPlan: "" },
        { name: "PO12", statement: "temp po12", attained: 2.0, target: 2.0, achieved: "Y", actionPlan: "" }
    ];

    const tempPSO= [
        { name: "PSO1", statement: "Embedded systems expertise", attained: 2.0, target: 2.0, achieved: "Y", actionPlan: "" },
        { name: "PSO2", statement: "IoT and sensor integration", attained: 2.0, target: 2.0, achieved: "Y", actionPlan: "" },
        { name: "PSO3", statement: "Software-hardware co-design", attained: 2.0, target: 2.0, achieved: "Y", actionPlan: "" },
        { name: "PSO4", statement: "AI and machine learning applications", attained: 2.0, target: 2.0, achieved: "Y", actionPlan: "" }
    ];

    const [poData, setPOData] = useState(tempPO);
    const [psoData, setPSOData] = useState(tempPSO);

    const handleActionPlanChange = (type: "PO" | "PSO", index: number, value: string) => {
        if (type === "PO") {
            const updatedData = [...poData];
            updatedData[index].actionPlan = value;
            setPOData(updatedData);
        } else {
            const updatedData = [...psoData];
            updatedData[index].actionPlan = value;
            setPSOData(updatedData);
        }
    };

    const handleSave = () => {
        //console.log("saved");
        //post api call
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
