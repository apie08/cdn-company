using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

public class AppUser
{
    [Key]
    public int Id { get; set; }
    [MaxLength(20)]
    public string Username { get; set; }
    public string Email { get; set; }
    [MaxLength(20)]
    public string PhoneNumber { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime ModifiedDate { get; set; }
    public ICollection<UserHobbies> UserHobbies { get; set; }
    public ICollection<UserSkillsets> UserSkillsets { get; set; }
}
