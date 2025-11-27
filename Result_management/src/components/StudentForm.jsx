import React, { useState, useEffect } from 'react';

export default function StudentForm({ 
  onSubmit, 
  onCancel, 
  initialStudent = null,
  loading
}) {
  const [formData, setFormData] = useState({
    name: '',
    section: '3CA',
    marks: '',
    grade: 'A'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialStudent) {
      setFormData(initialStudent);
    }
  }, [initialStudent]);

  const sections = ['3CA', '3CB', '3CC'];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.marks) {
      newErrors.marks = 'Marks is required';
    } else if (isNaN(formData.marks) || formData.marks < 0 || formData.marks > 100) {
      newErrors.marks = 'Marks must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔥 Auto Grade Logic Added Here
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto generate grade when marks change
    if (name === "marks") {
      const marksNumber = Number(value);

      let autoGrade = "";
      if (marksNumber >= 90) autoGrade = "A+";
      else if (marksNumber >= 80) autoGrade = "A";
      else if (marksNumber >= 70) autoGrade = "B";
      else if (marksNumber >= 60) autoGrade = "C";
      else if (marksNumber >= 0) autoGrade = "F";
      else autoGrade = "";

      setFormData(prev => ({
        ...prev,
        marks: value,
        grade: autoGrade
      }));
    } 
    
    else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>{initialStudent ? '✏ Edit Student' : '➕ Add New Student'}</h2>

        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="name">Student Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="section">Section *</label>
            <select
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
            >
              {sections.map(section => (
                <option key={section} value={section}>{section}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="marks">Marks (0-100) *</label>
            <input
              type="number"
              id="marks"
              name="marks"
              value={formData.marks}
              onChange={handleChange}
              placeholder="Enter marks"
              min="0"
              max="100"
              className={errors.marks ? 'input-error' : ''}
            />
            {errors.marks && <span className="error-message">{errors.marks}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="grade">Grade *</label>
            <input
              type="text"
              id="grade"
              name="grade"
              value={formData.grade}
              disabled
              className="disabled-input"
            />
          </div>

          <div className="form-buttons">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : initialStudent ? 'Update Student' : 'Add Student'}
            </button>

            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
