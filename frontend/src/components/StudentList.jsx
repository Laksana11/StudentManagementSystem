import React from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Button,
    IconButton,
    Typography,
    CircularProgress,
    InputAdornment
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    School as SchoolIcon
} from '@mui/icons-material';

function StudentList({ students, loading, searchTerm, onSearchChange, onEdit, onDelete, onAddNew }) {
    return (
        <Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <TextField
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    variant="outlined"
                    size="medium"
                    sx={{ flexGrow: 1, maxWidth: 500 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={onAddNew}
                    size="large"
                    sx={{ ml: 2 }}
                >
                    Add Student
                </Button>
            </Box>

            {/* Loading State */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
                    <CircularProgress size={60} />
                </Box>
            ) : students.length === 0 ? (
                /* Empty State */
                <Paper
                    elevation={0}
                    sx={{
                        py: 8,
                        textAlign: 'center',
                        bgcolor: 'grey.50',
                        border: '2px dashed',
                        borderColor: 'grey.300',
                    }}
                >
                    <SchoolIcon sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No students found
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {searchTerm ? 'Try adjusting your search' : 'Get started by adding your first student'}
                    </Typography>
                    {!searchTerm && (
                        <Button variant="contained" startIcon={<AddIcon />} onClick={onAddNew}>
                            Add Your First Student
                        </Button>
                    )}
                </Paper>
            ) : (
                /* Students Table */
                <TableContainer component={Paper} elevation={2}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'primary.main' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Age</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Created At</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow
                                    key={student.id}
                                    hover
                                    sx={{
                                        '&:hover': {
                                            bgcolor: 'action.hover',
                                        },
                                    }}
                                >
                                    <TableCell>{student.id}</TableCell>
                                    <TableCell sx={{ fontWeight: 'medium' }}>{student.name}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{student.age || 'N/A'}</TableCell>
                                    <TableCell>
                                        {new Date(student.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            color="primary"
                                            onClick={() => onEdit(student)}
                                            size="small"
                                            sx={{ mr: 1 }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => onDelete(student.id)}
                                            size="small"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {!loading && students.length > 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Showing {students.length} student{students.length !== 1 ? 's' : ''}
                </Typography>
            )}
        </Box>
    );
}

export default StudentList;
