using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Domain.Models;
using WebApi.Domain.Repositories;
using WebApi.Persistence.Contexts;

namespace WebApi.Persistence.Repositories
{
    public class RoverRepository : BaseRepository, IRoverRepository
    {
        public RoverRepository(AppDbContext context) : base(context)
        {

        }

        public async Task<IEnumerable<Rover>> ListAsync()
        {
            return await _context.Rovers.ToListAsync();
        }
    }
}
