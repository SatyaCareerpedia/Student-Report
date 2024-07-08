// App.js
import React, { useState } from 'react';
import StudentData from './Components/Student_Data';

function App() {
  const [students, setStudents] = useState([]);

  const deleteItem = (studentId, category, index) => {
    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        const updatedCategory = [...student[category]];
        updatedCategory.splice(index, 1);
        return {
          ...student,
          [category]: updatedCategory,
        };
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  const editItem = (studentId, category, index, newData) => {
    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        const updatedCategory = [...student[category]];
        updatedCategory[index] = newData;
        return {
          ...student,
          [category]: updatedCategory,
        };
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  return (
    <div className="App">
      <h1>Student Performance Report</h1>
      <StudentData students={students} onDelete={deleteItem} onEdit={editItem} />
    </div>
  );
}

export default App;
