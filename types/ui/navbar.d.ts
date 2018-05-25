
// 界面-----设置导航条
declare namespace wx {
    interface SetNavigationBarTitleOptions extends BaseOptions {
        /** 页面标题 */
        title?: string;
    }
	/**
	 * 动态设置当前页面的标题。
	 */
    function setNavigationBarTitle(options: SetNavigationBarTitleOptions): void;

	/**
	 * 在当前页面显示导航条加载动画。
	 */
    function showNavigationBarLoading(): void;
	/**
	 * 隐藏导航条加载动画。
	 */
    function hideNavigationBarLoading(): void;
    type AnimationTimingFunc =
        'linear'		// 动画从头到尾的速度是相同的
        | 'easeIn'		// 动画以低速开始
        | 'easeOut'		// 动画以低速结束。
        | 'easeInOut'	// 动画以低速开始和结束。
        ;
    interface SetNavigationBarColorOptions extends BaseOptions {
        frontColor: '#ffffff' | '#000000';	// 前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000
        backgroundColor: string;	// 背景颜色值，有效值为十六进制颜色
        animation?: Partial<{		// 动画效果
            duration: number;					// 动画变化时间，默认0，单位：毫秒
            timingFunc: AnimationTimingFunc;	// 动画变化方式，默认 linear
        }>;
        success?(res: {
            errMsg: string;	// 调用结果
        }): void;
    }
    function setNavigationBarColor(options: SetNavigationBarColorOptions): void;
}