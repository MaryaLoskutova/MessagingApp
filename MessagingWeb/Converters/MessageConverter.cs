using System;
using MessagingWeb.BusinessObjects;

namespace MessagingWeb.Converters
{
    public class MessageConverter : IMessageConverter
    {
        public MessageDbo ToDbo(MessageDto messageDto)
        {
            return new MessageDbo
            {
                MessageId = messageDto.MessageId,
                Message = messageDto.Message,
                Phone = messageDto.Phone,
                SendDate = messageDto.SendDate,
                Timestamp = DateTimeOffset.UtcNow.Ticks
            };
        }

        public MessageDto ToDto(MessageDbo messageDbo)
        {
            return new MessageDto
            {
                MessageId = messageDbo.MessageId,
                Message = messageDbo.Message,
                Phone = messageDbo.Phone,
                SendDate = messageDbo.SendDate
            };
        }

        public MessageHistoryModel ToModel(MessageDto messageDto)
        {
            return new MessageHistoryModel
            {
                Message = messageDto.Message,
                Phone = messageDto.Phone,
                SendDate = messageDto.SendDate,
                MessageId = messageDto.MessageId
            };
        }
    }
}
