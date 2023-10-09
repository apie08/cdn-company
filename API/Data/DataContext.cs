using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserHobbies>()
            .HasKey(S => S.Id);

        modelBuilder.Entity<UserHobbies>()
            .Property(s => s.Hobby).HasMaxLength(20);
            
        modelBuilder.Entity<UserHobbies>()
            .HasOne<AppUser>(s => s.AppUser)
            .WithMany(s => s.UserHobbies)
            .HasForeignKey(s => s.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }

    public DbSet<AppUser> AppUser { get; set; }
    public DbSet<UserHobbies> UserHobbies { get; set; }
    public DbSet<UserSkillsets> UserSkillsets { get; set; }
}
