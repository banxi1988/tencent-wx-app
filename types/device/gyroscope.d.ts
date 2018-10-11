declare namespace wx {
  /**
     *
- game	适用于更新游戏的回调频率，在 20ms/次 左右
- ui	适用于更新 UI 的回调频率，在 60ms/次 左右
- normal	普通的回调频率，在 200ms/次 左
     */
  type DeviceMonitoringInterval = "normal" | "game" | "ui";

  interface DeviceMonitoringIntervalOption {
    /**
     *
- game	适用于更新游戏的回调频率，在 20ms/次 左右
- ui	适用于更新 UI 的回调频率，在 60ms/次 左右
- normal	普通的回调频率，在 200ms/次 左
     */
    interval: DeviceMonitoringInterval;
  }

  interface BaseStartMonitoringOptions
    extends BaseOptions,
      DeviceMonitoringIntervalOption {}

  interface StartGyroscopeOptions extends BaseStartMonitoringOptions {}

  /**
   * 开始监听陀螺仪数据。
   * @since 2.3.0
   */
  function startGyroscope(options: StartGyroscopeOptions): void;
}
