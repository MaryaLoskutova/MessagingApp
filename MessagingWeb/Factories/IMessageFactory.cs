using System;
using MessagingWeb.BusinessObjects;

namespace MessagingWeb.Factories
{
    public interface IMessageFactory
    {
        MessageDto Create(string phone, string message);
    }
}
