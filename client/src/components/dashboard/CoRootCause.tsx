import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CoRootCause.css";

const CoRootCause: React.FC = () => {
  const [rootCauseText, setRootCauseText] = useState("");

  useEffect(() => {
    const token = document.cookie.split('; ')
            .find(row => row.startsWith('jwtToken='))
            ?.split('=')[1];

        const courseId = localStorage.getItem('currentCourse');

        if (!token || !courseId) {
            console.error("Missing token or courseId");
            alert("You're missing token or courseId. Please re-authenticate or refresh.");
            return;
        }
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    axios.get(`${BACKEND_URL}/root/getCo`, {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
      },
      params: {
          "courseId":courseId,
      }})
      .then(response => {
        setRootCauseText(response.data.statCo || "");
      })
      .catch(error => {
        console.error("Error fetching root cause:", error);
      });
  }, []);

  const handleSubmit = () => {
    const token = document.cookie.split('; ')
            .find(row => row.startsWith('jwtToken='))
            ?.split('=')[1];

    const courseId = localStorage.getItem('currentCourse');

    if (!token || !courseId) {
        console.error("Missing token or courseId");
        alert("You're missing token or courseId. Please re-authenticate or refresh.");
        return;
    }
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const payload={"courseId":courseId,"statCo":rootCauseText};
    console.log(payload);
    axios.post(`${BACKEND_URL}/root/postCo`, payload, {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
      }
  })
      .then(response => {
        alert("Root cause submitted successfully!");
      })
      .catch(error => {
        console.error("Error submitting root cause:", error);
        alert("Failed to submit root cause.");
      });
  };

  return (
    <div className="co-root-cause-container">
      <h1>Course Outcome (CO) Attainment Analysis (Root Cause Analysis)</h1>
      <p className="subtitle">
        This is to be done using overall CO attainment to identify/suggest action plans for improving CO Attainment.
        Explain in detail the Outcome Analysis.
      </p>

      <div className="note">
        <strong>Note:</strong> Identify the areas of weaknesses in the program based on the analysis of evaluation of COs, POs & PSOs attainment levels.
        Measures identified and implemented to improve POs & PSOs attainment levels for the assessment year including curriculum intervention, pedagogical initiatives, support system improvements, etc.
        Actions to be written as per table in the next page.
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
        <label htmlFor="rootCauseInput">Enter CO Root Cause:</label>
        <textarea
          id="rootCauseInput"
          value={rootCauseText}
          onChange={(e) => setRootCauseText(e.target.value)}
          rows={4}
          cols={50}
        />
        <br />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <p className="closing-note">
        Identify the areas of weaknesses in the program based on the analysis of evaluation of POs attainment levels.
        Measures identified and implemented to improve POs attainment levels for the assessment years including curriculum intervention, pedagogical initiatives, support system improvements, etc.
      </p>
    </div>
  );
};

export default CoRootCause;
