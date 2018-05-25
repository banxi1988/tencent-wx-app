// 界面-----下拉刷新
declare namespace wx {
    interface Page {
		/**
		 * 在 Page 中定义 onPullDownRefresh 处理函数，监听该页面用户下拉刷新事件。
		 * 需要在 config 的window选项中开启 enablePullDownRefresh。
		 * 当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新。
		 */
        onPullDownRefresh(): void;
    }
	/**
	 * 开始下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致
	 */
    function startPullDownRefresh(): void;
	/**
	 * 停止当前页面下拉刷新。
	 */
    function stopPullDownRefresh(): void;
}
