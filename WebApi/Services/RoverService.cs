using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Domain.Models;
using WebApi.Domain.Repositories;
using WebApi.Domain.Services;
namespace WebApi.Services
{
    public class RoverService : IRoverService
    {
        private readonly IRoverRepository _roverRepository;

        public RoverService(IRoverRepository roverRepository)
        {
            this._roverRepository = roverRepository;
        }
        public async Task<IEnumerable<Rover>> ListAsync()
        {
            return await _roverRepository.ListAsync();
        }
    }
}
