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
    public class ProxyMessageSender : IMessageSender 
    {
        public Task SendAsync(string phone, string message)
        {
            return Task.CompletedTask;
        }
    }
}
