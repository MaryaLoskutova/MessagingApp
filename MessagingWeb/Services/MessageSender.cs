using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using MessagingWeb.Factories;
using MessagingWeb.Helpers;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace MessagingWeb.Services
{
    public class MessageSender : IMessageSender 
    {
        private readonly AppSettings _appSettings;
        private readonly IWhatsAppMessageFactory _whatsAppMessageFactory;

        public MessageSender(
            IOptions<AppSettings> appSettings,
            IWhatsAppMessageFactory whatsAppMessageFactory
            )
        {
            _appSettings = appSettings.Value;
            this._whatsAppMessageFactory = whatsAppMessageFactory;
        }

        public async Task SendAsync(string phone, string message)
        {
            using(var client = new HttpClient())
            {
                var person = _whatsAppMessageFactory.Create(phone, message);

                var json = JsonConvert.SerializeObject(person);
                var data = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await client.PostAsync(GetUrl("messages"), data).ConfigureAwait(false);
                if (response.StatusCode != HttpStatusCode.OK)
                {
                    throw new Exception($"{response.StatusCode} An error accured while sending a message");
                }
            }
        }

        private string GetUrl(string methodPath)
        {

            var whatsAppSettings = _appSettings.WhatsAppSettings;

            var url = new Uri($"{whatsAppSettings.GetBaseUrl()}/{methodPath}");
            var builder = new UriBuilder(url)
            {
                Port = -1
            };

            var query = HttpUtility.ParseQueryString(builder.Query);
            query["access_token"] = $"Bearer {whatsAppSettings.AccessToken}";

            builder.Query = query.ToString();

            return builder.ToString();
        }
    }
}
