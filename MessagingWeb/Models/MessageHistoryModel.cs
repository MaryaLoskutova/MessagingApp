using System;

namespace MessagingWeb
{
    public class MessageHistoryModel
    {
        public Guid MessageId { get; set; }

        public DateTime SendDate { get; set; }

        public string Phone { get; set; }

        public string Message { get; set; }
    }
}
