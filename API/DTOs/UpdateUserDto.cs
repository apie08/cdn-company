namespace API.DTOs;

public class UpdateUserDto
{
    public string Username { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime ModifiedDate { get; set; } = DateTime.Now;
    public List<HobbiesDto> UserHobbies { get; set; }
    public List<SkillsDto> UserSkillsets { get; set; }
}
