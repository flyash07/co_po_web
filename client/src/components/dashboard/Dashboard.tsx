import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const { user } = useUser(); // Get current user role
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Define all links with role-based visibility
  const links = [
    { name: "General Instructions", path: "/dashboard/general-instructions", visibleTo: ["Professor", "Coordinator", "HOD"] },
    { name: "Targets", path: "/dashboard/targets", visibleTo: ["Professor"] }, //to be changed to Coordinator
    { name: "CO to PO Mapping", path: "/dashboard/co-po-mapping", visibleTo: ["Coordinator"] },
    { name: "CIE Assessment Marks & Attainment", path: "/dashboard/cie-marks", visibleTo: ["Professor", "Coordinator", "HOD"] },
    { name: "SEE Marks & Attainment", path: "/dashboard/see-marks", visibleTo: ["Professor", "Coordinator", "HOD"] },
    { name: "Course Feedback", path: "/dashboard/course-feedback", visibleTo: ["Professor", "Coordinator", "HOD"] },
    { name: "Direct and Overall CO Attainment", path: "/dashboard/co-attainment", visibleTo: ["Professor", "Coordinator", "HOD"] },
    { name: "Root Cause Analysis for CO", path: "/dashboard/co-root-cause", visibleTo: ["Professor", "Coordinator", "HOD"] },
    { name: "Action Plan for CO", path: "/dashboard/co-action-plan", visibleTo: ["Professor", "Coordinator", "HOD"] },
    { name: "PO and PSO Attainment", path: "/dashboard/po-pso-attainment", visibleTo: ["Professor", "Coordinator", "HOD"] },
    { name: "Root Cause Analysis for PSO and PO", path: "/dashboard/po-root-cause", visibleTo: ["Professor", "Coordinator", "HOD"] },
    { name: "Action Plan for PO", path: "/dashboard/po-action-plan", visibleTo: ["Professor", "Coordinator", "HOD"] },
  ];

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <button className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? "➤" : "✖"}
        </button>

        {!isCollapsed && (
          <>
            <h2 className="prof-name">{user}</h2>
            <div className="dropdown">
              <button className="dropdown-btn">Options ▼</button>
              <div className="dropdown-content">
                <Link to="#">Option 1</Link>
                <Link to="#">Option 2</Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Dashboard</h1>
        <table className="dashboard-table">
          <tbody>
            {links.map(
              (link) =>
                link.visibleTo.includes(user) && (
                  <tr key={link.path}>
                    <td>
                      <Link to={link.path}>{link.name}</Link>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
