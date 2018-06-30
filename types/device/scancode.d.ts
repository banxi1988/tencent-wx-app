// 设备-----扫码
declare namespace wx {
  type scanType = "qrCode" | "barCode" | "datamatrix" | "pdf417";
  interface ScanCodeData {
    /**
     * 所扫码的内容
     */
    result: string;
    /**
     * 所扫码的类型
     */
    scanType: scanType;
    /**
     * 所扫码的字符集
     */
    charSet: string;
    /**
     * 当所扫的码为当前小程序的合法二维码时，会返回此字段，内容为二维码携带的 path
     */
    path: string;

    /**
     * 原始数据，base64编码
     * @since 2.1.0
     */
    rawData: string;
  }
  interface ScanCodeOptions extends BaseOptions {
    /**
     *  是否只能从相机扫码，不允许从相册选择图片
     */
    onlyFromCamera?: boolean;

    /**
     * 扫码类型，参数类型是数组，二维码是'qrCode'，一维码是'barCode'，DataMatrix
     * 是‘datamatrix’，pdf417是‘pdf417’。
     */
    scanType?: scanType[];
    success?(res: ScanCodeData): void;
  }
  /**
   * 调起客户端扫码界面，扫码成功后返回对应的结果
   */
  function scanCode(options: ScanCodeOptions): void;
}
