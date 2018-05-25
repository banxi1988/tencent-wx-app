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
    }
    interface ScanCodeOptions extends BaseOptions {
        onlyFromCamera?: boolean;	// 是否只能从相机扫码，不允许从相册选择图片
        scanType?: scanType[];	// 扫码类型，参数类型是数组，二维码是'qrCode'，一维码是'barCode'，DataMatrix是‘datamatrix’，pdf417是‘pdf417’。
        success?(res: ScanCodeData): void;
    }
	/**
	 * 调起客户端扫码界面，扫码成功后返回对应的结果
	 */
    function scanCode(options: ScanCodeOptions): void;
}
