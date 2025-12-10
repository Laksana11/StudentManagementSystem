using System.ComponentModel.DataAnnotations;

namespace StudentManagement.API.Models;

public class Student
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public int? Age { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
