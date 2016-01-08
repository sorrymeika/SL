using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Diagnostics;
using ICSharpCode.SharpZipLib.Zip;

namespace SL.Util
{
    public class ZipUtil
    {
        public static void Decompress(string GzipFile, string targetPath)
        {
            //string directoryName = Path.GetDirectoryName(targetPath + "\\") + "\\";   
            string directoryName = targetPath;
            if (!Directory.Exists(directoryName)) Directory.CreateDirectory(directoryName);//生成解压目录   
            string CurrentDirectory = directoryName;
            byte[] data = new byte[2048];
            int size = 2048;
            ZipEntry theEntry = null;
            using (ZipInputStream s = new ZipInputStream(File.OpenRead(GzipFile)))
            {
                while ((theEntry = s.GetNextEntry()) != null)
                {
                    if (theEntry.IsDirectory)
                    {// 该结点是目录   
                        if (!Directory.Exists(CurrentDirectory + theEntry.Name)) Directory.CreateDirectory(CurrentDirectory + theEntry.Name);
                    }
                    else
                    {
                        if (theEntry.Name != String.Empty)
                        {
                            //解压文件到指定的目录   
                            using (FileStream streamWriter = File.Create(CurrentDirectory + theEntry.Name))
                            {
                                while (true)
                                {
                                    size = s.Read(data, 0, data.Length);
                                    if (size <= 0) break;

                                    streamWriter.Write(data, 0, size);
                                }
                                streamWriter.Close();
                            }
                        }
                    }
                }
                s.Close();
            }
        }

    }
}