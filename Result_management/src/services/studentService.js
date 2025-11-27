const API_URL = 'http://localhost:5000/students';

export const studentService = {
  getAllStudents: async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch students');
      return await response.json();
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },

  getStudentById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch student');
      return await response.json();
    } catch (error) {
      console.error('Error fetching student:', error);
      throw error;
    }
  },

  createStudent: async (student) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
      });
      if (!response.ok) throw new Error('Failed to create student');
      return await response.json();
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  },

  updateStudent: async (id, student) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
      });
      if (!response.ok) throw new Error('Failed to update student');
      return await response.json();
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  },

  deleteStudent: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete student');
      return true;
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  }
};