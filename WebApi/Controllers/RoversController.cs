using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Domain.Models;
using WebApi.Persistence.Contexts;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoversController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RoversController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Rovers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rover>>> GetRovers()
        {
            return await _context.Rovers.ToListAsync();
        }

        // GET: api/Rovers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Rover>> GetRover(int id)
        {
            var rover = await _context.Rovers.FindAsync(id);

            if (rover == null)
            {
                return NotFound();
            }

            return rover;
        }

        // PUT: api/Rovers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRover(int id, Rover rover)
        {
            if (id != rover.Id)
            {
                return BadRequest();
            }

            _context.Entry(rover).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoverExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Rovers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Rover>> PostRover(Rover rover)
        {
            _context.Rovers.Add(rover);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRover", new { id = rover.Id }, rover);
        }

        // DELETE: api/Rovers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRover(int id)
        {
            var rover = await _context.Rovers.FindAsync(id);
            if (rover == null)
            {
                return NotFound();
            }

            _context.Rovers.Remove(rover);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RoverExists(int id)
        {
            return _context.Rovers.Any(e => e.Id == id);
        }
    }
}
