import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PoRootCause.css";

const PoRootCause: React.FC = () => {
  const [poRootCause, setPoRootCause] = useState("");
  const [psoRootCause, setPsoRootCause] = useState("");

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwtToken="))
      ?.split("=")[1];

    const courseId = localStorage.getItem("currentCourse");

    if (!token || !courseId) {
      console.error("Missing token or courseId");
      alert("You're missing token or courseId. Please re-authenticate or refresh.");
      return;
    }

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    axios
      .get(`${BACKEND_URL}/root/getPo`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        params: {
          courseId,
        },
      })
      .then((response) => {
        setPoRootCause(response.data.statPo || "");
        setPsoRootCause(response.data.statPso || "");
      })
      .catch((error) => {
        console.error("Error fetching PO/PSO root cause:", error);
      });
  }, []);

  const handleSubmit = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwtToken="))
      ?.split("=")[1];

    const courseId = localStorage.getItem("currentCourse");

    if (!token || !courseId) {
      console.error("Missing token or courseId");
      alert("You're missing token or courseId. Please re-authenticate or refresh.");
      return;
    }

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const payload =
      {
        courseID: courseId,
        statPo: poRootCause,
        statPso: psoRootCause,
      };
      console.log(payload)
    axios
      .post(`${BACKEND_URL}/root/PostPo`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then(() => {
        alert("PO/PSO Root Cause submitted successfully!");
      })
      .catch((error) => {
        console.error("Error submitting PO/PSO root cause:", error);
        alert("Failed to submit PO/PSO root cause.");
      });
  };

  return (
    <div className="po-root-cause-container">
      <h1>Programme Outcome (PO) & Program Specific Outcome (PSO) Attainment Analysis (Root Cause Analysis)</h1>
      <p className="subtitle">
        This is to be done using overall PO attainment to identify/suggest action plans for improving PO Attainment, 
        Explain in detail the Outcome Analysis
      </p>

      <div className="note">
        <strong>Note:</strong> Identify the areas of weaknesses in the program based on the analysis of evaluation of COs, POs & PSOs attainment levels. 
        Measures identified and implemented to improve POs& PSOs attainment levels for the assessment year including curriculum intervention, pedagogical initiatives, 
        support system improvements, etc.Actions to be written as per table in the next page
      </div>

      <h2 className="head">Examples of Analysis and Proposed Actions</h2>
      <div className="example">
        <h3>Sample 1:</h3>
        <p>
          Course outcomes for a laboratory course did not measure up, as some of the lab equipment did not have the capability to do the needful 
          (e.g., single trace oscilloscopes available where dual trace would have been better, or non-availability of some important support software, etc.).
        </p>
        <p><strong>Action taken:</strong> Equipment up-gradation was carried out (with details of up-gradation).</p>
      </div>

      <div className="example">
        <h3>Sample 2:</h3>
        <p>
          In a course on EM theory, student performance has been consistently low with respect to some COs. 
          Analysis of answer scripts and discussions with the students revealed that this could be attributed to a weaker course on vector calculus.
        </p>
        <p><strong>Action taken:</strong> Revision of the course syllabus was carried out (instructor/textbook changed too when deemed appropriate).</p>
      </div>

      <div className="example">
        <h3>Sample 3:</h3>
        <p>
          In a course that had group projects, it was determined that the expectations from this course about PO3 
          (like: “to meet the specifications with consideration for the public health and safety, and the cultural, societal, and environmental considerations”) 
          were not realized as there were no discussions about these aspects while planning and execution of the project.
        </p>
        <p>
          <strong>Action taken:</strong> Project planning, monitoring, and evaluation included in rubrics related to these aspects.
        </p>
        <p><strong>POs Attainment Levels and Actions for improvement:</strong> CAYm1 only</p>
      </div>

      <div className="form-section">
        <label htmlFor="poRootCause">Enter PO Root Cause:</label>
        <textarea
          id="poRootCause"
          value={poRootCause}
          onChange={(e) => setPoRootCause(e.target.value)}
          rows={5}
        />

        <label htmlFor="psoRootCause" style={{ marginTop: "1rem" }}>Enter PSO Root Cause:</label>
        <textarea
          id="psoRootCause"
          value={psoRootCause}
          onChange={(e) => setPsoRootCause(e.target.value)}
          rows={5}
        />

        <button onClick={handleSubmit} style={{ marginTop: "1rem" }}>
          Submit PO/PSO Root Causes
        </button>
      </div>

      <p className="closing-note">
        Identify the areas of weaknesses in the program based on the analysis of evaluation of POs attainment levels.
        Measures identified and implemented to improve POs attainment levels for the assessment years including curriculum intervention, pedagogical initiatives, support system improvements, etc.
      </p>
    </div>
  );
};

export default PoRootCause;
