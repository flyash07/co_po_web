import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const DepartmentDetails: React.FC = () => {
  const { hod } = useUser();
  const [faculty, setFaculty] = useState<{ facultyID: string; name: string }[]>([]);
  const [students, setStudents] = useState<{ regNo: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeptDetails = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("jwtToken="))
          ?.split("=")[1];

        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${BACKEND_URL}/hod/viewfaculty`, {
          headers: {
            Authorization: `${token}`,
          },
          withCredentials: true, // 🔥 critical for cookies
        });

        const { facultyList, studentList } = response.data;
        console.log("Faculty List:", facultyList);
        console.log("Student List:", studentList);
        setFaculty(facultyList || []);
        setStudents(studentList || []);
      } catch (error) {
        console.error("Failed to fetch department details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeptDetails();
  }, []);

  if (loading) return <p>Loading department details...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Department Details</h1>

      {/* Optional HOD Display */}
      {/* {hod && (
        <div className="mb-6">
          <p>
            <strong>HOD:</strong> {hod.name} ({hod.facultyID})
          </p>
        </div>
      )} */}

      <div className="mb-6">
        <h2 className="text-lg font-semibold">Faculty Members</h2>
        <ul className="list-disc pl-6">
          {faculty.map((f) => (
            <li key={f.facultyID}>
              {f.name} ({f.facultyID})
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Students</h2>
        <ul className="list-disc pl-6">
          {students.map((s) => (
            <li key={s.regNo}>
              {s.name} ({s.regNo})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DepartmentDetails;
