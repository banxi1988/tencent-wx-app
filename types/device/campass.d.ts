
// 设备-----罗盘
 declare namespace wx {
    interface CompassData {
        /** 面对的方向度数 */
        direction: number;
    }
    type CompassChangeCallback = (res: CompassData) => void;
	/**
	 * 监听罗盘数据，频率：5次/秒，接口调用后会自动开始监听，可使用wx.stopCompass停止监听。
	 */
    function onCompassChange(callback: CompassChangeCallback): void;
    type CompassOptions = BaseOptions;
	/**
	 * 开始监听罗盘数据。
	 * 基础库版本 1.1.0 开始支持，低版本需做兼容处理
	 * 微信客户端 6.5.6 版本开始支持
	 */
    function startCompass(options: CompassOptions): void;
    function stopCompass(options: CompassOptions): void;
}
