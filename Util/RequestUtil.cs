﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections.Specialized;
using System.Text.RegularExpressions;
using System.IO;
using System.Web.Helpers;

namespace SL.Util
{
    public class RequestUtil
    {
        private IDictionary<string, string> errors;
        private NameValueCollection Form;
        private readonly HttpRequest Request;

        public RequestUtil(HttpRequest request)
        {
            this.errors = new Dictionary<string, string>();
            this.Request = request;
            this.Form = Request.Form;
        }

        public RequestUtil()
            : this(HttpContext.Current.Request)
        {
        }

        private string getParam(string name)
        {
            if (Regex.IsMatch(name, @"^Cookie\:"))
            {
                name = Regex.Replace(name, @"^Cookie\:", "");
                var cookie = Request.Cookies[name];
                if (cookie == null)
                {
                    return null;
                }
                return cookie.Value;
            }

            string value = this.Form[name];
            if (string.IsNullOrEmpty(value))
            {
                string queryString = Request.QueryString[name];
                if (!string.IsNullOrEmpty(queryString))
                {
                    return queryString;
                }
            }
            return value;
        }

        private static readonly IDictionary<string, bool> boolConvert = new Dictionary<string, bool>()
        {
            {"on", true},
            {"off", false},
            {"", false},
            {"1", true},
            {"0", false},
            {"True", true},
            {"False", false},
            {"true", true},
            {"false", false},
        };

        public static bool Validate(string input, out string msg,
            bool emptyAble = true,
            string emptyText = null,
            string regex = null,
            string regexText = null,
            string compare = null,
            string compareText = null)
        {
            if (emptyAble == false && string.IsNullOrEmpty(input))
            {
                msg = emptyText ?? "参数不完整";
            }
            else if (regex != null && !string.IsNullOrEmpty(input) && !System.Text.RegularExpressions.Regex.IsMatch(input, regex))
            {
                msg = regexText;
            }
            else if (compare != null && !string.Equals(compare, input, StringComparison.OrdinalIgnoreCase))
            {
                msg = compareText;
            }
            else
            {
                msg = null;
                return true;
            }

            return false;
        }

        public bool HasError
        {
            get { return this.errors.Count != 0; }
        }

        public void ClearErrors()
        {
            this.errors.Clear();
        }

        public IDictionary<string, string> GetErrors()
        {
            return this.errors;
        }

        public string FirstError
        {
            get
            {
                foreach (var kv in this.errors)
                {
                    return kv.Value;
                }
                return null;
            }
        }

        public string String(string name,
            bool emptyAble = true,
            string emptyText = null,
            string regex = null,
            string regexText = null,
            string compare = null,
            string compareText = null)
        {
            string value = getParam(name);
            string msg;
            if (!Validate(value, out msg, emptyAble, emptyText, regex, regexText, compare, compareText))
            {
                errors.Add(name, msg);
            }
            return value;
        }

        public String Email(string name, bool emptyAble = true, String emptyText = null)
        {
            return this.String(name, emptyAble, emptyText, @"^[-_a-zA-Z0-9\.]+@([-_a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,3}$", "邮箱地址格式错误");
        }

        public Dictionary<string, object> Dictionary(string name, bool emptyAble = true, String emptyText = null)
        {
            var str = this.String(name, emptyAble, emptyText, @"^\{.+\}$", "格式错误");

            if (string.IsNullOrEmpty(str))
            {
                return null;
            }

            return Json.Decode<Dictionary<string, object>>(str);
        }

        public string Password(string name,
            string emptyText = null,
            string regex = null,
            string regexText = null,
            string compare = null,
            string compareText = null)
        {
            string value = getParam(name);
            string msg;
            if (!Validate(value, out msg, false, emptyText, regex, regexText, compare, compareText))
            {
                errors.Add(name, msg);
                return "";
            }
            return string.IsNullOrEmpty(value) ? null : System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(value, "md5");
        }

        public int Int(string name, int defValue, bool emptyAble = true, string emptyText = null, string regex = null, string regexText = null, string compare = null, string compareText = null)
        {
            return Int(name, emptyAble, emptyText, regex, regexText, compare, compareText, defValue);
        }

        public int Int(string name, bool emptyAble = true, string emptyText = null, string regex = null, string regexText = null, string compare = null, string compareText = null, int defaultValue = 0)
        {
            string value = getParam(name);
            string msg;
            if (!Validate(value, out msg, emptyAble, emptyText, regex, regexText, compare, compareText))
            {
                errors.Add(name, msg);
            }
            else
            {
                if (string.IsNullOrEmpty(value)) return defaultValue;
                try
                {
                    return int.Parse(value);
                }
                catch
                {
                    errors.Add(name, "转换为Int类型时出现错误");
                }
            }
            return defaultValue;
        }

        public decimal Decimal(string name, bool emptyAble = true, string emptyText = null, string regex = null, string regexText = null, string compare = null, string compareText = null, decimal defaultValue = 0)
        {
            string value = getParam(name);
            string msg;
            if (!Validate(value, out msg, emptyAble, emptyText, regex, regexText, compare, compareText))
            {
                errors.Add(name, msg);
            }
            else
            {
                if (string.IsNullOrEmpty(value)) return defaultValue;
                try
                {
                    return decimal.Parse(value);
                }
                catch
                {
                    errors.Add(name, "转换为Decimal类型时出现错误");
                }
            }
            return defaultValue;
        }

        public bool Bool(string name, bool emptyAble = true, string emptyText = null, string regex = null, string regexText = null, string compare = null, string compareText = null, bool defaultValue = false)
        {
            string value = getParam(name);
            string msg;
            if (!Validate(value, out msg, emptyAble, emptyText, regex, regexText, compare, compareText))
            {
                errors.Add(name, msg);
            }
            else
            {
                if (string.IsNullOrEmpty(value)) return defaultValue;
                try
                {
                    return boolConvert[value];
                }
                catch
                {
                    errors.Add(name, "转换为布尔类型时出现错误");
                }
            }
            return defaultValue;
        }

        public DateTime DateTime(string name, bool emptyAble = true, string emptyText = null, string regex = null, string regexText = null, string compare = null, string compareText = null)
        {
            string value = getParam(name);
            string msg;
            if (!Validate(value, out msg, emptyAble, emptyText, regex, regexText, compare, compareText))
            {
                errors.Add(name, msg);
            }
            else
            {
                if (string.IsNullOrEmpty(value)) return System.DateTime.MinValue;
                try
                {
                    return System.DateTime.Parse(value);
                }
                catch
                {
                    errors.Add(name, "转换为时间类型时出现错误");
                }
            }
            return System.DateTime.MinValue;
        }

        public RequestFile File(string name, bool emptyAble = true, string emptyText = null, string exts = "jpg|png|bmp|gif|jpeg", string extText = "请上传图片格式文件", long? maxLength = 5000000, string maxLengthText = "上传文件大小超过限制")
        {
            RequestFile file = new RequestFile(HttpContext.Current.Request.Files[name]);
            if (emptyAble == false && file.IsEmpty)
            {
                errors.Add(name, emptyText);
            }
            else if (maxLength != null && file.Length > maxLength)
            {
                errors.Add(name, maxLengthText);
            }
            else if (exts != null && exts != "*" && !file.IsEmpty && !Regex.IsMatch(file.Ext, (@"^\.(" + exts.Replace(',', '|') + ")$"), RegexOptions.IgnoreCase))
            {
                errors.Add(name, extText);
            }
            return file;
        }
    }

    public class RequestFile
    {
        private string ext;
        private string fileName;
        private int length;
        private bool isEmpty;
        private HttpPostedFile _file;

        public RequestFile(HttpPostedFile file)
        {
            _file = file;
            isEmpty = file == null || string.IsNullOrEmpty(file.FileName) || file.ContentLength == 0;
            if (isEmpty)
            {
                fileName = "";
                ext = "";
                length = 0;
            }
            else
            {
                fileName = file.FileName;
                ext = fileName.LastIndexOf('.') == -1 ? ".jpg" : fileName.Substring(fileName.LastIndexOf('.'));
                length = file.ContentLength;
            }
        }

        public bool IsEmpty
        {
            get
            {
                return isEmpty;
            }
        }

        public string FileName
        {
            get
            {
                return fileName;
            }
        }

        public int Length
        {
            get
            {
                return length;
            }
        }

        public string Ext
        {
            get
            {
                return ext;
            }
        }

        public void SaveAs(string path)
        {
            if (!isEmpty)
            {
                string dir = Path.GetDirectoryName(path);
                if (!Directory.Exists(dir))
                {
                    Directory.CreateDirectory(dir);
                }
                _file.SaveAs(path);
            }
        }

        public static void Delete(string src)
        {
            if (!string.IsNullOrEmpty(src))
            {
                System.IO.File.Delete(GetPath(src));
            }
        }

        public static string GetPath(string src)
        {
            return System.Web.HttpContext.Current.Server.MapPath("~/" + src);
        }

        public static string FullUrl(string src)
        {
            if (src == null) return null;
            if (src.StartsWith("http")) return src;

            var url = System.Web.HttpContext.Current.Request.Url;

            return "http://" + url.Authority + "/" + src;
        }

        public static string GetCompressedImageSrc(string src)
        {
            var url = System.Web.HttpContext.Current.Request.Url;

            return "http://" + url.Authority + "/compress/" + src;
        }

        public static string ReplaceContent(string content)
        {
            var url = System.Web.HttpContext.Current.Request.Url;

            return System.Text.RegularExpressions.Regex.Replace(content, @"src=""/", "src=\"http://" + url.Authority + "/", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
        }

        public string Save(int maxWidth = 0, int maxHeight = 0)
        {
            if (!isEmpty)
            {
                DateTime now = DateTime.Now;
                string src = "upload/" + now.ToString("yyMMdd") + "/" + (now.Ticks - DateTime.MinValue.Ticks) + ext;
                string savePath = GetPath(src);

                string dir = Path.GetDirectoryName(savePath);
                if (!Directory.Exists(dir))
                {
                    Directory.CreateDirectory(dir);
                }

                if (maxWidth != 0)
                {
                    if (maxHeight == 0)
                    {
                        maxHeight = 2000;
                    }

                    var buffer = ImageUtil.Compress(_file.InputStream, 6, maxWidth, maxHeight);

                    using (var fs = System.IO.File.Open(savePath, FileMode.Create))
                    {
                        fs.Write(buffer, 0, buffer.Length);
                    }
                }
                else
                {
                    _file.SaveAs(savePath);
                }
                return src;
            }
            return null;
        }
    }

}