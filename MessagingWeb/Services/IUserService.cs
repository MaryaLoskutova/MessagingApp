using MessagingWeb.BusinessObjects;

namespace MessagingWeb.Services
{
    public interface IUserService
    {
        UserDto Authenticate(string login, string password);
    }
}
