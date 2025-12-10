using Microsoft.AspNetCore.Mvc;
using StudentManagement.API.DTOs;
using StudentManagement.API.Services;

namespace StudentManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StudentsController : ControllerBase
{
    private readonly IStudentService _studentService;

    public StudentsController(IStudentService studentService)
    {
        _studentService = studentService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<StudentDto>>> GetStudents([FromQuery] string? search = null)
    {
        var students = await _studentService.GetAllStudentsAsync(search);
        return Ok(students);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<StudentDto>> GetStudent(int id)
    {
        var student = await _studentService.GetStudentByIdAsync(id);
        
        return Ok(student);
    }


    [HttpPost]
    public async Task<ActionResult<StudentDto>> CreateStudent([FromBody] CreateStudentRequest request)
    {

        var student = await _studentService.CreateStudentAsync(request);
        return CreatedAtAction(nameof(GetStudent), new { id = student.Id }, student);
    }


    [HttpPut("{id}")]
    public async Task<ActionResult<StudentDto>> UpdateStudent(int id, [FromBody] UpdateStudentRequest request)
    {
        var student = await _studentService.UpdateStudentAsync(id, request);
        
        return Ok(student);
    }


    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteStudent(int id)
    {
        var result = await _studentService.DeleteStudentAsync(id);
       
        return Ok(new { success = true, message = "Student deleted successfully" });
    }
}
