import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
// import GeneralInstructions from "./GeneralInstructions";
import Targets from "./Targets";
import CoPoMapping from "./CoPoMapping";
import CieMarks from "./CieMarks";
import SeeMarks from "./SeeMarks";
import CourseFeedback from "./CourseFeedback";
import CoAttainment from "./CoAttainment";
import CoRootCause from "./CoRootCause";
import CoActionPlan from "./CoActionPlan";
import PoPsoAttainment from "./PoPsoAttainment";
import PoRootCause from "./PoRootCause";
import PoActionPlan from "./PoActionPlan";
import SetTargets from "./SetTargets";
import MapCoPo from "./MapCoPo";
import CieLab from "./CieLab";
import SeeLab from "./SeeLab";
interface Course {
  id: string;
  name: string;
  sem: string;
  secName: string;
  role: string;
  type:string;
}

const Dashboard: React.FC = () => {
  const { user, setUser } = useUser();
  const { hod } = useUser();
  const [selectedPage, setSelectedPage] = useState<null | string>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [courseNames, setCourseNames] = useState<Course[]>([]);
  const [coSet, setCoSet] = useState<boolean>(false);
  const [copoSet, setCopoSet] = useState<boolean>(false);
  const [isLabCourse, setIsLabCourse] = useState<boolean>(false);
  const navigate = useNavigate();
  const prof_name=localStorage.getItem("userName");
  const prof_mail=localStorage.getItem("userEmail");
  const prof_desig=localStorage.getItem("designation");
  const prof_id=localStorage.getItem("empid");
  useEffect(() => {
    const storedCourses = localStorage.getItem("courseNames");
    if (storedCourses) {
      try {
        const parsedCourses = JSON.parse(storedCourses);
        setCourseNames(parsedCourses);
      } catch (err) {
        console.error("Failed to parse courseNames from localStorage");
      }
    }
  }, []);

  const fetchCourseDetails = async () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwtToken="))
      ?.split("=")[1];

    const courseId = localStorage.getItem("currentCourse");
    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.get(`${BACKEND_URL}/index/courseDet`, {
        headers: {
          Authorization: `${token}`,
        },
        params: {
          courseId,
        },
      });
      const { coSet, copoSet } = response.data;
      console.log(coSet);
      console.log(copoSet);
      setCoSet(coSet);
      setCopoSet(copoSet);
    } catch (error) {
      console.error("Failed to fetch course details", error);
    }
  };

  const handleCourseSelect = (course: Course) => {
    localStorage.setItem("currentCourse", course.id);
    if (course.role === "coordinator") {
      setUser("Coordinator");
    } else if (course.role === "professor") {
      setUser("Professor");
    }
    setIsLabCourse(course.type==="Lab");
    fetchCourseDetails();
    alert(`Selected course: ${course.name}`);
  };

  const links = [
    /*{
      name: "General Instructions",
      key: "general-instructions",
      visibleTo: ["Professor", "Coordinator", "HOD"],
    },*/
    {
      name: "Set Targets",
      key: "set-targets",
      visibleTo: ["Coordinator"],
      enabled: () => !coSet,
    },
    {
      name: "See Targets",
      key: "targets",
      visibleTo: ["Professor", "Coordinator"],
      enabled: () => coSet,
    },
    {
      name: "Map Co to Po",
      key: "mapcopo",
      visibleTo: ["Coordinator"],
      enabled: () => !copoSet,
    },
    {
      name: "See CO to PO Mapping",
      key: "co-po-mapping",
      visibleTo: ["Professor", "Coordinator"],
      enabled: () => copoSet,
    },
    {
      name: "CIE Assessment Marks & Attainment",
      key: "cie-marks",
      visibleTo: ["Professor", "Coordinator", "HOD"],
      enabled: () => true,
    },
    {
      name: "SEE Marks & Attainment",
      key: "see-marks",
      visibleTo: ["Professor", "Coordinator", "HOD"],
      enabled: () => true,
    },
    {
      name: "Course Feedback",
      key: "course-feedback",
      visibleTo: ["Professor", "Coordinator", "HOD"],
      enabled: () => true,
    },
    {
      name: "Direct and Overall CO Attainment",
      key: "co-attainment",
      visibleTo: ["Professor", "Coordinator", "HOD"],
      enabled: () => true,
    },
    {
      name: "Root Cause Analysis for CO",
      key: "co-root-cause",
      visibleTo: ["Professor", "Coordinator", "HOD"],
      enabled: () => true,
    },
    {
      name: "Action Plan for CO",
      key: "co-action-plan",
      visibleTo: ["Professor", "Coordinator", "HOD"],
      enabled: () => true,
    },
    {
      name: "PO and PSO Attainment",
      key: "po-pso-attainment",
      visibleTo: ["Professor", "Coordinator", "HOD"],
      enabled: () => true,
    },
    {
      name: "Root Cause Analysis for PSO and PO",
      key: "po-root-cause",
      visibleTo: ["Professor", "Coordinator", "HOD"],
      enabled: () => true,
    },
    {
      name: "Action Plan for PO",
      key: "po-action-plan",
      visibleTo: ["Professor", "Coordinator", "HOD"],
      enabled: () => true,
    },
  ];

  return (
    <div className="dashboard">
      <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <button
          className="toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "➤" : "✖"}
        </button>

        {!isCollapsed && (
          <>
            <h2 className="prof-name">{prof_name}<br />{prof_desig}<br />{prof_id}<br />{prof_mail}</h2>
            <div className="dropdown">
              <button className="dropdown-btn">Courses ▼</button>
              <div className="dropdown-content">
                {courseNames.length > 0 ? (
                  courseNames.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => handleCourseSelect(course)}
                    >
                      {course.name} <br />Sem:{course.sem}<br />Section:{course.secName}
                    </button>
                  ))
                ) : (
                  <p style={{ padding: "0.5rem" }}>No Courses Found</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="main-content">
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
        {hod === true && (
          <div style={{ textAlign: "right", marginBottom: "1rem" }}>
            <button
              onClick={() => navigate("/department-details")}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Click for Department Details
            </button>
          </div>
        )}
        <div className="content-wrapper">
          {!selectedPage && (
            <>
              <h1>Dashboard</h1>
              <table className="dashboard-table">
                <tbody>
                  {links.map((link) => {
                    const isVisible = link.visibleTo.includes(user);
                    const isEnabled = link.enabled();

                    if (!isVisible) return null;

                    const shouldDisable = !isEnabled && user === "Professor"; // Only lock for professors

                    return (
                      <tr key={link.key}>
                        <td>
                          <button
                            onClick={() => {
                              if (!shouldDisable) setSelectedPage(link.key);
                            }}
                            disabled={shouldDisable}
                            style={{
                              opacity: shouldDisable ? 0.6 : 1,
                              cursor: shouldDisable ? "not-allowed" : "pointer",
                            }}
                          >
                            {link.name} {shouldDisable && "🔒"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}

          {/* Page rendering based on selection */}
          {/* {selectedPage === "general-instructions" && <GeneralInstructions />} */}
          {selectedPage === "targets" && <Targets />}
          {selectedPage === "set-targets" && <SetTargets />}
          {selectedPage === "co-po-mapping" && <CoPoMapping />}
          {selectedPage === "mapcopo" && <MapCoPo />}
          {selectedPage === "co-root-cause" && <CoRootCause />}
          {selectedPage === "po-root-cause" && <PoRootCause />}
          {selectedPage === "co-action-plan" && <CoActionPlan />}
          {selectedPage === "po-action-plan" && <PoActionPlan />}
          {selectedPage === "co-attainment" && <CoAttainment />}
          {selectedPage === "course-feedback" && <CourseFeedback />}
          {selectedPage === "cie-marks" &&(isLabCourse ? <CieLab /> : <CieMarks />)}
          {selectedPage === "see-marks" &&(isLabCourse ? <SeeLab /> : <SeeMarks />)}
          {selectedPage === "po-pso-attainment" && <PoPsoAttainment />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
