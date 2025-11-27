import React, { useState } from 'react';
import { studentService } from '../services/studentService';

export default function StudentList({ 
  students, 
  onLoadStudents, 
  onAddNew, 
  onEdit, 
  onDelete, 
  onViewDetails,
  loading 
}) {
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSection, setFilterSection] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = filterSection === 'all' || student.section === filterSection;
    return matchesSearch && matchesSection;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'marks') return b.marks - a.marks;
    if (sortBy === 'section') return a.section.localeCompare(b.section);
    return 0;
  });

  const totalPages = Math.ceil(sortedStudents.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = sortedStudents.slice(startIdx, startIdx + itemsPerPage);

  const sections = [...new Set(students.map(s => s.section))];

  const getGradeColor = (grade) => {
    const colors = {
      'A': '#4CAF50', 'B': '#8BC34A', 'C': '#FFC107', 
      'D': '#FF9800', 'F': '#F44336'
    };
    return colors[grade] || '#757575';
  };

  return (
    <div className="student-list-container">
      <div className="list-header">
        <h2>📊 Student Results Dashboard</h2>
        <button onClick={onAddNew} className="btn btn-primary">
          <i className="fas fa-plus"></i> Add New Student
        </button>
      </div>

      <div className="controls">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <select 
          value={filterSection} 
          onChange={(e) => {
            setFilterSection(e.target.value);
            setCurrentPage(1);
          }}
          className="filter-select"
        >
          <option value="all">All Sections</option>
          {sections.map(section => (
            <option key={section} value={section}>{section}</option>
          ))}
        </select>

        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="name">Sort by Name</option>
          <option value="marks">Sort by Marks (High to Low)</option>
          <option value="section">Sort by Section</option>
        </select>

        <button onClick={onLoadStudents} className="btn btn-secondary" disabled={loading}>
          <i className={`fas fa-refresh ${loading ? 'fa-spin' : ''}`}></i>
          {loading ? 'Loading...' : 'Reload'}
        </button>
      </div>

      {students.length > 0 && (
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-label">Total Students</span>
            <span className="stat-value">{students.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Average Marks</span>
            <span className="stat-value">
              {(students.reduce((sum, s) => sum + Number(s.marks), 0) / students.length).toFixed(1)}
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Highest Marks</span>
            <span className="stat-value">
              {Math.max(...students.map(s => s.marks))}
            </span>
          </div>
        </div>
      )}

      <div className="table-wrapper">
        {paginatedStudents.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-inbox"></i>
            <p>No students found. Click "Add New Student" to get started!</p>
          </div>
        ) : (
          <table className="student-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Section</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((student, idx) => (
                <tr key={student.id} className="table-row">
                  <td>{startIdx + idx + 1}</td>
                  <td className="name-cell">{student.name}</td>
                  <td><span className="badge">{student.section}</span></td>
                  <td>
                    <div className="marks-display">
                      <div className="marks-circle" style={{
                        background: student.marks >= 80 ? '#4CAF50' : student.marks >= 60 ? '#FFC107' : '#F44336'
                      }}>
                        {student.marks}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span 
                      className="grade-badge" 
                      style={{ backgroundColor: getGradeColor(student.grade) }}
                    >
                      {student.grade}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button 
                      onClick={() => onViewDetails(student)} 
                      className="btn-action btn-view"
                      title="View Details"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button 
                      onClick={() => onEdit(student)} 
                      className="btn-action btn-edit"
                      title="Edit"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm('Are you sure?')) onDelete(student.id);
                      }} 
                      className="btn-action btn-delete"
                      title="Delete"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="btn-page"
          >
            ← Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="btn-page"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}