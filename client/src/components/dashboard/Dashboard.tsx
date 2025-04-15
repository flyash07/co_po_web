import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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
  type: string;
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
  const prof_name = localStorage.getItem("userName");
  const prof_mail = localStorage.getItem("userEmail");
  const prof_desig = localStorage.getItem("designation");
  const prof_id = localStorage.getItem("empid");

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
    setIsLabCourse(course.type === "Lab");
    fetchCourseDetails();
    alert(`Selected course: ${course.name}`);
  };
  const handlePrintReport = async () => {
    const pagesToPrint = [
      "targets",
      "co-po-mapping",
      "cie-marks",
      "see-marks",
      "course-feedback",
      "co-attainment",
      "co-root-cause",
      "co-action-plan",
      "po-pso-attainment",
      "po-root-cause",
      "po-action-plan",
    ];
  
    const pdf = new jsPDF("p", "pt", "a4");

    let isFirstPage = true;
  
    for (const pageKey of pagesToPrint) {
      setSelectedPage(pageKey);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Give time for render
  
      const content = document.querySelector(".main-content");
      if (!content) continue;
  
      const clone = content.cloneNode(true) as HTMLElement;
  
      // Clean up clone (remove inputs/buttons)
      clone.querySelectorAll("input, textarea, select").forEach((el) => {
        const text = document.createElement("div");
        text.textContent = (el as HTMLInputElement).value || el.textContent || "";
        el.replaceWith(text);
      });
  
      clone.querySelectorAll("button, input[type='file']").forEach((el) =>
        el.remove()
      );
  
      // Wrap in a fixed width container for print layout
      const wrapper = document.createElement("div");
      wrapper.className = "print-container";
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper); // Temporarily add to DOM
  
      const canvas = await html2canvas(wrapper, {
        scale: 2,
        useCORS: true,
        scrollY: 0,
        scrollX: 0,
      });
  
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      if (!isFirstPage) pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      isFirstPage = false;
  
      document.body.removeChild(wrapper); // Clean up
    }
  
    pdf.save(`Report.pdf`);
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
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <button
          className="toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "➤" : "✖"}
        </button>

        {!isCollapsed && (
          <>
            <h2 className="prof-name">
              {prof_name}
              <br />
              {prof_desig}
              <br />
              {prof_id}
              <br />
              {prof_mail}
            </h2>
            <div className="dropdown">
              <button className="dropdown-btn">Courses ▼</button>
              <div className="dropdown-content">
                {courseNames.length > 0 ? (
                  courseNames.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => handleCourseSelect(course)}
                    >
                      {course.name}
                      <br />
                      Sem: {course.sem}
                      <br />
                      Section: {course.secName}
                    </button>
                  ))
                ) : (
                  <p style={{ padding: "0.5rem" }}>No Courses Found</p>
                )}
              </div>
            </div>
          </>
        )}
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="main-header">
          <button
            className="back-button"
            onClick={() => setSelectedPage(null)}
            style={{ visibility: selectedPage ? "visible" : "hidden" }}
          >
            ← Back
          </button>

          <button
            className="department-btn"
            onClick={() => navigate("/department-details")}
            style={{ visibility: hod ? "visible" : "hidden" }}
          >
            Click for Department Details
          </button>
        </div>

        {!selectedPage && (
          <>
            <h1>Dashboard</h1>
            <table className="dashboard-table">
              <tbody>
                {links.map((link) => {
                  const isVisible = link.visibleTo.includes(user);
                  const isEnabled = link.enabled();

                  if (!isVisible) return null;

                  const shouldDisable = !isEnabled && user === "Professor";

                  return (
                    <tr key={link.key}>
                      <td>
                        <button
                          onClick={() =>
                            !shouldDisable && setSelectedPage(link.key)
                          }
                          disabled={shouldDisable}
                          className={shouldDisable ? "disabled" : ""}
                        >
                          {link.name} {shouldDisable && "🔒"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
        className="print-btn"
        onClick={handlePrintReport}
        style={{ marginTop: "2rem" }}
      >
        Print Report
      </button>
          </>
        )}

        {/* Render dynamic pages */}
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
        {selectedPage === "cie-marks" &&
          (isLabCourse ? <CieLab /> : <CieMarks />)}
        {selectedPage === "see-marks" &&
          (isLabCourse ? <SeeLab /> : <SeeMarks />)}
        {selectedPage === "po-pso-attainment" && <PoPsoAttainment />}
      </main>
      

    </div>
  );
};

export default Dashboard;
