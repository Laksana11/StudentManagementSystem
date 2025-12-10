import React, { useState, useEffect } from 'react';
import {
    Container,
    Box,
    Typography,
    Alert,
    Snackbar,
    CssBaseline,
    ThemeProvider,
    createTheme
} from '@mui/material';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import { studentService } from './services/api';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

function App() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingStudent, setEditingStudent] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchStudents();
    }, [searchTerm]);

    const fetchStudents = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await studentService.getAllStudents(searchTerm);
            setStudents(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load students');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (studentData) => {
        try {
            await studentService.createStudent(studentData);
            setSuccessMessage('Student created successfully!');
            setShowForm(false);
            fetchStudents();
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Failed to create student');
        }
    };

    const handleUpdate = async (id, studentData) => {
        try {
            await studentService.updateStudent(id, studentData);
            setSuccessMessage('Student updated successfully!');
            setEditingStudent(null);
            setShowForm(false);
            fetchStudents();
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Failed to update student');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this student?')) return;

        try {
            await studentService.deleteStudent(id);
            setSuccessMessage('Student deleted successfully!');
            fetchStudents();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete student');
        }
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
        setShowForm(true);
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingStudent(null);
    };

    const handleCloseSnackbar = () => {
        setSuccessMessage('');
        setError(null);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h3"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Student Management System
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Manage student records with ease
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
                        {error}
                    </Alert>
                )}

                {showForm ? (
                    <Box>
                        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                            {editingStudent ? 'Edit Student' : 'Add New Student'}
                        </Typography>
                        <StudentForm
                            student={editingStudent}
                            onSubmit={editingStudent ? handleUpdate : handleCreate}
                            onCancel={handleCancelForm}
                        />
                    </Box>
                ) : (
                    <StudentList
                        students={students}
                        loading={loading}
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onAddNew={() => setShowForm(true)}
                    />
                )}

                <Snackbar
                    open={!!successMessage}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        {successMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </ThemeProvider>
    );
}

export default App;
