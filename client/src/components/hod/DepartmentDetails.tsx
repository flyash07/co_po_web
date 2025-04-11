import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import "./DepartmentDetails.css"; // ← import the CSS here

const DepartmentDetails: React.FC = () => {
  const [faculty, setFaculty] = useState<{ facultyID: string; name: string }[]>(
    []
  );
  const [students, setStudents] = useState<{ regNo: string; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwtToken="))
      ?.split("=")[1];

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const fetchFaculty = async () => {
      const res = await axios.get(`${BACKEND_URL}/hod/viewFaculty`, {
        headers: { Authorization: `${token}` },
        withCredentials: true,
      });
      setFaculty(res.data);
    };

    const fetchStudents = async () => {
      const res = await axios.get(`${BACKEND_URL}/hod/viewStudents`, {
        headers: { Authorization: `${token}` },
        withCredentials: true,
      });
      setStudents(res.data);
    };

    const fetchDeptDetails = async () => {
      try {
        await Promise.all([fetchFaculty(), fetchStudents()]);
      } catch (err) {
        console.error("Failed to fetch department details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeptDetails();
  }, []);

  if (loading) return <p>Loading department details...</p>;

  return (
    <>
    <div className="back-button-container">
        <Link to="/dashboard" className="back-button">
          ← Back
        </Link>
      </div>
    <div className="department-container">
      
      <h1 className="department-title">Department Details</h1>
      <div className="section">
        <h2 className="section-title">Faculty Members</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Faculty ID</th>
            </tr>
          </thead>
          <tbody>
            {faculty.map((f, index) => (
              <tr key={f.facultyID || `faculty-${index}`}>
                <td>{f.name}</td>
                <td>{f.facultyID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2 className="section-title">Students</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Reg. No</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, index) => (
              <tr key={s.regNo || `student-${index}`}>
                <td>{s.name}</td>
                <td>{s.regNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default DepartmentDetails;
