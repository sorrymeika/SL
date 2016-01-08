using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace SL.Util
{
    public class Base64Util
    {
        public static string Decode(string source)
        {
            return Encoding.UTF8.GetString(Convert.FromBase64String(source));
        }

        public static string Encode(string from)
        {
            return Convert.ToBase64String(Encoding.UTF8.GetBytes(from));
        }
    }
}