namespace API.DTOs;

public class UserDto
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime ModifiedDate { get; set; }
    public List<HobbiesDto> UserHobbies { get; set; }
    public List<SkillsDto> UserSkillsets { get; set; }
}
