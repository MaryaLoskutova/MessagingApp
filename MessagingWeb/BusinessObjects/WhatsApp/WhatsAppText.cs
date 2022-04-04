using System;
using System.Text.Json.Serialization;

namespace MessagingWeb.BusinessObjects.WhatsApp
{
    [Serializable]
    public class WhatsAppText
    {
        [JsonPropertyName("body")]
        public string Body { get; set; }

        [JsonPropertyName("preview_url")]
        public bool PreviewUrl { get; set; }
    }
}
