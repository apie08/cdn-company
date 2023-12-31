﻿namespace API.DTOs;

public class UpdateUserDto
{
    public string Username { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime ModifiedDate { get; set; } = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
    public List<HobbiesDto> UserHobbies { get; set; }
    public List<SkillsDto> UserSkillsets { get; set; }
}
