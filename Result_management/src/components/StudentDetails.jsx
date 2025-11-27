import React from 'react';

export default function StudentDetails({ student, onBack }) {
  const getGradeColor = (grade) => {
    const colors = {
      'A': '#4CAF50', 'B': '#8BC34A', 'C': '#FFC107', 
      'D': '#FF9800', 'F': '#F44336'
    };
    return colors[grade] || '#757575';
  };

  const getPerformanceLevel = (marks) => {
    if (marks >= 90) return 'Excellent';
    if (marks >= 80) return 'Very Good';
    if (marks >= 70) return 'Good';
    if (marks >= 60) return 'Satisfactory';
    if (marks >= 50) return 'Pass';
    return 'Needs Improvement';
  };

  const getMarksColor = (marks) => {
    if (marks >= 80) return '#4CAF50';
    if (marks >= 60) return '#FFC107';
    return '#F44336';
  };

  return (
    <div className="details-container">
      <button onClick={onBack} className="btn-back">
        <i className="fas fa-arrow-left"></i> Back to List
      </button>

      <div className="details-card">
        <div className="details-header">
          <h2>📋 Student Details</h2>
          <div className="detail-avatar">
            <i className="fas fa-user-circle"></i>
          </div>
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Student Name</span>
            <span className="detail-value">{student.name}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Section</span>
            <span className="detail-value section-badge">{student.section}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Marks Obtained</span>
            <div className="detail-value marks-big">
              <span style={{ color: getMarksColor(student.marks) }}>
                {student.marks}
              </span>
              <span className="marks-max">/100</span>
            </div>
          </div>

          <div className="detail-item">
            <span className="detail-label">Grade</span>
            <span 
              className="detail-value grade-big"
              style={{ backgroundColor: getGradeColor(student.grade) }}
            >
              {student.grade}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Performance Level</span>
            <span className="detail-value performance">
              {getPerformanceLevel(student.marks)}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Percentage</span>
            <span className="detail-value">{student.marks}%</span>
          </div>
        </div>

        <div className="detail-item full-width">
          <span className="detail-label">Score Progress</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${student.marks}%`,
                backgroundColor: getMarksColor(student.marks)
              }}
            ></div>
            <span className="progress-text">{student.marks}%</span>
          </div>
        </div>

        <div className="detail-item full-width">
          <span className="detail-label">Remarks</span>
          <div className="remarks-box">
            {student.marks >= 80 && '🎉 Excellent Performance! Keep it up!'}
            {student.marks >= 60 && student.marks < 80 && '👍 Good Performance! A bit more effort can take you higher.'}
            {student.marks < 60 && '📚 Need to focus more on studies. You can do better!'}
          </div>
        </div>
      </div>
    </div>
  );
}