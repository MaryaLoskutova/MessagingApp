namespace MessagingWeb.Helpers
{
    public class WhatsAppSettings
    {
        public string AccessToken { get; set; }
        public string PhoneNumberId { get; set; }
        public string ApiUrl { get; set; }

        public string GetBaseUrl()
        {
            return $"{ApiUrl}/{PhoneNumberId}";
        }
    }
}
