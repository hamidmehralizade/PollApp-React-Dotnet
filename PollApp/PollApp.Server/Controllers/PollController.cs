using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PollApp.Server.Data;
using PollApp.Server.Models;

namespace PollApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PollController : ControllerBase
    {
        private readonly PollContext _context;

        public PollController(PollContext context)
        {
            _context = context;
        }

        // GET: api/Poll
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Poll>>> GetPolls()
        {
            return await _context.Polls.Include(p => p.Options).ToListAsync();
        }

        // GET: api/Poll/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Poll>> GetPoll(int id)
        {
            var poll = await _context.Polls.Include(p => p.Options)
                                          .FirstOrDefaultAsync(p => p.ID == id);

            if (poll == null)
            {
                return NotFound();
            }

            return poll;
        }

        // POST: api/Poll
        [HttpPost]
        public async Task<ActionResult<Poll>> PostPoll(Poll poll)
        {
            poll.CreatedAt = DateTime.UtcNow;
            _context.Polls.Add(poll);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPoll), new { id = poll.ID }, poll);
        }

        // POST: api/Poll/5/Vote
        [HttpPost("{id}/Vote")]
        public async Task<IActionResult> Vote(int id, int optionId)
        {
            var option = await _context.PollOptions.FindAsync(optionId);
            if (option == null || option.PollID != id)
            {
                return NotFound();
            }

            // Prevent duplicate voting (simple IP check)
            var userIP = HttpContext.Connection.RemoteIpAddress?.ToString();
            var hasVoted = await _context.PollVotes.AnyAsync(v => v.PollID == id && v.UserIP == userIP);

            if (hasVoted)
            {
                return BadRequest("You have already voted in this poll.");
            }

            option.Votes++;
            _context.PollVotes.Add(new PollVote
            {
                PollID = id,
                UserIP = userIP
            });

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}