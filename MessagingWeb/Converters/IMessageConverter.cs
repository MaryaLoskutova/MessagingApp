using MessagingWeb.BusinessObjects;

namespace MessagingWeb.Converters
{
    public interface IMessageConverter
    {
        MessageDto ToDto(MessageDbo messageDbo);
        MessageDbo ToDbo(MessageDto messageDto);
        MessageHistoryModel ToModel(MessageDto messageDto);
    }
}
