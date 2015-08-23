using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SL.Util
{
    public class DateUtil
    {
        public static int MonthDiff(DateTime start, DateTime end)
        {
            return end.Month + (end.Year - start.Year) * 12 - start.Month;
        }
    }

}