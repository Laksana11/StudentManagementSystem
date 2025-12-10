import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    TextField,
    Button,
    Alert,
    CircularProgress,
    Stack
} from '@mui/material';
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';

function StudentForm({ student, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        if (student) {
            setFormData({
                name: student.name || '',
                email: student.email || '',
                age: student.age || '',
            });
        }
    }, [student]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (formData.age && (isNaN(formData.age) || formData.age < 1 || formData.age > 150)) {
            newErrors.age = 'Age must be between 1 and 150';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const submitData = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                age: formData.age ? parseInt(formData.age) : null,
            };

            if (student) {
                await onSubmit(student.id, submitData);
            } else {
                await onSubmit(submitData);
            }
        } catch (err) {
            setSubmitError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 600 }}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    {submitError && (
                        <Alert severity="error" onClose={() => setSubmitError('')}>
                            {submitError}
                        </Alert>
                    )}

                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                        fullWidth
                        variant="outlined"
                    />

                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                        fullWidth
                        variant="outlined"
                    />


                    <TextField
                        label="Age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange}
                        error={!!errors.age}
                        helperText={errors.age || 'Optional'}
                        fullWidth
                        variant="outlined"
                        inputProps={{ min: 1, max: 150 }}
                    />

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                        <Button
                            variant="outlined"
                            onClick={onCancel}
                            disabled={loading}
                            startIcon={<CancelIcon />}
                            size="large"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                            size="large"
                        >
                            {loading ? 'Saving...' : student ? 'Update Student' : 'Create Student'}
                        </Button>
                    </Box>
                </Stack>
            </form>
        </Paper>
    );
}

export default StudentForm;
