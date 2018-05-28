// 界面-----交互反馈
declare namespace wx {
    interface ToastOptions extends BaseOptions {
		/**
		 * 提示的内容
		 */
        title: string;
		/**
		 * 图标，只支持"success"、"loading"
		 */
        icon?: 'success' | 'loading';
		/**
		 * 自定义图标的本地路径，image 的优先级高于 icon
		 */
        image?: string;
		/**
		 * 提示的延迟时间，单位毫秒，默认：1500
		 */
        duration?: number;
		/**
		 * 是否显示透明蒙层，防止触摸穿透，默认：false
		 */
        mask?: boolean;
    }
	/**
	 * 显示消息提示框
	 */
    function showToast(options: ToastOptions): void;
    function hideToast(): void;

    interface LoadingOptions extends BaseOptions {
		/**
		 * 提示的内容
		 */
        title: string;
		/**
		 * 是否显示透明蒙层，防止触摸穿透，默认：false
		 */
        mask?: boolean;
    }
	/**
	 * 显示 loading 提示框, 需主动调用 wx.hideLoading 才能关闭提示框
	 */
    function showLoading(options: LoadingOptions): void;
	/**
	 * 隐藏消息提示框
	 */
	function hideLoading(): void;
	
	interface ModalResponse{
		/**
		 * 为 true 时，表示用户点击了确定按钮
		 */
		confirm: boolean;
		/**
		 * 为 true 时，表示用户点击了取消（用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭）
		 */
		cancel: boolean;
	}

    interface ModalOptions extends BaseOptions {
		/**
		 * 提示的标题
		 */
        title: string;
		/**
		 * 提示的内容
		 */
        content: string;
		/**
		 * 是否显示取消按钮，默认为 true
		 */
        showCancel?: boolean;
		/**
		 * 取消按钮的文字，默认为"取消"，最多 4 个字符
		 */
        cancelText?: string;
		/**
		 * 取消按钮的文字颜色，默认为"#000000"
		 */
        cancelColor?: string;
		/**
		 * 确定按钮的文字，默认为"确定"，最多 4 个字符
		 */
        confirmText?: string;
		/**
		 * 确定按钮的文字颜色，默认为"#3CC51F"
		 */
        confirmColor?: string;
		success?(res: ModalResponse): void;
    }
	/**
	 * 显示模态弹窗
	 */
    function showModal(options: ModalOptions): void;

    interface ActionSheetOptions extends BaseOptions {
		/**
		 * 按钮的文字数组，数组长度最大为6个
		 */
        itemList: string[];
		/**
		 * 按钮的文字颜色，默认为"#000000"
		 */
        itemColor?: string;
		/**
		 * 接口调用成功的回调函数
		 */
        success?(res: {
			/**
			 * 用户点击的按钮，从上到下的顺序，从0开始
			 */
            tapIndex: number;
        }): void;
    }
	/**
	 * 显示操作菜单
	 */
    function showActionSheet(options: ActionSheetOptions): void;
}
