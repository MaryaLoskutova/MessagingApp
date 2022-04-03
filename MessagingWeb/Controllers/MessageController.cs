using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MessagingWeb.Services;
using MessagingWeb.Converters;
using MessagingWeb.Helpers;
using MessagingWeb.Factories;
using MessagingWeb.Models;

namespace MessagingWeb.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService _messageService;
        private readonly IMessageConverter _messageConverter;
        private readonly IMessageFactory _messageFactory;

        public MessageController(
            IMessageService messageService,
            IMessageConverter messageConverter,
            IMessageFactory messageFactory
            )
        {
            _messageService = messageService;
            _messageConverter = messageConverter;
            _messageFactory = messageFactory;
        }

        [Authorize]
        [HttpGet("history")]
        [ProducesResponseType(typeof(IEnumerable<MessageHistoryModel>), 200)]
        public async Task<ActionResult> GetHistoryAsync(DateTime beginDate)
        {
            var messageHistoryDto = await _messageService.GetMessageHistoryAsync(beginDate);
            var result = messageHistoryDto.Select(m => _messageConverter.ToModel(m)).ToArray();

            return Ok(result);
        }

        [Authorize]
        [HttpPost("send")]
        public async Task<ActionResult> SendMessageAsync([FromBody] SendMessageModel sendMessageModel)
        {
            if (sendMessageModel?.Phone.IsPhoneNumber() ?? false)
            {
                return BadRequest("The phone number doesn't valid");
            }

            var messageDto = _messageFactory.Create(sendMessageModel.Phone, sendMessageModel.Message);
            var result = await _messageService.SendMessageAsync(messageDto);

            return result.IsSuccess ? (ActionResult) Ok() : BadRequest(result.ErrorMessage);
        }
    }
}
