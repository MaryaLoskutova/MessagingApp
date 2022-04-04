using MessagingWeb.BusinessObjects;
using MessagingWeb.Helpers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace MessagingWeb.Services
{
    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        UserDto IUserService.Authenticate(string login, string password)
        {
            if (string.IsNullOrEmpty(login) || string.IsNullOrEmpty(password))
                return null;

            return _appSettings.User.Login == login
                && _appSettings.User.Password == password
                ? _appSettings.User
                : null;
        }
    }
}
