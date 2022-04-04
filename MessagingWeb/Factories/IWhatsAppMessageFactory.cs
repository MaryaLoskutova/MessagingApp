using MessagingWeb.BusinessObjects.WhatsApp;

namespace MessagingWeb.Factories
{
    public interface IWhatsAppMessageFactory
    {
        WhatsAppMessage Create(string phone, string message);
    }
}