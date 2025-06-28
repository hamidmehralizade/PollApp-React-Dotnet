using Microsoft.EntityFrameworkCore;
using PollApp.Server.Models;

namespace PollApp.Server.Data
{
    public class PollContext : DbContext
    {
        public PollContext(DbContextOptions<PollContext> options) : base(options)
        {
        }

        public DbSet<Poll> Polls { get; set; }
        public DbSet<PollOption> PollOptions { get; set; }
        public DbSet<PollVote> PollVotes { get; set; }
    }
}