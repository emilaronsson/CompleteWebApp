using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Domain.Models;

namespace WebApi.Domain.Repositories
{
    public interface IRoverRepository
    {
        Task<IEnumerable<Rover>> ListAsync();
    }
}
