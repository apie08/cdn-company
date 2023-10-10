using API.Entities;

namespace API.Interfaces;

public interface ISkillRepository
{
    void Delete(UserSkillsets skill);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<UserSkillsets>> GetAllSkillByUserId(int id);
    void Add(UserSkillsets skill);
}
