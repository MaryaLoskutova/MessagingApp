using System;
using System.Linq;
using System.Threading.Tasks;
using MessagingWeb.BusinessObjects;
using MessagingWeb.Converters;
using MessagingWeb.Repositories;

namespace MessagingWeb.Services
{
    public class MessageService : IMessageService
    {
        private readonly IMessageHistoryRepository _messageHistoryRepository;
        private readonly IMessageConverter _messageConverter;
        private readonly IMessageSender _messageSender;

        public MessageService(
            IMessageHistoryRepository messageHistoryRepository,
            IMessageConverter messageConverter,
            IMessageSender messageSender 
            )
        {
            _messageHistoryRepository = messageHistoryRepository;
            _messageConverter = messageConverter;
            _messageSender = messageSender;
        }

        public async Task<Result<MessageDto>> SendMessageAsync(MessageDto messageDto)
        {
            try
            {
                await _messageSender.SendAsync(messageDto.Phone, messageDto.Message);
            }
            catch(Exception ex)
            {
                return Result<MessageDto>.Error(ex.Message);
            }

            var messageDbo = _messageConverter.ToDbo(messageDto);
            await _messageHistoryRepository.CreateAsync(messageDbo);
            return Result<MessageDto>.Ok(messageDto);
        }

        public async Task<MessageDto[]> GetMessageHistoryAsync(DateTime beginDate)
        {
            var messagesDto = await _messageHistoryRepository.SelectAsync(beginDate);
            return messagesDto.Select(m => _messageConverter.ToDto(m)).ToArray();
        }
    }
}
