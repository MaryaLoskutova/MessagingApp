using System;
namespace MessagingWeb.BusinessObjects
{
    public class MessageDto
    {
        public Guid MessageId { get; set; }
        public DateTime SendDate { get; set; }
        public string Phone { get; set; }
        public string Message { get; set; }
    }
}
