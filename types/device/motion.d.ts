/**
 * ## 设备方向
 */
declare namespace wx {
  interface StartDeviceMotionListeningOptions
    extends BaseStartMonitoringOptions {}

  /**
   * 开始监听设备方向的变化。
   * @since 2.3.0
   */
  function startDeviceMotionListening(
    options: StartDeviceMotionListeningOptions
  ): void;

  /**
   * 停止监听设备方向的变化。
   * @since 2.3.0
   */
  function stopDeviceMotionListening(options: BaseOptions): void;

  interface OnDeviceMotionChangeResponse {
    /**
     * 	当 手机坐标 X / Y 和 地球 X / Y 重合时，绕着 Z 轴转动的夹角为 alpha，范围值为
     * [0, 2 * PI) 。逆时针转动为正。
     */
    alpha: number;
    /**
     * 当手机坐标 Y / Z 和地球 Y / Z 重合时，绕着 X 轴转动的夹角为 beta。范围值为
     * [-1 * PI, PI) 。顶部朝着地球表面转动为正。也有可能朝着用户为正。
     */
    beta: number;
    /**
     * 	当手机 X / Z 和地球 X / Z 重合时，绕着 Y 轴转动的夹角为 gamma。范围值为
     * [-1 * PI / 2, PI / 2) 。右边朝着地球表面转动为正。
     */
    gamma: number;
  }
  /**
   *
   * 监听设备方向变化事件，频率根据 wx.startDeviceMotionListening() 的 interval 参数。
   * 可以使用 wx.stopDeviceMotionListening() 停止监听。
   *
   * @param callback 设备方向变化事件的回调函数
   * @since 2.3.0
   */
  function onDeviceMotionChange(callback: (res: any) => void): void;
}
