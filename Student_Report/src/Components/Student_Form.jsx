
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css";

import logo from "../assets/logo.png";

const baseURL = 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const Student_Form = ({ addStudent, editingData }) => {
  const [name, setName] = useState('');
  const [communication, setCommunication] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [projects, setProjects] = useState([]);
  const [communicationInput, setCommunicationInput] = useState('');
  const [communicationScore, setCommunicationScore] = useState('');
  const [interviewInput, setInterviewInput] = useState('');
  const [interviewScore, setInterviewScore] = useState('');
  const [projectInput, setProjectInput] = useState('');
  const [projectScore, setProjectScore] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (editingData) {
      setName(editingData.name);
      setCommunication(editingData.communication);
      setInterviews(editingData.interviews);
      setProjects(editingData.projects);
    }
  }, [editingData]);

  const handleAddCommunication = () => {
    if (editIndex !== null) {
      const updatedCommunication = [...communication];
      updatedCommunication[editIndex] = { title: communicationInput, score: communicationScore };
      setCommunication(updatedCommunication);
      setEditIndex(null);
    } else {
      setCommunication([...communication, { title: communicationInput, score: communicationScore }]);
    }
    setCommunicationInput('');
    setCommunicationScore('');
  };

  const handleEditCommunication = (index) => {
    setCommunicationInput(communication[index].title);
    setCommunicationScore(communication[index].score);
    setEditIndex(index);
  };

  const handleDeleteCommunication = (index) => {
    const updatedCommunication = [...communication];
    updatedCommunication.splice(index, 1);
    setCommunication(updatedCommunication);
  };

  const handleAddInterview = () => {
    if (editIndex !== null) {
      const updatedInterviews = [...interviews];
      updatedInterviews[editIndex] = { date: new Date().toISOString().split('T')[0], comments: interviewInput, score: interviewScore };
      setInterviews(updatedInterviews);
      setEditIndex(null);
    } else {
      setInterviews([...interviews, { date: new Date().toISOString().split('T')[0], comments: interviewInput, score: interviewScore }]);
    }
    setInterviewInput('');
    setInterviewScore('');
  };

  const handleEditInterview = (index) => {
    setInterviewInput(interviews[index].comments);
    setInterviewScore(interviews[index].score);
    setEditIndex(index);
  };

  const handleDeleteInterview = (index) => {
    const updatedInterviews = [...interviews];
    updatedInterviews.splice(index, 1);
    setInterviews(updatedInterviews);
  };

  const handleAddProject = () => {
    if (editIndex !== null) {
      const updatedProjects = [...projects];
      updatedProjects[editIndex] = { title: projectInput, score: projectScore };
      setProjects(updatedProjects);
      setEditIndex(null);
    } else {
      setProjects([...projects, { title: projectInput, score: projectScore }]);
    }
    setProjectInput('');
    setProjectScore('');
  };

  const handleEditProject = (index) => {
    setProjectInput(projects[index].title);
    setProjectScore(projects[index].score);
    setEditIndex(index);
  };

  const handleDeleteProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let newStudent;
      if (editingData) {
        newStudent = {
          id: editingData.id,
          name,
          communication,
          interviews,
          projects,
        };
        await axiosInstance.put(`/students/${editingData.id}`, newStudent);
      } else {
        newStudent = {
          id: Date.now(), // Use Date.now() as a temporary unique ID
          name,
          communication,
          interviews,
          projects,
        };
        await axiosInstance.post('/students/add', newStudent);
      }
      addStudent(newStudent);
      setName('');
      setCommunication([]);
      setInterviews([]);
      setProjects([]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
        <div className='logo-img'>
        <img src={logo} alt="" />
    </div>
    <form onSubmit={handleSubmit}>
      <h2>{editingData ? 'Edit Student' : 'Add Student'}</h2>
      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* Communication section */}
      <h3>Communication</h3>
      <textarea
        type="text"
        placeholder="Communication Feedback"
        value={communicationInput}
        onChange={(e) => setCommunicationInput(e.target.value)}
      />
      <input
        type="number"
        placeholder="Score"
        value={communicationScore}
        onChange={(e) => setCommunicationScore(e.target.value)}
      />
      <button type="button" onClick={handleAddCommunication}>
        {editIndex !== null ? 'Update Communication' : 'Add Communication'}
      </button>
      <ul>
        {communication.map((communicate, index) => (
          <li key={index}>
            {communicate.title}, Score: {communicate.score}
            <button type="button" onClick={() => handleEditCommunication(index)}>
              Edit
            </button>
            <button type="button" onClick={() => handleDeleteCommunication(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Technical Interview section */}
      <h3>Technical Interview</h3>
      <textarea
        type="text"
        placeholder="Technical Interview Feedback"
        value={interviewInput}
        onChange={(e) => setInterviewInput(e.target.value)}
      />
      <input
        type="number"
        placeholder="Score"
        value={interviewScore}
        onChange={(e) => setInterviewScore(e.target.value)}
      />
      <button type="button" onClick={handleAddInterview}>
        {editIndex !== null ? 'Update Interview' : 'Add Interview'}
      </button>
      <ul>
        {interviews.map((interview, index) => (
          <li key={index}>
            {interview.date}: {interview.comments}, Score: {interview.score}
            <button type="button" onClick={() => handleEditInterview(index)}>
              Edit
            </button>
            <button type="button" onClick={() => handleDeleteInterview(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Projects section */}
      <h3>Project</h3>
      <textarea
        type="text"
        placeholder="Project Feedback"
        value={projectInput}
        onChange={(e) => setProjectInput(e.target.value)}
      />
      <input
        type="number"
        placeholder="Score"
        value={projectScore}
        onChange={(e) => setProjectScore(e.target.value)}
      />
      <button type="button" onClick={handleAddProject}>
        {editIndex !== null ? 'Update Project' : 'Add Project'}
      </button>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            {project.title}, Score: {project.score}
            <button type="button" onClick={() => handleEditProject(index)}>
              Edit
            </button>
            <button type="button" onClick={() => handleDeleteProject(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button type="submit">{editingData ? 'Update Student' : 'Add Student'}</button>
    </form>

    </>
  );
};

export default Student_Form;
