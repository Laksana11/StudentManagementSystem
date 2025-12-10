using AutoMapper;
using StudentManagement.API.DTOs;
using StudentManagement.API.Models;

namespace StudentManagement.API.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Student, StudentDto>();
        CreateMap<CreateStudentRequest, Student>();
        CreateMap<UpdateStudentRequest, Student>();
    }
}
