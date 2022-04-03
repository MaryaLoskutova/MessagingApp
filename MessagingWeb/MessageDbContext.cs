using MessagingWeb.BusinessObjects;
using Microsoft.EntityFrameworkCore;

namespace MessagingWeb
{
    public class MessageDbContext : DbContext
    {
        public MessageDbContext(DbContextOptions<MessageDbContext> options) :
            base(options)
        {
        }

        public DbSet<MessageDbo> MessageHistory { get; set; }

    }
}
