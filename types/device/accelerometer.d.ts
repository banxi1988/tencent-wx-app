// 设备-----加速度计
declare namespace wx {
    interface AccelerometerData {
        /** X 轴 */
        x: number;
        /** Y 轴 */
        y: number;
        /** Z 轴 */
        z: number;
    }
    type AccelerometerChangeCallback = (res: AccelerometerData) => void;
	/**
	 * 监听重力感应数据，频率：5次/秒
	 */
    function onAccelerometerChange(callback: AccelerometerChangeCallback): void;

    type AccelerometerOptions = BaseOptions;
	/**
	 * 开始监听加速度数据。
	 * 基础库版本 1.1.0 开始支持，低版本需做兼容处理
	 * 微信客户端 6.5.6 版本开始支持
	 */
    function startAccelerometer(options: AccelerometerOptions): void;
	/**
	 * 停止监听加速度数据。
	 * 基础库版本 1.1.0 开始支持，低版本需做兼容处理
	 * 微信客户端 6.5.6 版本开始支持
	 */
    function stopAccelerometer(options: AccelerometerOptions): void;
}