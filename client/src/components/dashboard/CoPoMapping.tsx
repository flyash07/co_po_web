import React, { useEffect, useState } from 'react';
import './CoPoMapping.css';
import axios from 'axios';

const CoPoMapping: React.FC = () => {
    const [mappingMatrix, setMappingMatrix] = useState<number[][]>([]);
    const [coList, setCoList] = useState<string[]>([]);
    const [poPsoList, setPoPsoList] = useState<string[]>([]);
    const [averages, setAverages] = useState<number[]>([]);
    const token = document.cookie.split('; ')
            .find(row => row.startsWith('jwtToken='))
            ?.split('=')[1];
    
    const courseId = localStorage.getItem('currentCourse');
    
    useEffect(() => {
        const fetchMapping = async () => {
            try {
                const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
                const response = await axios.get(`${BACKEND_URL}/course/getCoPo`, {
                    headers: {
                        Authorization: `${token}`
                    },
                    params: {
                        courseId
                    }
                });
    
                let matrix: number[][] = response.data;
    
                // If matrix is empty or invalid, set default 8x16 matrix of zeros
                if (!Array.isArray(matrix) || matrix.length === 0) {
                    matrix = Array.from({ length: 8 }, () =>
                        Array(16).fill(0)
                    );
                }
    
                setMappingMatrix(matrix);
    
                // Set CO and PO/PSO labels
                setCoList(matrix.map((_, i) => `CO${i + 1}`));
                setPoPsoList(matrix[0].map((_, i) => i < 12 ? `PO${i + 1}` : `PSO${i - 11}`));
    
                // Calculate averages
                const colCount = matrix[0].length;
                const colSums = Array(colCount).fill(0);
                matrix.forEach(row => {
                    row.forEach((val, colIdx) => {
                        colSums[colIdx] += val;
                    });
                });
                const avg = colSums.map(sum => sum / matrix.length);
                setAverages(avg);
            } catch (err) {
                console.error('Error fetching mapping matrix:', err);
            }
        };
    
        fetchMapping();
    }, []);
    
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
                                    {/* Display values without input fields */}
                                    <div style={{ textAlign: 'center' }}>
                                        {mappingMatrix[rowIdx]?.[colIdx] ?? 0}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                    <tr>
                        <td style={{ fontWeight: 'bold' }}>Average</td>
                        {averages.map((avg, idx) => (
                            <td key={idx} style={{ fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>
                                {avg.toFixed(2)}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CoPoMapping;
