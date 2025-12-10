using AutoMapper;
using StudentManagement.API.DTOs;
using StudentManagement.API.Models;
using StudentManagement.API.Repositories;

namespace StudentManagement.API.Services;

public class StudentService : IStudentService
{
    private readonly IStudentRepository _repository;
    private readonly IMapper _mapper;

    public StudentService(IStudentRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<StudentDto>> GetAllStudentsAsync(string? search = null)
    {
        var students = await _repository.GetAllAsync(search);
        return _mapper.Map<IEnumerable<StudentDto>>(students);
    }

    public async Task<StudentDto?> GetStudentByIdAsync(int id)
    {
        var student = await _repository.GetByIdAsync(id);
        return student == null ? null : _mapper.Map<StudentDto>(student);
    }

    public async Task<StudentDto> CreateStudentAsync(CreateStudentRequest request)
    {
        // Check for duplicate email
        if (await _repository.EmailExistsAsync(request.Email))
        {
            throw new InvalidOperationException("Email already exists");
        }

        var student = _mapper.Map<Student>(request);
        student.CreatedAt = DateTime.UtcNow;

        var createdStudent = await _repository.CreateAsync(student);
        return _mapper.Map<StudentDto>(createdStudent);
    }

    public async Task<StudentDto?> UpdateStudentAsync(int id, UpdateStudentRequest request)
    {
        var student = await _repository.GetByIdAsync(id);
        if (student == null)
        {
            return null;
        }

        if (await _repository.EmailExistsExcludingIdAsync(request.Email, id))
        {
            throw new InvalidOperationException("Email already exists");
        }

        _mapper.Map(request, student);
        await _repository.UpdateAsync(student);

        return _mapper.Map<StudentDto>(student);
    }

    public async Task<bool> DeleteStudentAsync(int id)
    {
        return await _repository.DeleteAsync(id);
    }
}
