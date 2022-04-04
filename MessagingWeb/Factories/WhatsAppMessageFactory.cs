using System;
using System.Collections.Generic;
using MessagingWeb.BusinessObjects.WhatsApp;

namespace MessagingWeb.Factories
{
    public class WhatsAppMessageFactory : IWhatsAppMessageFactory
    {
        public WhatsAppMessage Create(string phone, string message)
        {
            return new WhatsAppMessage
            {
                To = phone,
                Type = "text",
                Text = new WhatsAppText { Body = message, PreviewUrl = false },
                RecipientType = "individual",
                MessagingProduct = "whatsapp"
            };
        }
    }
}
