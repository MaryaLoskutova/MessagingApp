using System;
using System.Threading.Tasks;
using MessagingWeb.BusinessObjects;

namespace MessagingWeb.Repositories
{
    public interface IMessageHistoryRepository
    {
        Task<MessageDbo> CreateAsync(MessageDbo messageDbo);
        Task<MessageDbo[]> SelectAsync(DateTime beginDate);
    }
}
