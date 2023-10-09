using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

public class UserHobbies
{
    public int Id { get; set; }
    public string Hobby { get; set; }
    public int UserId { get; set; }
    public AppUser AppUser { get; set; }
}
