using Microsoft.EntityFrameworkCore;
using WebApi.Domain.Models;

namespace WebApi.Persistence.Contexts
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            this.Database.EnsureCreated();
        }
        public DbSet<Rover> Rovers { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Rover>().ToTable("Rovers");
            builder.Entity<Rover>().HasKey(p => p.Id);
            builder.Entity<Rover>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<Rover>().Property(p => p.Name).IsRequired().HasMaxLength(30);

            builder.Entity<Rover>().HasData
                (
                new Rover { Id = 1, Name = "Curiosity", Mission = "To search areas of Mars for past or present conditions favorable for life, and conditions capable of preserving a record of life" },
                new Rover { Id = 2, Name = "Opportunity", Mission = "Determine wheter life ever arose on Mars. Characterize the climate and geology of Mars. Prepare for human exploration." },
                new Rover { Id = 3, Name = "Spirit", Mission = "Determine wheter life ever arose on Mars. Characterize the climate and geology of Mars. Prepare for human exploration." }
                );
        }
    }
}
