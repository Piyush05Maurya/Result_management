import React, { useState } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetails from './components/StudentDetails';
import { studentService } from './services/studentService';
import './App.css';

export default function App() {
  const [students, setStudents] = useState([]);
  const [view, setView] = useState('list');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLoadStudents = async () => {
    setLoading(true);
    try {
      const data = await studentService.getAllStudents();
      setStudents(data);
    } catch (error) {
      alert('Failed to load students. Make sure JSON Server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedStudent(null);
    setView('add');
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setView('edit');
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setView('details');
  };

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    try {
      if (view === 'add') {
        const newStudent = await studentService.createStudent(formData);
        setStudents([...students, newStudent]);
        alert('✅ Student added successfully!');
      } else if (view === 'edit') {
        const updatedStudent = await studentService.updateStudent(selectedStudent.id, formData);
        setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));
        alert('✅ Student updated successfully!');
      }
      setView('list');
      setSelectedStudent(null);
    } catch (error) {
      alert('❌ Operation failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await studentService.deleteStudent(id);
      setStudents(students.filter(s => s.id !== id));
      alert('✅ Student deleted successfully!');
    } catch (error) {
      alert('❌ Delete failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setView('list');
    setSelectedStudent(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🎓 Student Result Management System</h1>
          <p>Manage student grades, marks, and academic performance</p>
        </div>
      </header>

      <main className="app-main">
        {view === 'list' && (
          <StudentList
            students={students}
            onLoadStudents={handleLoadStudents}
            onAddNew={handleAddNew}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewDetails={handleViewDetails}
            loading={loading}
          />
        )}
        {view === 'add' && (
          <StudentForm
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        )}
        {view === 'edit' && (
          <StudentForm
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
            initialStudent={selectedStudent}
            loading={loading}
          />
        )}
        {view === 'details' && (
          <StudentDetails
            student={selectedStudent}
            onBack={handleCancel}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>© 2025 Student Result Management System | Built with React</p>
      </footer>
    </div>
  );
}