using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MessagingWeb.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MessageHistoryController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Hello", "Nice to meet you", "Ok?", "Cool", "goodbye"
        };

        private readonly ILogger<MessageHistoryController> _logger;

        public MessageHistoryController(ILogger<MessageHistoryController> logger)
        {
            _logger = logger;
        }

        [Authorize]
        [HttpGet]
        public IEnumerable<MessageHistoryModel> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new MessageHistoryModel
            {
                Date = DateTime.Now.AddDays(index),
                Phone = rng.Next(-20, 55),
                Message = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
