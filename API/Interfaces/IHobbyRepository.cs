using API.Entities;

namespace API.Interfaces;

public interface IHobbyRepository
{
    void Delete(UserHobbies hobbies);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<UserHobbies>> GetAllHobbyByUserId(int id);
    void Add(UserHobbies hobbies);
}
