// 界面-----导航
declare namespace wx {
    interface NavigateToOptions extends BaseOptions {
        /** 需要跳转的应用内页面的路径 */
        url: string;
    }
	/**
	 * 保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
	 *
	 * 注意：为了不让用户在使用小程序时造成困扰，
	 * 我们规定页面路径只能是五层，请尽量避免多层级的交互方式。
	 */
    function navigateTo(options: NavigateToOptions): void;

    interface RedirectToOptions extends BaseOptions {
        /** 需要跳转的应用内页面的路径 */
        url: string;
    }
	/**
	 * 关闭当前页面，跳转到应用内的某个页面。
	 */
    function redirectTo(options: RedirectToOptions): void;

    interface SwichTabOptions extends BaseOptions {
        url: string;	// 需要跳转的 tabBar 页面的路径（需在 app.json 的 tabBar 字段定义的页面），路径后不能带参数
    }
	/**
	 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
	 */
    function switchTab(options: SwichTabOptions): void;

    interface NavigateBackOptions extends BaseOptions {
        delta?: number;	// 返回的页面数，如果 delta 大于现有页面数，则返回到首页。
    }

	/**
	 * 关闭当前页面，回退前一页面。
	 */
    function navigateBack(options?: NavigateBackOptions): void;

    interface RelaunchOptions extends BaseOptions {
        url: string;	// 需要跳转的应用内页面路径 , 路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'，如果跳转的页面路径是 tabBar 页面则不能带参数
    }

	/**
	 * 关闭所有页面，打开到应用内的某个页面。
	 */
    function reLaunch(options?: RelaunchOptions): void;
}