import React, { useEffect, useState } from 'react';
import './CoAttainment.css'; // Reuse existing CSS

const CoPoMapping: React.FC = () => {
    const [mappingMatrix, setMappingMatrix] = useState<number[][]>([]);
    const [coList, setCoList] = useState<string[]>([]);
    const [poPsoList, setPoPsoList] = useState<string[]>([]);
    const [Averages, setAverages] = useState<number[]>([]);

    useEffect(() => {
        //get api call instead
        const COs = ['CO1', 'CO2', 'CO3', 'CO4', 'CO5', 'CO6'];
        const POs = [
            'PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6',
            'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PO12',
            'PSO1', 'PSO2', 'PSO3', 'PSO4'
        ];

        const Matrix = [
            [3, 2, 1, 0, 2, 3, 1, 0, 2, 1, 0, 1, 2, 1, 0, 1],
            [2, 2, 2, 1, 1, 2, 0, 1, 1, 0, 1, 2, 0, 1, 2, 0],
            [1, 1, 0, 3, 3, 2, 2, 0, 1, 2, 1, 0, 1, 0, 2, 1],
            [2, 0, 1, 1, 2, 3, 1, 1, 0, 1, 2, 2, 1, 1, 1, 0],
            [0, 2, 1, 1, 0, 1, 2, 2, 3, 1, 1, 0, 0, 1, 1, 2],
            [3, 3, 2, 2, 1, 1, 0, 2, 0, 3, 1, 1, 2, 2, 1, 1],
        ];

        const Avg = [2.3, 1.8, 1.2, 1.5, 1.6, 2.0, 1.0, 1.2, 1.5, 1.3, 1.0, 1.2, 1.2, 1.0, 1.3, 1.1];

        setCoList(COs);
        setPoPsoList(POs);
        setMappingMatrix(Matrix);
        setAverages(Avg);
    }, []);

    const handleChange = (rowIndex: number, colIndex: number, value: string) => {
        const updated = [...mappingMatrix];
        updated[rowIndex][colIndex] = Number(value);
        setMappingMatrix(updated);
    };

    const handleSubmit = () => {
        //post api call
        console.log('Submitted matrix:', mappingMatrix);
        setTimeout(() => {
            
        }, 2000);

        //get api call
    };

    return (
        <div className="co-attainment-container">
            <h2>CO-PO/PSO Mapping</h2>
            <table className="attainment-table">
                <thead>
                    <tr>
                        <th>CO \\ PO-PSO</th>
                        {poPsoList.map((header, idx) => (
                            <th key={idx}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {coList.map((co, rowIdx) => (
                        <tr key={rowIdx}>
                            <td>{co}</td>
                            {poPsoList.map((_, colIdx) => (
                                <td key={colIdx}>
                                    <input
                                        type="number"
                                        min={0}
                                        max={3}
                                        value={mappingMatrix[rowIdx]?.[colIdx] ?? 0}
                                        onChange={(e) => handleChange(rowIdx, colIdx, e.target.value)}
                                        style={{ width: '50px', textAlign: 'center' }}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                    <tr>
                        <td style={{ fontWeight: 'bold' }}>Average</td>
                        {Averages.map((avg, idx) => (
                            <td key={idx} style={{ fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>
                                {avg.toFixed(2)}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button onClick={handleSubmit} className="save-button">Submit</button>
            </div>
        </div>
    );
};

export default CoPoMapping;
