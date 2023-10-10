using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers;

public class AutomapperProfiles : Profile
{
    public AutomapperProfiles()
    {
        CreateMap<AppUser, UserDto>();
        CreateMap<UserHobbies, HobbiesDto>();
        CreateMap<UserSkillsets, SkillsDto>();
        CreateMap<UpdateUserDto, AppUser>()
            .ForMember(c => c.UserSkillsets, option => option.Ignore())
            .ForMember(c => c.UserHobbies, option => option.Ignore());
    }

}
