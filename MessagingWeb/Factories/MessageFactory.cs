using System;
using MessagingWeb.BusinessObjects;

namespace MessagingWeb.Factories
{
    public class MessageFactory : IMessageFactory
    {
        public MessageDto Create(string phone, string message)
        {
            return new MessageDto {
                MessageId = Guid.NewGuid(),
                Message = message,
                Phone = phone,
                SendDate = DateTime.UtcNow
                };
        }
    }
}
