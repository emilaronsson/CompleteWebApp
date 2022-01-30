using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Domain.Models;

namespace WebApi.Domain.Services
{
    public interface IRoverService
    {
        Task<IEnumerable<Rover>> ListAsync();
    }
}
