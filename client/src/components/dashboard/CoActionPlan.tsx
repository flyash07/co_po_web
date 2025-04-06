import React, { useState, useEffect } from 'react';
import './CoActionPlan.css';

const CoActionPlan: React.FC = () => {
    //get api call

    const temp_val = [
        {name: "CO1",statement: "temp co 1",attained: 2.0,target: 2.0,achieved: "Y",actionPlan: ""},
        {name: "CO2",statement: "temp co 2",attained: 2.0,target: 2.0,achieved: "Y",actionPlan: ""},
        {name: "CO3",statement: "temp co 3",attained: 2.0,target: 2.0,achieved: "Y",actionPlan: ""},
        {name: "CO4",statement: "temp co 4",attained: 2.0,target: 2.0,achieved: "Y",actionPlan: ""},
        {name: "CO5",statement: "temp co 5",attained: 2.0,target: 2.0,achieved: "Y",actionPlan: ""},
        {name: "CO6",statement: "temp co 5",attained: 2.0,target: 2.0,achieved: "Y",actionPlan: ""},
        {name: "CO7",statement: "temp co 5",attained: 2.0,target: 2.0,achieved: "Y",actionPlan: ""},
        {name: "CO8",statement: "temp co 6",attained: 2.0,target: 2.0,achieved: "Y",actionPlan: ""}
    ];

    const [coData, setCOData] = useState(temp_val);

    const handleActionPlanChange = (index: number, value: string) => {
        const updatedData = [...coData];
        updatedData[index].actionPlan = value;
        setCOData(updatedData);
    };

    const handleSave = () => {
        console.log("saved");
        // post api call
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
                            <td>{co.target}</td>
                            <td>{co.attained}</td>
                            <td>{co.achieved}</td>
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
