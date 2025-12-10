using Dapper;
using Microsoft.Data.SqlClient;
using StudentManagement.API.Models;
using System.Data;

namespace StudentManagement.API.Repositories;

public class StudentRepository : IStudentRepository
{
    private readonly string _connectionString;

    public StudentRepository(IConfiguration configuration)
    {
        var connString = configuration.GetConnectionString("DefaultConnection");
        if (string.IsNullOrEmpty(connString))
        {
            throw new InvalidOperationException("Connection string 'DefaultConnection' not found");
        }
        _connectionString = connString;
    }

    private IDbConnection GetConnection()
    {
        return new SqlConnection(_connectionString);
    }

    public async Task<IEnumerable<Student>> GetAllAsync(string? search = null)
    {
        using var connection = GetConnection();
        
        return await connection.QueryAsync<Student>(
            "sp_GetAllStudents",
            new { search },
            commandType: CommandType.StoredProcedure
        );
    }

    public async Task<Student?> GetByIdAsync(int id)
    {
        using var connection = GetConnection();
        
        return await connection.QueryFirstOrDefaultAsync<Student>(
            "sp_GetStudentById",
            new { id },
            commandType: CommandType.StoredProcedure
        );
    }

    public async Task<Student> CreateAsync(Student student)
    {
        using var connection = GetConnection();
        
        return await connection.QuerySingleAsync<Student>(
            "sp_CreateStudent",
            new 
            { 
                name = student.Name,
                email = student.Email,
                age = student.Age,
                createdAt = student.CreatedAt
            },
            commandType: CommandType.StoredProcedure
        );
    }

    public async Task<bool> UpdateAsync(Student student)
    {
        using var connection = GetConnection();
        
        var result = await connection.ExecuteScalarAsync<int>(
            "sp_UpdateStudent",
            new 
            { 
                id = student.Id,
                name = student.Name,
                email = student.Email,
                age = student.Age
            },
            commandType: CommandType.StoredProcedure
        );
        
        return result > 0;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        using var connection = GetConnection();
        
        var result = await connection.ExecuteScalarAsync<int>(
            "sp_DeleteStudent",
            new { id },
            commandType: CommandType.StoredProcedure
        );
        
        return result > 0;
    }

    public async Task<bool> EmailExistsAsync(string email)
    {
        using var connection = GetConnection();
        
        var count = await connection.ExecuteScalarAsync<int>(
            "sp_EmailExists",
            new { email },
            commandType: CommandType.StoredProcedure
        );
        
        return count > 0;
    }

    public async Task<bool> EmailExistsExcludingIdAsync(string email, int id)
    {
        using var connection = GetConnection();
        
        var count = await connection.ExecuteScalarAsync<int>(
            "sp_EmailExistsExcludingId",
            new { email, id },
            commandType: CommandType.StoredProcedure
        );
        
        return count > 0;
    }
}
