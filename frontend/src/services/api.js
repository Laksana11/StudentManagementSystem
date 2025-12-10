import axios from 'axios';

const API_BASE_URL = 'http://localhost:5202/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const studentService = {
    getAllStudents: async (search = '') => {
        const response = await api.get(`/students${search ? `?search=${search}` : ''}`);
        return response.data;
    },

    getStudentById: async (id) => {
        const response = await api.get(`/students/${id}`);
        return response.data;
    },

    createStudent: async (studentData) => {
        const response = await api.post('/students', studentData);
        return response.data;
    },

    updateStudent: async (id, studentData) => {
        const response = await api.put(`/students/${id}`, studentData);
        return response.data;
    },

    deleteStudent: async (id) => {
        const response = await api.delete(`/students/${id}`);
        return response.data;
    },
};

export default api;
