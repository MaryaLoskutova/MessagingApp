using MessagingWeb.BusinessObjects;

namespace MessagingWeb.Helpers
{
    public class AppSettings
    {
        public string Secret { get; set; }
        public UserDto User { get; set; }
        public WhatsAppSettings WhatsAppSettings { get; set; }
        public bool UseProxy { get; set; }
    }
}
