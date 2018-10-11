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

  interface InvoiceInfo {
    /**
     * 所选发票卡券的 cardId
     */
    cardId: string;
    /**
     * 所选发票卡券的加密 code，报销方可以通过 cardId 和 encryptCode 获得报销发票的信息
     */
    encryptCode: string;
    /**
     * 发票方的 appId
     */
    publisherAppId: string;
  }

  interface ChooseInvoiceResponse extends BaseResponse {
    invoiceInfo: InvoiceInfo;
  }

  interface ChooseInvoiceOptions extends BaseOptions {
    success?(res: ChooseInvoiceResponse): void;
  }

  /**
   * 选择用户已有的发票
   * @since 2.3.0
   * @requires 调用前需要 用户授权 scope.invoice
   */
  function chooseInvoice(options: ChooseInvoiceOptions): void;
}
