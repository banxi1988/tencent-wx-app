// 开放接口-----微信支付
 declare namespace wx {
    type PaymentSignType = 'MD5';
    interface RequestPaymentOptions extends BaseOptions {
        /** 时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间 */
        timeStamp: string | number;
        /** 随机字符串，长度为32个字符以下。 */
        nonceStr: string;
        /** 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=* */
        package: string;
        /** 签名算法，暂支持 MD5 */
        signType: PaymentSignType;
        /** 签名,具体签名方案参见微信公众号支付帮助文档; */
        paySign: string;
    }
	/**
	 * 发起微信支付。
	 */
    function requestPayment(options: RequestPaymentOptions): void;
}