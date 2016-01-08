using System;
using System.Collections.Generic;
using WxPayAPI;

namespace SL.Util
{
    public class PayUtil
    {
        /// <summary>
        /// 统一下单接口
        /// </summary>
        /// <param name="out_trade_no">订单编号</param>
        /// <param name="total_fee">订单金额</param>
        /// <param name="spbill_create_ip">APP和网页支付提交用户端ip，Native支付填调用微信支付API的机器IP。</param>
        /// <param name="body">商品描述</param>
        /// <param name="goods_tag">商品标记</param>
        /// <param name="attach">附加数据</param>
        /// <returns></returns>
        public static WxPayData WxAppPay(string out_trade_no, int total_fee, string spbill_create_ip
, string body, string goods_tag, string attach)
        {
            WxPayData data = new WxPayData();
            data.SetValue("body", body);//商品描述
            data.SetValue("attach", attach);//附加数据
            data.SetValue("out_trade_no", out_trade_no);//随机字符串
            data.SetValue("total_fee", total_fee);//总金额
            data.SetValue("time_start", DateTime.Now.ToString("yyyyMMddHHmmss"));//交易起始时间
            data.SetValue("time_expire", DateTime.Now.AddMinutes(10).ToString("yyyyMMddHHmmss"));//交易结束时间
            data.SetValue("goods_tag", goods_tag);//商品标记
            data.SetValue("trade_type", "APP");//交易类型
            data.SetValue("spbill_create_ip", spbill_create_ip);//商品ID

            var result = WxPayApi.UnifiedOrder(data);//调用统一下单接口

            WxPayData ret = new WxPayData();

            ret.SetValue("appid", WxPayConfig.APPID);
            ret.SetValue("partnerid", WxPayConfig.MCHID);
            ret.SetValue("prepayid", result.GetValue("prepay_id"));
            ret.SetValue("package", "Sign=WXPay");
            ret.SetValue("noncestr", result.GetValue("nonce_str"));

            DateTime dtStart = TimeZone.CurrentTimeZone.ToLocalTime(new DateTime(1970, 1, 1));
            DateTime dtNow = DateTime.Parse(DateTime.Now.ToString());
            TimeSpan toNow = dtNow.Subtract(dtStart);
            string timeStamp = toNow.Ticks.ToString();
            timeStamp = timeStamp.Substring(0, timeStamp.Length - 7);

            ret.SetValue("timestamp", timeStamp);
            ret.SetValue("sign", ret.MakeSign());

            var success = result.GetValue("return_code").ToString() == "SUCCESS" ? 0 : 1;
            ret.SetValue("retcode", success);
            ret.SetValue("retmsg", result.GetValue("return_msg"));

            return ret;
        }

        /**
       * 生成直接支付url，支付url有效期为2小时,模式二
       * @param productId 商品ID
       * @return 模式二URL
       */
        public static string GetWxQRPayUrl(string productId, string out_trade_no, int total_fee, string body, string goods_tag, string attach)
        {
            WxPayData data = new WxPayData();
            data.SetValue("body", body);//商品描述
            data.SetValue("attach", attach);//附加数据
            data.SetValue("out_trade_no", out_trade_no);//随机字符串
            data.SetValue("total_fee", total_fee);//总金额
            data.SetValue("time_start", DateTime.Now.ToString("yyyyMMddHHmmss"));//交易起始时间
            data.SetValue("time_expire", DateTime.Now.AddMinutes(10).ToString("yyyyMMddHHmmss"));//交易结束时间
            data.SetValue("goods_tag", goods_tag);//商品标记
            data.SetValue("trade_type", "NATIVE");//交易类型
            data.SetValue("product_id", productId);//商品ID

            WxPayData result = WxPayApi.UnifiedOrder(data);//调用统一下单接口
            string url = result.GetValue("code_url").ToString();//获得统一下单接口返回的二维码链接

            return url;
        }

    }
}