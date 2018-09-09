// 设备-----屏幕亮度
declare namespace wx {
  interface ScreenBrightness {
    /**
     * 屏幕亮度值，范围 0~1，0 最暗，1 最亮
     */
    value: number;
  }
  interface SetScreenBrightnessOptions extends BaseOptions, ScreenBrightness {}

  /**
   * 设置屏幕亮度。
   */
  function setScreenBrightness(options: SetScreenBrightnessOptions): void;

  interface GetScreenBrightnessResponse extends ScreenBrightness {}

  interface GetScreenBrightnessOptions extends BaseOptions {
    success?(ret: GetScreenBrightnessResponse): void;
  }

  /**
   * 获取屏幕亮度。
   * 若安卓系统设置中开启了自动调节亮度功能，则屏幕亮度会根据光线自动调整，该接口仅能获取自动调节亮度之前的值，而非实时的亮度值。
   */
  function getScreenBrightness(options: GetScreenBrightnessOptions): void;

  interface SetKeepScreenOnOptions extends BaseOptions {
    keepScreenOn: boolean;
    success?(res:ErrMsgResponse): void;
  }
  function setKeepScreenOn(options: SetKeepScreenOnOptions): void;
}

// 设备-----用户截屏事件
declare namespace wx {
  /**
   * 监听用户主动截屏事件，用户使用系统截屏按键截屏时触发此事件
   */
  function onUserCaptureScreen(callback: () => void): void;
}
