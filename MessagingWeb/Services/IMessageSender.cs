using System.Threading.Tasks;
using MessagingWeb.BusinessObjects;

namespace MessagingWeb.Services
{
    public interface IMessageSender
    {
        Task SendAsync(string phone, string message);
    }
}
