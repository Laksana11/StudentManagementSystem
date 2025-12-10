using StudentManagement.API.DTOs;
using StudentManagement.API.Models;

namespace StudentManagement.API.Services;

public interface IStudentService
{
    Task<IEnumerable<StudentDto>> GetAllStudentsAsync(string? search = null);
    Task<StudentDto?> GetStudentByIdAsync(int id);
    Task<StudentDto> CreateStudentAsync(CreateStudentRequest request);
    Task<StudentDto?> UpdateStudentAsync(int id, UpdateStudentRequest request);
    Task<bool> DeleteStudentAsync(int id);
}
