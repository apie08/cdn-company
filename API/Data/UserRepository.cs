using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class UserRepository : IUserRepository
{
    private readonly DataContext _context;

    public UserRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<AppUser>> GetAllUserAsync()
    {
        return await _context.AppUser
            .Include(h => h.UserHobbies)
            .Include(s => s.UserSkillsets)
            .ToListAsync();
    }


    public async Task<AppUser> GetUserById(int id)
    {
        return await _context.AppUser
            .Include(h => h.UserHobbies)
            .Include(s => s.UserSkillsets)
            .SingleOrDefaultAsync(i => i.Id == id);
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public void Update(AppUser user)
    {
        _context.Entry(user).State = EntityState.Modified;
    }

    public async Task<int> GetLatestKeyin()
    {
        return await _context.AppUser.OrderByDescending(s => s.Id).Select(s => s.Id).SingleOrDefaultAsync(); 
    }

    public void Delete(AppUser user)
    {
        _context.AppUser.Remove(user);
    }
}
