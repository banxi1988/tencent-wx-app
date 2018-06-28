// 设备-----屏幕亮度
 declare namespace wx {
    interface SetScreenBrightnessOptions extends BaseOptions {
        value: number;	// 屏幕亮度值，范围 0~1，0 最暗，1 最亮
    }

	/**
	 * 设置屏幕亮度。
	 */
    function setScreenBrightness(options: SetScreenBrightnessOptions): void;

    interface GetScreenBrightnessOptions extends BaseOptions {
		/**
		 * @param value 屏幕亮度值，范围 0~1，0 最暗，1 最亮
		 */
        success?(ret: { value: number; }): void;
    }

	/**
	 * 获取屏幕亮度。
	 * 若安卓系统设置中开启了自动调节亮度功能，则屏幕亮度会根据光线自动调整，该接口仅能获取自动调节亮度之前的值，而非实时的亮度值。
	 */
    function getScreenBrightness(options: GetScreenBrightnessOptions): void;

    interface SetKeepScreenOnOptions extends BaseOptions {
        keepScreenOn: boolean;
        success?(errMsg: string): void;
    }
    function setKeepScreenOn(options: SetKeepScreenOnOptions): void;
}

// 设备-----用户截屏事件
 declare namespace wx {
    function onUserCaptureScreen(callback: () => void): void;
}