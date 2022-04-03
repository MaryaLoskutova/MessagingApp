using System;
using System.Threading.Tasks;
using System.Linq;
using MessagingWeb.BusinessObjects;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace MessagingWeb.Repositories
{
    public class MessageHistoryRepository : IMessageHistoryRepository
    {
        private readonly MessageDbContext _messageDbContext;

        public MessageHistoryRepository(MessageDbContext messageDbContext)
        {
            _messageDbContext = messageDbContext;
        }

        public async Task<MessageDbo> CreateAsync(MessageDbo messageDbo)
        {
            await _messageDbContext.MessageHistory.AddAsync(messageDbo);
            await _messageDbContext.SaveChangesAsync();
            return messageDbo;
        }

        public async Task<MessageDbo[]> SelectAsync(
            DateTime beginDate)
        {
            return await _messageDbContext.MessageHistory
                .Where(m => m.SendDate >= beginDate)
                .OrderByDescending(m => m.Timestamp)
                .ToArrayAsync();
        }
    }
}
