using API.Entities;

namespace API.Interfaces;

public interface IUserRepository
{
    void Update(AppUser user);
    void Delete(AppUser user);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<AppUser>> GetAllUserAsync();
    Task<AppUser> GetUserById(int id);
    Task<int> GetLatestKeyin();

}
