using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;

namespace SL.Util
{
    public enum OutputType
    {
        Normal,
        IFrame
    }

    public class HtmlUtil
    {
        public static string Result(string callback, dynamic obj)
        {
            if (string.IsNullOrEmpty(callback))
            {
                return Json.Encode(obj);
            }
            else
            {
                return "<script>window.parent." + callback + "(" + Json.Encode(obj) + ");</script>";
            }
        }

        public static void OutputResult(dynamic obj)
        {
            string callback = HttpContext.Current.Request.QueryString["callback"] ?? HttpContext.Current.Request.Form["callback"];
            if (string.IsNullOrEmpty(callback))
            {
                HttpContext.Current.Response.Write(Json.Encode(obj));
            }
            else
            {
                HttpContext.Current.Response.Write("<script>window.parent." + callback + "(" + Json.Encode(obj) + ");</script>");
            }
        }

        public static void Write(string html)
        {
            HttpContext.Current.Response.Write(html);
        }

        public static void Output(dynamic obj, string callback)
        {
            if (string.IsNullOrEmpty(callback))
            {
                Write(Json.Encode(obj));
            }
            else
            {
                Write("<script>window.parent." + callback + "(" + Json.Encode(obj) + ");</script>");
            }
        }

        public static void Output(dynamic obj, OutputType type = OutputType.IFrame)
        {
            if (type == OutputType.IFrame)
            {
                IFrameResult(obj);
            }
            else
            {
                OutputResult(obj);
            }
        }

        public static void IFrameResult(dynamic obj)
        {
            string callback = HttpContext.Current.Request.QueryString["callback"] ?? HttpContext.Current.Request.Form["callback"];
            if (string.IsNullOrEmpty(callback))
            {
                Write(Json.Encode(obj));
            }
            else
            {
                Write("<script>window.parent." + callback + "(" + Json.Encode(obj) + ");</script>");
            }
        }
    }
}