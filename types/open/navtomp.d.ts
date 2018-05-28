
// 开放接口-----打开小程序
declare namespace wx {
    interface NavigateToMiniProgramOptions extends BaseOptions {
        appId: string; // 要打开的小程序 appId
        path?: string;	// 打开的页面路径，如果为空则打开首页
        extraData?: any; // 包括 encrypt_card_id, outer_str, biz三个字段，须从 step3 中获得的链接中获取参数
        envVersion?: string;	// 要打开的小程序版本，有效值 develop（开发版），trial（体验版），release（正式版） ，仅在当前小程序为开发版或体验版时此参数有效；如果当前小程序是体验版或正式版，则打开的小程序必定是正式版。默认值 release
        success?(res: BaseResponse): void;
    }

	/**
	 * 打开同一公众号下关联的另一个小程序。
	 */
    function navigateToMiniProgram(options: NavigateToMiniProgramOptions): void;

    interface NavigateBackMiniProgramOptions extends BaseOptions {
        extraData?: any;	// 需要返回给上一个小程序的数据，上一个小程序可在 App.onShow() 中获取到这份数据。详情
        success?(res: BaseResponse): void;
    }
	/**
	 * 返回到上一个小程序，只有在当前小程序是被其他小程序打开时可以调用成功
	 */
    function navigateBackMiniProgram(options: NavigateBackMiniProgramOptions): void;
}
