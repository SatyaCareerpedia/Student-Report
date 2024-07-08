


import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';
import "../App.css";
import { format } from 'date-fns';
import Student_Form from './Student_Form';
import logo from "../assets/logo.png";

const Student_List = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/students');
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const addStudent = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  const downloadPDF = async (studentName) => {
    try {
      const buttons = document.querySelectorAll('button');
      const headers = document.querySelectorAll('.edit-delete-header');
      const cells = document.querySelectorAll('td:nth-child(4)');
      const logoImage = document.getElementById('logo-image');

      buttons.forEach((button) => (button.style.display = 'none'));
      headers.forEach((header) => (header.style.display = 'none'));
      cells.forEach((cell) => (cell.style.display = 'none'));
      logoImage.style.display = 'block';

      const input = document.getElementById(`pdf-content-${studentName}`);
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${studentName}_feedback.pdf`);
    

      buttons.forEach((button) => (button.style.display = ''));
      headers.forEach((header) => (header.style.display = ''));
      cells.forEach((cell) => (cell.style.display = ''));
      logoImage.style.display = 'none';

    } catch (err) {
      console.error('Error generating PDF: ', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="student-list">
      <Student_Form addStudent={addStudent} />
      {students.map((student) => (
        <div className="student-card" key={student.id} id={`pdf-content-${student.name}`}>
          <img id="logo-image" src={logo} alt="Logo" style={{ display: 'none' }} />
          <h2>{student.name}</h2>
          <h3>
            <ul className="list-items">
              {student.interviews.map((interview, index) => (
                <li key={index}>
                  {format(new Date(interview.date), 'dd-MM-yyyy')}
                </li>
              ))}
            </ul>
          </h3>
          <table className="styled-table">
            <thead>
              <tr>
                <th className="category-header">Category</th>
                <th className="title-date-header">Feedback</th>
                <th className="score-comments-header">Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="category">Communication</td>
                <td>
                  <ul className="list-items">
                    {student.communication.map((communicate, index) => (
                      <li key={index}>{communicate.title}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul className="list-items">
                    {student.communication.map((communicate, index) => (
                      <li key={index}>{communicate.score}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="category">Technical Interview</td>
                <td>
                  <ul className="list-items">
                    {student.interviews.map((interview, index) => (
                      <li key={index}>{interview.comments}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul className="list-items">
                    {student.interviews.map((interview, index) => (
                      <li key={index}>{interview.score}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="category">Project</td>
                <td>
                  <ul className="list-items">
                    {student.projects.map((project, index) => (
                      <li key={index}>{project.title}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul className="list-items">
                    {student.projects.map((project, index) => (
                      <li key={index}>{project.score}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => downloadPDF(student.name)}>Download PDF</button>
        </div>
      ))}
    </div>
  );
};

export default Student_List;
