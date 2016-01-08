using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Diagnostics;

namespace SL.Util
{
    public class Rar
    {
        public static string Decompress(string rarPath, string descDir, Action callback)
        {
            return Decompress("rar", rarPath, descDir, callback);
        }

        public static string Decompress(string rar, string rarPath, string descDir, Action callback)
        {
            string arguments = " X -o+ " + rarPath + " " + descDir;

            var processStartInfo = new ProcessStartInfo(rar, arguments);
            processStartInfo.UseShellExecute = false;
            processStartInfo.RedirectStandardOutput = true;
            processStartInfo.WindowStyle = ProcessWindowStyle.Hidden;
            string result = "";

            using (var process = new Process())
            {
                process.StartInfo = processStartInfo;
                process.Start();
                string line;
                while (true)
                {
                    line = process.StandardOutput.ReadLine();
                    result += line;
                    if (line == "全部OK"||line == "全部完成")
                    {
                        break;
                    }
                    else if (line == null)
                    {
                        break;
                    }
                }
                callback();
            }
            return result;
        }

        public static void Compress(string dir, string descPath, Action callback)
        {
            Compress("rar", dir, descPath, callback);
        }

        public static void Compress(string rar, string dir, string descPath,Action callback)
        {
            if (!System.IO.Directory.Exists(dir))
                return;

            string arguments = " a -r -o+ " + descPath;

            var processStartInfo = new ProcessStartInfo(rar, arguments);
            processStartInfo.UseShellExecute = false;
            processStartInfo.RedirectStandardOutput = true;
            processStartInfo.WindowStyle = ProcessWindowStyle.Hidden;
            processStartInfo.WorkingDirectory = dir;

            using (var process = new Process())
            {
                process.StartInfo = processStartInfo;
                process.Start();
                string line;
                while (true)
                {
                    line = process.StandardOutput.ReadLine();
                    if (line == "完成")
                    {
                        break;
                    }
                    else if (line == null)
                    {
                        break;
                    }
                }
                callback();
            }
        }
    }
}