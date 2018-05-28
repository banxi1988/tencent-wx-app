
// 设备-----剪贴板
 declare namespace wx {
    interface SetClipboardDataOptions extends BaseOptions {
        data: string;
    }
	/**
	 * 设置系统剪贴板的内容
	 * 基础库版本 1.1.0 开始支持，低版本需做兼容处理
	 * 微信客户端 6.5.6 版本开始支持
	 */
    function setClipboardData(options: SetClipboardDataOptions): void;
    interface GetClipboardDataOptions extends BaseOptions {
        success?(res: DataResponse): void;
    }
	/**
	 * 获取系统剪贴板内容
	 * 基础库版本 1.1.0 开始支持，低版本需做兼容处理
	 * 微信客户端 6.5.6 版本开始支持
	 */
    function getClipboardData(options: GetClipboardDataOptions): void;
}
