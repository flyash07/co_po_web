import React, { useEffect, useState } from "react";
import "./PoPsoAttainment.css";
// import axios from "axios"; // Uncomment when real API is used

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

  useEffect(() => {
    // Uncomment this section for real API
    /*
    axios.get('/api/copopso')
      .then(res => {
        const data = res.data;
        setMatrix(data.mappingMatrix);
        setDirectPOAttain(data.directPOAttainment);
        setOverallPOAttain(data.overallPOAttainment);
        setDirectCOAttain(data.directCOAttainment);
        setOverallCOAttain(data.overallCOAttainment);
        setTargetSet(data.targetSet);
      });
    */

    // Dummy placeholder data for development
    setMatrix(Array(8).fill(0).map(() => Array(16).fill(0).map(() => Math.floor(Math.random() * 4))));
    setDirectCOAttain([2.03, 1.26, 1.49, 2.14, 1.38, 1.0, 1.17, 0]);
    setOverallCOAttain([2.22, 1.6, 1.79, 2.3, 1.71, 1.62, 0, 1.7]);
    setDirectPOAttain([1.4, 1.32, 1.25, 1.19, 1.19, 1.0, 0.0, 1.38, 1.19, 1.17, 0.0, 1.38, 1.38, 0.0, 0.0, 0.0]);
    setOverallPOAttain([1.66, 1.6, 1.55, 1.55, 1.55, 1.7, 1.0, 1.7, 1.7, 1.53, 0.0, 1.7, 3.0, 0.0, 0.0, 0.0]);
    setTargetSet([1.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 3.0, 0.0, 0.0, 0.0]);
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
