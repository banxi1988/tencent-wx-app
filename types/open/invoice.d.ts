// 开放接口-----获取发票抬头
declare namespace wx {
  interface ChooseInvoiceTitleResponse extends BaseResponse {
    type: string; // 抬头类型（0：单位，1：个人）
    title: string; // 抬头名称
    taxNumber: string; // 抬头税号
    companyAddress: string; // 单位地址
    telephone: string; // 手机号码
    bankName: string; // 银行名称
    bankAccount: string; // 银行账号
  }
  interface ChooseInvoiceTitleOptions extends BaseOptions {
    success?(res: ChooseInvoiceTitleResponse): void;
  }
  /**
   * 选择用户的发票抬头。
   */
  function chooseInvoiceTitle(options: ChooseInvoiceTitleOptions): void;
}
