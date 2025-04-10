import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import './AdminPage.css';

const AdminPage: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File | null }>({});

    const uploadOrder = ['faculties', 'sections', 'courses', 'allocations', 'students'];

    const uploadLabels: { [key: string]: string } = {
        faculties: "Faculties",
        sections: "Sections",
        courses: "Courses",
        allocations: "Course Allocations",
        students: "Students"
    };

    const formatDescription: { [key: string]: string } = {
        faculties: "Format : facultyID, email, name, dept, password",
        sections: "Format : sectionID, semester, dept",
        courses: "Format : courseID, courseName, credits, dept",
        allocations: "Format : facultyID, courseID, sectionID",
        students: "Format : studentID, name, email, dept, sectionID"
    };

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const getEndpoint = (type: string): string => {
        const endpoints: { [key: string]: string } = {
            faculties: `${BACKEND_URL}/admin/uploadFaculties`,
            students: `${BACKEND_URL}/admin/uploadStudents`,
            sections: `${BACKEND_URL}/admin/uploadSections`,
            courses: `${BACKEND_URL}/admin/uploadCourses`,
            allocations: `${BACKEND_URL}/admin/uploadCourseAllocations`,
        };
        return endpoints[type] || '';
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFiles(prev => ({ ...prev, [type]: e.target.files![0] }));
        }
    };

    const handleUpload = async (type: string) => {
        const file = selectedFiles[type];
        if (!file) {
            alert("Please select a file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const fileData = event.target?.result;
                const workbook = XLSX.read(fileData, { type: 'binary' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                const endpoint = getEndpoint(type);
                if (!endpoint) {
                    alert("Invalid upload type.");
                    return;
                }

                const res = await axios.post(endpoint, jsonData, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                alert(res.data.message || `Successfully uploaded ${type}.`);
                setSelectedFiles(prev => ({ ...prev, [type]: null }));
            } catch (err: any) {
                console.error("Upload error:", err);
                alert(err?.response?.data?.message || "Upload failed.");
            }
        };

        reader.readAsBinaryString(file);
    };

    return (
        <div className="admin-page">
            <h1 className="page-title">Admin Panel</h1>
            {uploadOrder.map(type => (
                <div key={type} className="upload-section">
                    <h2>{uploadLabels[type]}</h2>
                    <p className="format-desc">{formatDescription[type]}</p>
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={(e) => handleFileChange(e, type)}
                    />
                    <button onClick={() => handleUpload(type)}>Submit</button>
                </div>
            ))}
        </div>
    );
};

export default AdminPage;
