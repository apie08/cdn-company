using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

public class UserSkillsets
{
    [Key]
    public int Id { get; set; }

    [MaxLength(20)]
    public string SkillName { get; set; }
    public int UserId { get; set; }

    [ForeignKey("UserId")]
    public AppUser AppUser { get; set; }
}
