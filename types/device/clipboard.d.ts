// 设备-----剪贴板
declare namespace wx {
  interface SetClipboardDataOptions extends BaseOptions {
    /**
     * 需要设置的内容
     */
    data: string;
  }
  /**
   * 设置系统剪贴板的内容
   */
  function setClipboardData(options: SetClipboardDataOptions): void;

  interface GetClipboardDataResponse {
    /**
     * 剪贴板的内容
     */
    data: string;
  }

  interface GetClipboardDataOptions extends BaseOptions {
    success?(res: GetClipboardDataResponse): void;
  }
  /**
   * 获取系统剪贴板内容
   */
  function getClipboardData(options: GetClipboardDataOptions): void;
}
