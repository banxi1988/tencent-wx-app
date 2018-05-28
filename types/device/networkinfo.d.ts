// 设备-----网络状态
 declare namespace wx {
    type networkType = '2g' | '3g' | '4g' | 'wifi' | 'unknown' | 'none';
    interface NetworkTypeData {
        /** 返回网络类型2g，3g，4g，wifi */
        networkType: networkType;
    }
    interface GetNetworkTypeOptions extends BaseOptions {
        /** 接口调用成功，返回网络类型 networkType */
        success(res: NetworkTypeData): void;
    }
	/**
	 * 获取网络类型。
	 */
    function getNetworkType(options: GetNetworkTypeOptions): void;

	/**
	 * 监听网络状态变化。
	 * 基础库版本 1.1.0 开始支持，低版本需做兼容处理
	 * 微信客户端 6.5.6 版本开始支持
	 */
    function onNetworkStatusChange(callback: (res: {
        isConnected: boolean;
        networkType: networkType;
    }) => void): void;
}
