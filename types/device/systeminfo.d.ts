// 设备-----系统信息
declare namespace wx {
  interface SystemInfo {
    brand: string; // 手机品牌
    /** 手机型号 */
    model: string;
    /** 设备像素比 */
    pixelRatio: number;
    screenWidth: number; // 屏幕宽度
    screenHeight: number; // 屏幕高度
    /** 窗口宽度 */
    windowWidth: number;
    /** 窗口高度 */
    windowHeight: number;
    /** 微信设置的语言 */
    language: string;
    /** 微信版本号 */
    version: string;
    system: string; // 操作系统版本
    platform: string; // 客户端平台
    fontSizeSetting: string; // 用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位：px
    SDKVersion: string; // 客户端基础库版本
  }
  interface GetSystemInfoOptions extends BaseOptions {
    /** 成功获取系统信息的回调 */
    success?(res: SystemInfo): void;
  }
  /**
   * 获取系统信息。
   */
  function getSystemInfo(options: GetSystemInfoOptions): void;
  function getSystemInfoSync(): SystemInfo;

  /**
   * 判断小程序的API，回调，参数，组件等是否在当前版本可用。
   * 参数说明： 使用${API}.${method}.${param}.${options}或者${component}.${attribute}.${option}方式来调用，例如：
   * ${API} 代表 API 名字
   * ${method} 代表调用方式，有效值为return, success, object, callback
   * ${param} 代表参数或者返回值
   * ${options} 代表参数的可选值
   * ${component} 代表组件名字
   * ${attribute} 代表组件属性
   * ${option} 代表组件属性的可选值
   */
  function canIUse(w: string): boolean;
}
