// 设备-----网络状态
declare namespace wx {
  type networkType = "2g" | "3g" | "4g" | "wifi" | "unknown" | "none";
  interface NetworkTypeData {
    /** 返回网络类型2g，3g，4g，wifi */
    networkType: networkType;
  }
  interface GetNetworkTypeOptions extends BaseOptions {
    /** 接口调用成功，返回网络类型 networkType */
    success?(res: NetworkTypeData): void;
  }
  /**
   * 获取网络类型。
   */
  function getNetworkType(options: GetNetworkTypeOptions): void;

  interface OnNetworkStatusChangeResponse {
    isConnected: boolean;
    networkType: networkType;
  }

  /**
   * 监听网络状态变化。
   */
  function onNetworkStatusChange(
    callback: (res: OnNetworkStatusChangeResponse) => void
  ): void;
}
