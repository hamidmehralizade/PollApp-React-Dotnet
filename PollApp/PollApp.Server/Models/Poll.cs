using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PollApp.Server.Models
{
    public class Poll
    {
        public int ID { get; set; }

        [Required]
        public string Question { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public List<PollOption> Options { get; set; } = new List<PollOption>();
    }

    public class PollOption
    {
        public int ID { get; set; }

        [Required]
        public string Text { get; set; }

        public int Votes { get; set; } = 0;

        public int PollID { get; set; }
        public Poll Poll { get; set; }
    }

    public class PollVote
    {
        public int ID { get; set; }
        public int PollID { get; set; }
        public string UserIP { get; set; }
        public DateTime VotedAt { get; set; } = DateTime.UtcNow;
    }
}