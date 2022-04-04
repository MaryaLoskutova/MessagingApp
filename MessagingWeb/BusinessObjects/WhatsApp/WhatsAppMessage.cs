using System;
using System.Text.Json.Serialization;

namespace MessagingWeb.BusinessObjects.WhatsApp
{
    [Serializable]
    public class WhatsAppMessage
    {
        [JsonPropertyName("to")]
        public string To { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("text")]
        public WhatsAppText Text { get; set; }

        [JsonPropertyName("recipient_type")]
        public string RecipientType { get; set; }

        [JsonPropertyName("messaging_product")]
        public string MessagingProduct { get; set; }
    }
}
