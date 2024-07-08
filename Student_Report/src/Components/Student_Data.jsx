import React from "react";
import StudentList from './Student_List';

const Student_Data = ({ students, onDelete, onEdit }) => {
  return (
    <div>
      <StudentList students={students} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
};

export default Student_Data;
