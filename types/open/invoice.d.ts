// 开放接口-----获取发票抬头
declare namespace wx {
  interface ChooseInvoiceTitleResponse extends BaseResponse {
    /**
     *  抬头类型（0：单位，1：个人）
     */
    type: string;
    /**
     *  抬头名称
     */
    title: string;
    /**
     *  抬头税号
     */
    taxNumber: string;
    /**
     *  单位地址
     */
    companyAddress: string;
    /**
     *  手机号码
     */
    telephone: string;
    /**
     *  银行名称
     */
    bankName: string;
    /**
     *  银行账号
     */
    bankAccount: string;
  }
  interface ChooseInvoiceTitleOptions extends BaseOptions {
    success?(res: ChooseInvoiceTitleResponse): void;
  }
  /**
   * 选择用户的发票抬头。
   */
  function chooseInvoiceTitle(options: ChooseInvoiceTitleOptions): void;
}
