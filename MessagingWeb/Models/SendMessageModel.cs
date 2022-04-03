using System.Runtime.Serialization;

namespace MessagingWeb.Models
{
    [DataContract]
    public class SendMessageModel
    {
        [DataMember(IsRequired = true)]
        public string Phone { get; set; }

        [DataMember(IsRequired = true)]
        public string Message { get; set; }
    }
}
