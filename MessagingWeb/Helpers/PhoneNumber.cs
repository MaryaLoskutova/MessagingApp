using System;
using System.Text.RegularExpressions;

namespace MessagingWeb.Helpers
{
    public static class PhoneNumber
    { 
        public const string motif = @"^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$";

        public static bool IsPhoneNumber(this string number)
        {
            if (number != null) return Regex.IsMatch(number, motif);
            return false;
        }

    }
}
