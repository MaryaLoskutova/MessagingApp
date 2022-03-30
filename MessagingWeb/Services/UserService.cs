using MessagingWeb.BusinessObjects;
using MessagingWeb.Helpers;
using Microsoft.Extensions.Configuration;

namespace MessagingWeb.Services
{
    public class UserService : IUserService
    {
        private readonly IConfiguration _configuration;

        public UserService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        UserDto IUserService.Authenticate(string login, string password)
        {
            if (string.IsNullOrEmpty(login) || string.IsNullOrEmpty(password))
                return null;


            var appSettingsSection = _configuration.GetSection("AppSettings");
            var appSettings = appSettingsSection.Get<AppSettings>();

            return appSettings.User.Login == login
                && appSettings.User.Password == password
                ? appSettings.User
                : null;
        }
    }
}
