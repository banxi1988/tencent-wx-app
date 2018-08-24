// 设备-----罗盘
declare namespace wx {
  interface CompassData {
    /** 面对的方向度数 */
    direction: number;
  }
  type CompassChangeCallback = (res: CompassData) => void;
  /**
   * 监听罗盘数据，频率：5次/秒，接口调用后会自动开始监听，可使用 `wx.stopCompass` 停止监听。
   */
  function onCompassChange(callback: CompassChangeCallback): void;
  type CompassOptions = BaseOptions;
  /**
   * 开始监听罗盘数据。
   */
  function startCompass(options: CompassOptions): void;
  /**
   * 停止监听罗盘数据。
   */
  function stopCompass(options: CompassOptions): void;
}
