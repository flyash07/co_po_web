import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import "./Dashboard.css";
// import GeneralInstructions from "./GeneralInstructions";
import Targets from "./Targets";
import CoPoMapping from "./CoPoMapping"; 
// import CieMarks from "./CieMarks";
// import SeeMarks from "./SeeMarks";
  import CourseFeedback from "./CourseFeedback";
import CoAttainment from "./CoAttainment";
import CoRootCause from "./CoRootCause";
import CoActionPlan from "./CoActionPlan";
// import PoPsoAttainment from "./PoPsoAttainment"; //tonight
import PoRootCause from "./PoRootCause";
import PoActionPlan from "./PoActionPlan";

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const [selectedPage, setSelectedPage] = useState<null | string>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const links = [
    {
      name: "General Instructions",
      key: "general-instructions",
      visibleTo: ["Professor", "Coordinator", "HOD"],
    },
    { name: "Targets", key: "targets", visibleTo: ["Professor"] }, //to be changed to Coordinator
    {
      name: "CO to PO Mapping",
      key: "co-po-mapping",
      visibleTo: ["Coordinator"],
    },
    {
      name: "CIE Assessment Marks & Attainment",
      key: "cie-marks",
      visibleTo: ["Professor", "Coordinator", "HOD"],
    },
    {
      name: "SEE Marks & Attainment",
      key: "see-marks",
      visibleTo: ["Professor", "Coordinator", "HOD"],
    },
    {
      name: "Course Feedback",
      key: "course-feedback",
      visibleTo: ["Professor", "Coordinator", "HOD"],
    },
    {
      name: "Direct and Overall CO Attainment",
      key: "co-attainment",
      visibleTo: ["Professor", "Coordinator", "HOD"],
    },
    {
      name: "Root Cause Analysis for CO",
      key: "co-root-cause",
      visibleTo: ["Professor", "Coordinator", "HOD"],
    },
    {
      name: "Action Plan for CO",
      key: "co-action-plan",
      visibleTo: ["Professor", "Coordinator", "HOD"],
    },
    {
      name: "PO and PSO Attainment",
      key: "po-pso-attainment",
      visibleTo: ["Professor", "Coordinator", "HOD"],
    },
    {
      name: "Root Cause Analysis for PSO and PO",
      key: "po-root-cause",
      visibleTo: ["Professor", "Coordinator", "HOD"],
    },
    {
      name: "Action Plan for PO",
      key: "po-action-plan",
      visibleTo: ["Professor", "Coordinator", "HOD"],
    },
  ];

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <button
          className="toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "➤" : "✖"}
        </button>

        {!isCollapsed && (
          <>
            <h2 className="prof-name">{user}</h2>
            <div className="dropdown">
              <button className="dropdown-btn">Options ▼</button>
              <div className="dropdown-content">
                <button onClick={() => alert("Option 1 Selected")}>
                  Option 1
                </button>
                <button onClick={() => alert("Option 2 Selected")}>
                  Option 2
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Back Button - Show when inside a subpage */}
        {selectedPage && (
          <div className="back-button-container">
            <button
              className="back-button"
              onClick={() => setSelectedPage(null)}
            >
              ← Back
            </button>
          </div>
        )}

        {/* Content Wrapper with Scroll */}
        <div className="content-wrapper">
          {/* Show Dashboard Links ONLY on the main dashboard */}
          {!selectedPage && (
            <>
              <h1>Dashboard</h1>
              <table className="dashboard-table">
                <tbody>
                  {links.map(
                    (link) =>
                      link.visibleTo.includes(user) && (
                        <tr key={link.key}>
                          <td>
                            <button onClick={() => setSelectedPage(link.key)}>
                              {link.name}
                            </button>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </>
          )}

        {/* Render the selected page */}
        {/* Uncomment the pages your putting */}
        {/* {selectedPage === "general-instructions" && <GeneralInstructions />} */}
        {selectedPage === "targets" && <Targets />}
        {selectedPage === "co-po-mapping" && <CoPoMapping />}
        {selectedPage === "co-root-cause" && <CoRootCause />}
        {selectedPage === "po-root-cause" && <PoRootCause />}
        {selectedPage === "co-action-plan" && <CoActionPlan />}
        {selectedPage === "po-action-plan" && <PoActionPlan />}
        {selectedPage === "co-attainment" && <CoAttainment />}
        {selectedPage === "course-feedback" && <CourseFeedback />}
        {/* 
        {selectedPage === "cie-marks" && <CieMarks />}
        {selectedPage === "see-marks" && <SeeMarks />}
        
         
        
        
        {selectedPage === "po-pso-attainment" && <PoPsoAttainment />}
        
         */}
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
