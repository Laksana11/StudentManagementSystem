using StudentManagement.API.Models;

namespace StudentManagement.API.Repositories;

public interface IStudentRepository
{
    Task<IEnumerable<Student>> GetAllAsync(string? search = null);
    Task<Student?> GetByIdAsync(int id);
    Task<Student> CreateAsync(Student student);
    Task<bool> UpdateAsync(Student student);
    Task<bool> DeleteAsync(int id);
    Task<bool> EmailExistsAsync(string email);
    Task<bool> EmailExistsExcludingIdAsync(string email, int id);
}
