using System;
using System.Threading.Tasks;
using MessagingWeb.BusinessObjects;

namespace MessagingWeb.Services
{
    public interface IMessageService
    {
        Task<Result<MessageDto>> SendMessageAsync(MessageDto messageDto);
        Task<MessageDto[]> GetMessageHistoryAsync(DateTime beginDate);
    }
}
