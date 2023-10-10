using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class SkillRepository : ISkillRepository
{
    private readonly DataContext _context;

    public SkillRepository(DataContext context)
    {
        _context = context;
    }

    public void Add(UserSkillsets skill)
    {
        _context.UserSkillsets.Add(skill);
    }

    public void Delete(UserSkillsets skill)
    {
        _context.Remove(skill);
    }

    public async Task<IEnumerable<UserSkillsets>> GetAllSkillByUserId(int id)
    {
        return await _context.UserSkillsets.Where(x => x.UserId == id).ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}
