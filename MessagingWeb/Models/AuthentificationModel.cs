using System;
using System.Runtime.Serialization;

namespace MessagingWeb.Models
{
    [DataContract]
    public class AuthentificationModel
    {
        [DataMember(IsRequired =true)]
        public string Login { get; set; }

        [DataMember(IsRequired = true)]
        public string Password { get; set; }
    }
}
