using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class HobbyRepository : IHobbyRepository
{
    private readonly DataContext _context;

    public HobbyRepository(DataContext context)
    {
        _context = context;
    }

    public void Add(UserHobbies hobbies)
    {
        _context.UserHobbies.Add(hobbies);
    }

    public void Delete(UserHobbies hobbies)
    {
        _context.Remove(hobbies);
    }

    public async Task<IEnumerable<UserHobbies>> GetAllHobbyByUserId(int id)
    {
        return await _context.UserHobbies.Where(x => x.UserId == id).ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}
