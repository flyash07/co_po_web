import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PoPsoAttainment.css";

const COs = ["CO1", "CO2", "CO3", "CO4", "CO5", "CO6", "CO7", "CO8"];
const PO_PSO = [
  "PO1", "PO2", "PO3", "PO4", "PO5", "PO6",
  "PO7", "PO8", "PO9", "PO10", "PO11", "PO12",
  "PSO1", "PSO2", "PSO3", "PSO4"
];

const PoPsoAttainment = () => {
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [directPOAttain, setDirectPOAttain] = useState<number[]>([]);
  const [overallPOAttain, setOverallPOAttain] = useState<number[]>([]);
  const [directCOAttain, setDirectCOAttain] = useState<number[]>([]);
  const [overallCOAttain, setOverallCOAttain] = useState<number[]>([]);
  const [targetSet, setTargetSet] = useState<number[]>([]);
  const token = document.cookie.split('; ')
            .find(row => row.startsWith('jwtToken='))
            ?.split('=')[1];
    
        const courseId = localStorage.getItem('currentCourse');
  useEffect(() => {
    const fetchPoAttainment = async () => {
      try {
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${BACKEND_URL}/final/poAtt`, {
          headers: {
            Authorization: `${token}`
          },
          params: {
            courseId
          }
        });

        const data = response.data;
        console.log(response.data.overallPso)
        const combinedMatrix = data.po.map((poRow: number[], idx: number) => (
          [...poRow, ...data.pso[idx]]
        ));
        const directCombined = [...data.directPo, ...data.directPso];
        const overallCombined = [...data.overallPo, ...data.overallPso];
        const targetCombined = [...data.targetPo, ...data.targetPso];

        setMatrix(combinedMatrix);
        setDirectCOAttain(data.directCo);
        setOverallCOAttain(data.overallCo);
        setDirectPOAttain(directCombined);
        setOverallPOAttain(overallCombined);
        setTargetSet(targetCombined);
      } catch (err) {
        console.error("Error fetching PO/PSO attainment data:", err);
      }
    };

    fetchPoAttainment();
  }, []);

  const getTargetStatus = (val: number, target: number): string => {
    if (target === 0 || val === 0) return "NA";
    return val >= target ? "Y" : "N";
  };

  const renderTable = (
    title: string,
    coAttain: number[],
    poAttain: number[],
    isDirect: boolean
  ) => (
    <div className="matrix-section">
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            <th>{isDirect ? "Direct" : "Overall"} CO Att.</th>
            <th>CO</th>
            {PO_PSO.map((po, idx) => (
              <th key={idx}>{po}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              <td>{coAttain[i]?.toFixed(2) ?? "-"}</td>
              <td>{COs[i]}</td>
              {row.map((val, j) => (
                <td key={j}>{val}</td>
              ))}
            </tr>
          ))}
          <tr className="highlight-row">
            <td colSpan={2}><strong>Attainment</strong></td>
            {poAttain.map((val, i) => (
              <td key={i}>{val.toFixed(2)}</td>
            ))}
          </tr>
          <tr className="highlight-row">
            <td colSpan={2}><strong>Target Set</strong></td>
            {targetSet.map((val, i) => (
              <td key={i}>{val.toFixed(2)}</td>
            ))}
          </tr>
          <tr className="highlight-row">
            <td colSpan={2}><strong>Target Attained</strong></td>
            {poAttain.map((val, i) => (
              <td key={i} className={`status ${getTargetStatus(val, targetSet[i])}`}>
                {getTargetStatus(val, targetSet[i])}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="matrix-container">
      {renderTable("Direct PO & PSO Attainment", directCOAttain, directPOAttain, true)}
      {renderTable("Overall (Indirect) PO & PSO Attainment", overallCOAttain, overallPOAttain, false)}
    </div>
  );
};

export default PoPsoAttainment;
