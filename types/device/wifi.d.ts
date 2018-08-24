/**
 * 
 
 ## Wi-Fi
 在小程序中支持搜索周边的 Wi-Fi，同时可以针对指定 Wi-Fi，传入密码发起连接。

该系列接口为系统原生能力，如需查看“微信连Wi-Fi”能力及配置跳转小程序，请参考文档。

连接指定 Wi-Fi 接口调用时序：

Android： startWifi —> connectWifi —> onWifiConnected
iOS（仅iOS 11及以上版本支持）：
startWifi —> connectWifi —> onWifiConnected
连周边 Wi-Fi 接口调用时序：

Android startWifi —> getWifiList —> onGetWifiList —> connectWifi —> onWifiConnected
iOS（iOS 11.0及11.1版本因系统原因暂不支持）：
startWifi —> getWifiList —> onGetWifiList —> setWifiList —> onWifiConnected
注意：

Wi-Fi 相关接口暂不可用 wx.canIUse 接口判断。
Android 6.0 以上版本，在没有打开定位开关的时候会导致设备不能正常获取周边的 Wi-Fi 信息。

 */
declare namespace wx {
  interface WifiErrCodeResponse {
    /**
     * 错误码

错误码 | 说明 | 备注
----- | ----- | ----
0	ok	正常
12000	|not init	| 未先调用startWifi接口
12001	| system not support |	当前系统不支持相关能力
12002	|password error	| Wi-Fi 密码错误
12003	|connection timeout |	连接超时
12004	|duplicate request	|重复连接 Wi-Fi
12005	|wifi not turned on |	Android特有，未打开 Wi-Fi 开关
12006	|gps not turned on	| Android特有，未打开 GPS 定位开关
12007	|user denied	| 用户拒绝授权链接 Wi-Fi
12008	|invalid SSID	| 无效SSID
12009	|system config err |	系统运营商配置拒绝连接 Wi-Fi
12010	|system internal error |	系统其他错误，需要在errmsg打印具体的错误原因
12011	|weapp in background	| 应用在后台无法配置 Wi-Fi
 */
    errCode: number;
  }

  /**
   * 初始化 Wi-Fi 模块。
   * @since 1.6.0
   */
  function startWifi(options: BaseOptions): void;

  /**
   * 关闭 Wi-Fi 模块。
   * @since 1.6.0
   */
  function stopWifi(options: BaseOptions): void;

  interface WifiItem {
    /**
     * Wi-Fi 设备ssid
     */
    SSID: string;
    /**
     * Wi-Fi 设备bssid
     */
    BSSID: string;
    /**
     * Wi-Fi 设备密码
     */
    password: string;
  }

  interface ConnectWifiOptions extends BaseOptions, WifiItem {}

  /**
   * 连接 Wi-Fi。若已知 Wi-Fi 信息，可以直接利用该接口连接。仅 Android 与 iOS 11 以上版本支持。
   * @since 1.6.0
   */
  function connectWifi(options: ConnectWifiOptions): void;

  /**
   *  请求获取 Wi-Fi 列表，在 `onGetWifiList` 注册的回调中返回 wifiList 数据。
   *  iOS 将跳转到系统的 Wi-Fi 界面，Android 不会跳转。
   * iOS 11.0 及 iOS 11.1 两个版本因系统问题，该方法失效。但在 iOS 11.2 中已修复。
   * @since 1.6.0
   */
  function getWifiList(options: BaseOptions): void;

  interface Wifi {
    /**
     * Wi-Fi 设备ssid
     */
    SSID: string;
    /**
     * Wi-Fi 设备bssid
     */
    BSSID: string;

    /**
     * Wi-Fi 是否安全
     */
    secure: boolean;
    /**
     * Wi-Fi 信号强度
     */
    signalStrength: number;
  }
  interface OnGetWifiListResponse {
    /**
     * Wi-Fi 列表数据
     */
    wifiList: Wifi[];
  }

  /**
   * 监听在获取到 Wi-Fi 列表数据时的事件，在回调中将返回 wifiList。
   *
   * @since 1.6.0
   */
  function onGetWifiList(callback: (res: OnGetWifiListResponse) => void): void;

  interface SetWifiListOptions extends BaseOptions {
    /**
     * 提供预设的 Wi-Fi 信息列表
     */
    wifiList: WifiItem[];
  }
  /**
   * iOS特有接口 在 onGetWifiList 回调后，利用接口设置 wifiList 中 AP 的相关信息。

注意：

该接口只能在 onGetWifiList 回调之后才能调用。
此时客户端会挂起，等待小程序设置 Wi-Fi 信息，请务必尽快调用该接口，若无数据请传入一个空数组。
有可能随着周边 Wi-Fi 列表的刷新，单个流程内收到多次带有存在重复的 Wi-Fi 列表的回调。
   @since 1.6.0
   */
  function setWifiList(options: SetWifiListOptions): void;

  interface OnWifiConnectedResponse {
    wifi: Wifi;
  }

  /**
   * 监听连接上 Wi-Fi 的事件。
   * @since 1.6.0
   */
  function onWifiConnected(
    callback: (res: OnWifiConnectedResponse) => void
  ): void;

  interface GetConnectedWifiResponse {
    wifi: Wifi;
  }

  interface GetConnectedWifiOptions {
    success(res: GetConnectedWifiResponse): void;
  }
  /**
   * 获取已连接中的 Wi-Fi 信息
   * @since 1.6.0
   */
  function getConnectedWifi(options: GetConnectedWifiOptions): void;
}
